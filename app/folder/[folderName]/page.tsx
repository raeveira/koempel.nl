'use client'
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from 'axios';

interface ImageGalleryProps {
    folderPath: string;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ folderPath }) => {
    const [images, setImages] = useState<string[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchImages() {
            try {
                const response = await axios.post('/api/images', { folderPath });
                setImages(response.data);
            } catch (err) {
                console.error('Failed to fetch images:', err);
                setError('Failed to fetch images');
            }
        }

        fetchImages();
    }, [folderPath]);

    return (
        <div className="p-4">
            {error && <p className="text-red-500">{error}</p>}
            {images.length === 0 && !error && <p>Loading images...</p>}
            {images.length > 0 && (
                <div className="grid grid-cols-3 gap-4">
                    {images.map((image, index) => (
                        <img key={index} src={image} alt={`Image ${index}`} className="w-full h-auto object-cover" />
                    ))}
                </div>
            )}
        </div>
    );
};

export default async function FolderPage() {
    const router = useRouter();
    const pathname = usePathname();
    const folderName = pathname.split('/folder/').pop();

    if (typeof folderName !== 'string') return <p>Invalid folder name</p>;

    return (
        <div>
            <h1 className="text-xl font-bold">Folder: {folderName}</h1>
            <ImageGallery folderPath={folderName} />
        </div>
    );
}
