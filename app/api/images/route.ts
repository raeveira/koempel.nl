import fs from 'fs';
import path from 'path';
import { NextRequest, NextResponse } from 'next/server';

const publicFolderPath = path.join(process.cwd(), 'public');

/**
 * Fetches all image files in the specified directory.
 * @param req The incoming request.
 * @returns An array of image paths.
 */
export async function POST(req: NextRequest): Promise<NextResponse> {
    try {
        // Parse the JSON body from the request
        const { folderPath } = await req.json();

        if (!folderPath) {
            return NextResponse.json({ error: 'No folder path provided' }, { status: 400 });
        }

        const fullPath = path.join(publicFolderPath, folderPath);

        // Validate the folder path to prevent directory traversal attacks
        if (!fullPath.startsWith(publicFolderPath)) {
            return NextResponse.json({ error: 'Invalid folder path' }, { status: 400 });
        }

        const images = getImages(fullPath);
        return NextResponse.json(images);
    } catch (error) {
        console.error('Error fetching images:', error);
        return NextResponse.json({ error: 'Failed to fetch images' }, { status: 500 });
    }
}

/**
 * Fetches all image files in the specified directory.
 * @param directory The directory to scan for images.
 * @returns An array of image paths.
 */
function getImages(directory: string): string[] {
    const images: string[] = [];

    function scanDirectory(directory: string) {
        const files = fs.readdirSync(directory);

        files.forEach((file) => {
            const filePath = path.join(directory, file);
            const stats = fs.statSync(filePath);

            if (stats.isDirectory()) {
                scanDirectory(filePath);
            } else if (stats.isFile() && isImageFile(file)) {
                const relativePath = path.relative(publicFolderPath, filePath);
                images.push(`/${relativePath}`);
            }
        });
    }

    function isImageFile(file: string): boolean {
        const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
        const ext = path.extname(file).toLowerCase();
        return imageExtensions.includes(ext);
    }

    scanDirectory(directory);

    return images;
}
