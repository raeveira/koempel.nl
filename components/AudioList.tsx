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
    const [currentFolder, setCurrentFolder] = useState<AudioFile | null>(null);
    const [previousFolder, setPreviousFolder] = useState<AudioFile | null>(null);
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

    const handleFolderClick = (folder: AudioFile) => {
        setPreviousFolder(currentFolder);
        setCurrentFolder(folder);
    };

    const handleBackClick = () => {
        setCurrentFolder(previousFolder);
        setPreviousFolder(null);
    };

    const renderFiles = (files: AudioFile[]) => (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[calc(100svh-200px)] sm:max-h-[calc(100svh-300px)] overflow-y-auto overflow-x-hidden bg-black p-3 rounded-sm">
            {files.map((file) => (
                <div key={file.path} className="border p-4 h-max bg-yellow-400 rounded-md">
                    {file.isDirectory ? (
                        <>
                            <h3
                                className="text-lg font-semibold mb-2 cursor-pointer"
                                onClick={() => handleFolderClick(file)}
                            >
                                {file.name}
                            </h3>
                            {file.children && (
                                <p
                                    className="text-blue-500 hover:underline hover:cursor-pointer"
                                    onClick={() => handleFolderClick(file)}
                                >
                                    Bevat {file.children.length} submappen
                                </p>
                            )}
                        </>
                    ) : (
                        <>
                            <p className="text-lg font-semibold">{file.name}</p>
                            <audio controls className="mt-2 w-full">
                                <source src={file.path} type="audio/mpeg" />
                                Your browser does not support the audio element.
                            </audio>
                        </>
                    )}
                </div>
            ))}
        </div>
    );

    return (
        <div className="p-4">
            {currentFolder ? (
                <>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center mb-4">
                        <button
                            onClick={handleBackClick}
                            className="text-xl hover:underline mb-2 sm:mb-0"
                        >
                            Terug naar vorige
                        </button>
                        <h2 className="text-xl font-bold sm:text-right sm:flex-1">
                            Bestanden binnen {currentFolder.name}
                        </h2>
                    </div>

                    {currentFolder.children && currentFolder.children.length > 0 && (
                        <div className="mb-4">{renderFiles(currentFolder.children)}</div>
                    )}
                </>
            ) : (
                <>
                    <h2 className="text-2xl font-bold mb-4">Audio Files</h2>
                    {error && <p className="text-red-500 mb-4">{error}</p>}
                    {audioFiles.length > 0 ? (
                        renderFiles(audioFiles)
                    ) : (
                        <p className="text-white">Geen audiobestanden beschikbaar</p>
                    )}
                </>
            )}
        </div>
    );
}
