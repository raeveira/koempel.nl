'use client';

import { useState } from 'react';
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
    order?: number;
}

export interface FolderData extends SubfolderData { }

// Correctly define the props type
interface FolderListProps {
    foldersData: FolderData[];
}

const FolderList: React.FC<FolderListProps> = ({ foldersData }) => {
    const [currentFolder, setCurrentFolder] = useState<FolderData | null>(null);
    const [previousFolder, setPreviousFolder] = useState<FolderData | null>(null);

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
            {folders.length > 0 ? (
                folders.map((folder) => (
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
                            {folder.images.slice(0, 3).map((image, index) => (
                                <img
                                    key={index}
                                    src={image.src}
                                    alt={`Image ${index}`}
                                    width={96}
                                    height={96}
                                    className="w-24 h-24 object-cover"
                                />
                            ))}
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
                ))
            ) : (
                <p>No folders available</p>
            )}
        </div>
    );

    return (
        <div className="p-4">
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
