'use client';

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
            {images.length === 0 && !error && <p>Loading...</p>}
            <div className="grid grid-cols-3 gap-4">
                {images.map((image, index) => (
                    <img key={index} src={image} alt={`Image ${index}`} className="w-full h-auto object-cover" />
                ))}
            </div>
        </div>
    );
}

export default ImageGallery;
