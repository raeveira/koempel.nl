'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ImageModal } from '@/components/ImagesModal';

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

interface FolderListProps {
    foldersData: FolderData[];
}

const FolderList: React.FC<FolderListProps> = ({ foldersData }) => {
    const [currentFolder, setCurrentFolder] = useState<FolderData | null>(null);
    const [previousFolder, setPreviousFolder] = useState<FolderData | null>(null);
    const [selectedImage, setSelectedImage] = useState<{ src: string; comments: ImageComment[] } | null>(null);

    const handleFolderClick = (folder: FolderData) => {
        setPreviousFolder(currentFolder);
        setCurrentFolder(folder);
    };

    const handleBackClick = () => {
        setCurrentFolder(previousFolder);
        setPreviousFolder(null);
    };

    const handleImageClick = (image: { src: string; comments: ImageComment[] }) => {
        setSelectedImage(image);
    };

    const handleModalClose = () => {
        setSelectedImage(null);
    };

    const renderFolders = (folders: FolderData[]) => (
        <div className="grid grid-cols-1 gap-4 max-h-[calc(100svh-300px)] overflow-y-auto overflow-x-hidden">
            {folders.length > 0 ? (
                folders.map((folder) => (
                    <div key={folder.folderPath} className="border p-4 h-max">
                        <h3
                            className="text-lg font-semibold mb-2 cursor-pointer"
                            onClick={() => handleFolderClick(folder)}
                        >
                            {folder.folder} <br />
                            {folder.home && (<><span>Thuis: {folder.home}</span><br /></>)}
                            {folder.out && (<><span>Uit: {folder.out}</span><br /></>)}
                        </h3>
                        {folder.subfolders.length > 0 && (
                            <p
                                className="text-blue-500 hover:underline hover:cursor-pointer"
                                onClick={() => handleFolderClick(folder)}
                            >
                                Bevat {folder.subfolders.length} submappen
                            </p>
                        )}
                        {folder.images.length > 0 && (
                            <p
                                className="text-blue-500 hover:underline hover:cursor-pointer"
                                onClick={() => handleFolderClick(folder)}
                            >
                                Bevat {folder.images.length} afbeeldingen
                            </p>
                        )}
                    </div>
                ))
            ) : (
                <p>Geen mappen beschikbaar</p>
            )}
        </div>
    );

    return (
        <div className={`p-4 grid ${currentFolder?.images.length ?? 0 > 0 ? "grid-cols-2" : "grid-cols-1"} gap-x-2`}>
            {currentFolder ? (
                <>
                    <div className='col-span-2 flex items-center'>
                        <Button
                            onClick={handleBackClick}
                            variant={'link'}
                        >
                            Terug naar vorige
                        </Button>
                        <h2 className="text-xl font-bold text-right flex-1">Afbeeldingen binnen {currentFolder.folder}</h2>
                    </div>

                    {currentFolder.subfolders.length > 0 ? (
                        <div className="col-span-1">
                            {renderFolders(currentFolder.subfolders)}
                        </div>
                    ) : null}

                    <div className={currentFolder.subfolders.length === 0 ? 'col-span-2' : 'col-span-1'}>
                        <div className="grid grid-cols-3 gap-4 max-h-[calc(100svh-300px)] overflow-y-auto overflow-x-hidden">
                            {currentFolder.images.length > 0 ?
                                currentFolder.images.map((image, index) => (
                                    <div
                                        key={index}
                                        className="relative group cursor-pointer"
                                        onClick={() => handleImageClick(image)}
                                    >
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
                                )) : <p>Geen afbeeldingen beschikbaar</p>}
                        </div>
                    </div>

                    {selectedImage && (
                        <ImageModal
                            imageSrc={selectedImage.src}
                            comments={selectedImage.comments}
                            onClose={handleModalClose}
                        />
                    )}
                </>
            ) : (
                renderFolders(foldersData)
            )}
        </div>
    );
};

export default FolderList;
