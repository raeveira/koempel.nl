'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import Image from 'next/image';

interface FolderData {
    folder: string;
    images: string[];
}

const FolderList: React.FC = () => {
    const [foldersData, setFoldersData] = useState<FolderData[]>([]);
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

    return (
        <div className="p-4">
            {error && <p className="text-red-500">{error}</p>}
            {!foldersData.length && !error && <p>Loading folders...</p>}
            {foldersData.length > 0 && (
                <div className="grid grid-cols-3 gap-4">
                    {foldersData.map((folderData) => (
                        <div key={folderData.folder} className="border p-4">
                            <h3 className="text-lg font-semibold mb-2">{folderData.folder}</h3>
                            <div className="flex gap-2 mb-2">
                                {folderData.images.map((image, index) => (
                                    <img
                                        key={index}
                                        src={image}
                                        alt={`Image ${index}`}
                                        width={96}
                                        height={96}
                                        className="w-24 h-24 object-cover"
                                    />
                                ))}
                            </div>
                            <Link href={`/folder/${encodeURIComponent(folderData.folder)}`} className="text-blue-500 hover:underline">
                                View All Images
                            </Link>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default FolderList;




