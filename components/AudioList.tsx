'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';

interface AudioFile {
    path: string;
    name: string;
    isDirectory: boolean;
    children?: AudioFile[];
}

export default function AudioList() {
    const [audioFiles, setAudioFiles] = useState<AudioFile[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchAudioFiles = async () => {
            try {
                const response = await axios.get('/api/audio');
                if (response.data.success) {
                    setAudioFiles(response.data.files);
                } else {
                    setError('Failed to load audio files.');
                }
            } catch (err) {
                setError('An error occurred while fetching audio files.');
            }
        };

        fetchAudioFiles();
    }, []);

    const renderFiles = (files: AudioFile[]) => {
        return files.map((file, index) => (
            <li key={index} className="audio-item">
                {file.isDirectory ? (
                    <div>
                        <p className="text-lg font-bold">{file.name}</p>
                        {file.children && (
                            <ul className="pl-4 space-y-2">
                                {renderFiles(file.children)}
                            </ul>
                        )}
                    </div>
                ) : (
                    <div>
                        <p className="text-lg font-semibold">{file.name}</p>
                        <audio controls className="mt-2 w-full">
                            <source src={file.path} type="audio/mpeg" />
                            Your browser does not support the audio element.
                        </audio>
                    </div>
                )}
            </li>
        ));
    };

    return (
        <div className="audio-list p-4">
            <h2 className="text-2xl font-bold mb-4">Audio Files</h2>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            {audioFiles.length > 0 ? (
                <ul className="space-y-4">
                    {renderFiles(audioFiles)}
                </ul>
            ) : (
                <p>No audio files available.</p>
            )}
        </div>
    );
}
