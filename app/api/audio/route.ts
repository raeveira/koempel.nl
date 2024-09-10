import { NextResponse } from 'next/server';
import path from 'path';
import { promises as fs } from 'fs';

interface AudioFile {
    path: string;
    name: string;
    isDirectory: boolean;
    children?: AudioFile[];
}

export async function GET() {
    const audioFolderPath = path.join(process.cwd(), 'public', 'audio');

    async function getAudioFiles(dir: string): Promise<AudioFile[]> {
        const entries = await fs.readdir(dir, { withFileTypes: true });
        const audioFiles: AudioFile[] = [];

        for (let entry of entries) {
            const entryPath = path.join(dir, entry.name);
            const relativePath = entryPath.replace(process.cwd(), ''); // Get relative path

            if (entry.isDirectory()) {
                const children = await getAudioFiles(entryPath); // Recursively get files in subfolders
                audioFiles.push({
                    path: relativePath,
                    name: entry.name,
                    isDirectory: true,
                    children,
                });
            } else if (entry.name.endsWith('.mp3') || entry.name.endsWith('.wav')) {
                audioFiles.push({
                    path: relativePath,
                    name: entry.name,
                    isDirectory: false,
                });
            }
        }

        return audioFiles;
    }

    try {
        const audioFiles = await getAudioFiles(audioFolderPath);
        return NextResponse.json({ success: true, files: audioFiles });
    } catch (error) {
        console.error('Error fetching audio files:', error);
        return NextResponse.json({ success: false, error: 'Failed to fetch audio files' });
    }
}
