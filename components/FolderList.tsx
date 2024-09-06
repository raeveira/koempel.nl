'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button';

interface ImageComment {
    src: string;
    description: string;
}

interface SubfolderData {
    folder: string;
    folderPath: string;
    subfolders: SubfolderData[];
    images: { src: string; comments: ImageComment[] }[];
    home?: string;
    out?: string;
}

interface FolderData extends SubfolderData { }

const FolderList: React.FC = () => {
    const [foldersData, setFoldersData] = useState<FolderData[]>([]);
    const [currentFolder, setCurrentFolder] = useState<FolderData | null>(null);
    const [previousFolder, setPreviousFolder] = useState<FolderData | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchFoldersData() {
            try {
                const response = await axios.get('/api/folders');
                setFoldersData(response.data);
            } catch (err) {
                console.error('Failed to fetch folders data:', err);
                setError('Failed to fetch folders data');
            }
        }

        fetchFoldersData();
    }, []);

    const handleFolderClick = (folder: FolderData) => {
        setPreviousFolder(currentFolder);
        setCurrentFolder(folder);
    };

    const handleBackClick = () => {
        setCurrentFolder(previousFolder);
        setPreviousFolder(null);
    };

    const renderFolders = (folders: FolderData[]) => (
        <div className="grid grid-cols-3 gap-4">
            {folders.map((folder) => (
                <div key={folder.folderPath} className="border p-4">
                    <h3
                        className="text-lg font-semibold mb-2 cursor-pointer"
                        onClick={() => handleFolderClick(folder)}
                    >
                        {folder.folder} <br />
                        {folder.home && (<><span>Thuis: {folder.home}</span><br /></>)}
                        {folder.out && (<><span>Uit: {folder.out}</span><br /></>)}
                    </h3>
                    <div className="flex gap-2 mb-2">
                        {folder.images.slice(0, 3).map((image, index) => {
                            return (
                                <img
                                    key={index}
                                    src={image.src}
                                    alt={`Image ${index}`}
                                    width={96}
                                    height={96}
                                    className="w-24 h-24 object-cover"
                                />
                            )
                        })}
                    </div>
                    {folder.subfolders.length > 0 && (
                        <p
                            className="text-blue-500 hover:underline hover:cursor-pointer"
                            onClick={() => handleFolderClick(folder)}
                        >
                            Contains {folder.subfolders.length} subfolders
                        </p>
                    )}
                </div>
            ))}
        </div>
    );

    return (
        <div className="p-4">
            {error && <p className="text-red-500">{error}</p>}
            {!foldersData.length && !error && <p>Loading folders...</p>}
            {currentFolder ? (
                <>
                    <Button
                        onClick={handleBackClick}
                        variant={'link'}
                    >
                        Back to Previous
                    </Button>
                    {renderFolders(currentFolder.subfolders)}
                    <h2 className="text-xl font-bold mt-4">Images in {currentFolder.folder}</h2>
                    <div className="grid grid-cols-3 gap-4">
                        {currentFolder.images.length > 0 ?
                            currentFolder.images.map((image, index) => (
                                <div key={index} className="relative group">
                                    <img
                                        src={image.src}
                                        alt={`Image ${index}`}
                                        className="w-full h-auto object-cover"
                                    />
                                    {image.comments && image.comments.length > 0 && (
                                        <div className="absolute bottom-0 left-0 bg-gray-800 text-white p-2 opacity-0 group-hover:opacity-75 w-full">
                                            {image.comments.map((comment, idx) => (
                                                <p key={idx} className="text-sm">
                                                    {comment.description}
                                                </p>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))
                            : <p>No images available</p>}
                    </div>
                </>
            ) : (
                renderFolders(foldersData)
            )}
        </div>
    );
};

export default FolderList;
