import fs from 'fs';
import path from 'path';
import { NextRequest, NextResponse } from 'next/server';

/**
 * Base folder information with optional subfolders.
 */
interface Folder {
    folder: string;
    folderPath: string;
    subfolders: Folder[];
    images: { src: string; comments: { src: string; description: string }[] }[];
    order: number;
}

/**
 * Folder order information from the JSON file.
 */
interface FolderOrder {
    path: string;
    name: string;
    order: number;
}

const siteImagesFolderPath = path.join(process.cwd(), 'public', 'site-images');
const orderFilePath = path.join(siteImagesFolderPath, 'folders-order.json');
const commentsFilePath = path.join(siteImagesFolderPath, 'image-comments.json');

/**
 * Read the centralized ordering metadata from the JSON file.
 * @returns An array of folder order objects.
 */
function getFoldersOrder(): FolderOrder[] {
    try {
        if (fs.existsSync(orderFilePath)) {
            const orderData = JSON.parse(fs.readFileSync(orderFilePath, 'utf8'));
            return orderData.folders || [];
        }
        return [];
    } catch (error) {
        console.error('Error reading folders-order.json:', error);
        return [];
    }
}

/**
 * Reads the image comments from the JSON file.
 * @returns An object where keys are folder paths and values are arrays of comments.
 */
function getImageComments(): { [folderPath: string]: { src: string; description: string }[] } {
    try {
        if (fs.existsSync(commentsFilePath)) {
            return JSON.parse(fs.readFileSync(commentsFilePath, 'utf8')) || {};
        }
        return {};
    } catch (error) {
        console.error('Error reading image-comments.json:', error);
        return {};
    }
}

export async function GET(req: NextRequest): Promise<NextResponse> {
    try {
        const foldersOrder = getFoldersOrder();
        const folders = getFolders(foldersOrder);
        return NextResponse.json(folders);
    } catch (error) {
        console.error('Error fetching folders:', error);
        return NextResponse.json({ error: 'Failed to fetch folders' }, { status: 500 });
    }
}

/**
 * Retrieves folders with their subfolders and images based on the order.
 * @param foldersOrder - The ordered list of folders from the JSON file.
 * @returns A sorted array of folder objects with their subfolders and images.
 */
function getFolders(foldersOrder: FolderOrder[]): Folder[] {
    const folderMap = new Map<string, Folder>();
    const comments = getImageComments(); // Load comments

    // Initialize folders map
    foldersOrder.forEach((folderOrder) => {
        const folderPath = path.join(siteImagesFolderPath, folderOrder.path);
        if (fs.existsSync(folderPath) && fs.statSync(folderPath).isDirectory()) {
            folderMap.set(folderOrder.path, {
                folder: folderOrder.name || path.basename(folderPath),
                folderPath: folderOrder.path,
                subfolders: [],
                images: getImagesFromFolder(folderPath, comments),
                order: folderOrder.order
            });
        }
    });

    // Build the folder structure
    const folders: Folder[] = [];
    folderMap.forEach((folderData, folderPath) => {
        const parentPath = path.dirname(folderPath);
        if (parentPath !== '.' && folderMap.has(parentPath)) {
            folderMap.get(parentPath)!.subfolders.push(folderData);
        } else {
            folders.push(folderData);
        }
    });

    // Sort main folders and subfolders by their order
    const sortFolders = (folders: Folder[]): Folder[] => folders
        .sort((a, b) => a.order - b.order)
        .map(folder => ({
            ...folder,
            subfolders: sortFolders(folder.subfolders)
        }));

    return sortFolders(folders);
}


/**
 * Retrieves images from a given folder and attaches comments if available.
 * @param directory - The path of the directory to retrieve images from.
 * @param comments - Object containing comments for images.
 * @returns An array of image objects with optional comments.
 */
function getImagesFromFolder(directory: string, comments: { [folderPath: string]: { src: string; description: string }[] }): { src: string; comments: { src: string; description: string }[] }[] {
    const images: { src: string; comments: { src: string; description: string }[] }[] = [];
    try {
        const files = fs.readdirSync(directory);

        files.forEach((file) => {
            const filePath = path.join(directory, file);
            if (fs.statSync(filePath).isFile() && isImageFile(file)) {
                const relativePath = path.relative(siteImagesFolderPath, filePath).replace(/\\/g, '/');
                const imageSrc = `/site-images/${relativePath}`;

                // Get comments for the image if available
                const folderPath = path.relative(siteImagesFolderPath, directory).replace(/\\/g, '/');
                const folderComments = comments[folderPath] || [];
                const imageComments = folderComments.filter(comment => comment.src === path.basename(file));

                images.push({
                    src: imageSrc,
                    comments: imageComments
                });
            }
        });
    } catch (error) {
        console.error(`Error reading directory ${directory}:`, error);
    }

    return images;
}


/**
 * Checks if a file is an image based on its extension.
 * @param file - The file name to check.
 * @returns True if the file is an image, false otherwise.
 */
function isImageFile(file: string): boolean {
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
    const ext = path.extname(file).toLowerCase();
    return imageExtensions.includes(ext);
}
