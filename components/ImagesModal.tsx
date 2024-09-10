import { Button } from "@/components/ui/button";
import { X } from 'lucide-react';

interface ImageComment {
    description: string;
}

interface ImageModalProps {
    imageSrc: string;
    comments: ImageComment[];
    onClose: () => void;
}

export const ImageModal: React.FC<ImageModalProps> = ({ imageSrc, comments, onClose }) => {
    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50"
            onClick={onClose}
        >
            <Button
                variant={'link'}
                className="absolute top-2 right-2 text-white"
                onClick={onClose}
            >
                <X className="w-6 h-6" style={{ mixBlendMode: 'difference' }} />
            </Button>
            <div className="relative max-w-3xl mx-auto p-4 bg-white rounded-lg">

                <img
                    src={imageSrc}
                    alt="Enlarged image"
                    className="w-full h-auto object-cover rounded-lg"
                />
                <div className="mt-4">
                    {comments.length > 0 ? (
                        comments.map((comment, idx) => (
                            <p key={idx} className="text-gray-700 text-sm">
                                {comment.description}
                            </p>
                        ))
                    ) : (
                        <p className="text-gray-500 text-sm">Geen opmerkingen beschikbaar</p>
                    )}
                </div>
            </div>
        </div>
    );
};
