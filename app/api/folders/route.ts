'use server';

import fs from 'fs';
import path from 'path';
import { NextRequest, NextResponse } from 'next/server';

const publicFolderPath = path.join(process.cwd(), 'public');

export async function GET(req: NextRequest) {
    try {
        const folders = getFolders();
        const results = await Promise.all(folders.map(async (folder) => {
            const images = getImagesFromFolder(folder);
            const imagePaths = images.slice(0, 3);
            return { folder, images: imagePaths };
        }));

        return NextResponse.json(results);
    } catch (error) {
        console.error('Error fetching folders:', error);
        return NextResponse.json({ error: 'Failed to fetch folders' }, { status: 500 });
    }
}

function getFolders(): string[] {
    const folders: string[] = [];

    function scanDirectory(directory: string) {
        const files = fs.readdirSync(directory);

        files.forEach((file) => {
            const filePath = path.join(directory, file);
            const stats = fs.statSync(filePath);

            if (stats.isDirectory()) {
                folders.push(filePath);
                scanDirectory(filePath);
            }
        });
    }

    scanDirectory(publicFolderPath);

    return folders.map(folder => path.relative(publicFolderPath, folder));
}

function getImagesFromFolder(folder: string): string[] {
    const images: string[] = [];
    const folderPath = path.join(publicFolderPath, folder);

    function scanDirectory(directory: string) {
        const files = fs.readdirSync(directory);

        files.forEach((file) => {
            const filePath = path.join(directory, file);
            const stats = fs.statSync(filePath);

            if (stats.isFile() && isImageFile(file)) {
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

    scanDirectory(folderPath);

    return images;
}
