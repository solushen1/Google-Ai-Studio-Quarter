import React, { useRef } from 'react';
import { PhotoIcon, TrashIcon } from './icons/EditorIcons';
import Button from './ui/Button';

interface SignatureInputProps {
    value: string | null; // dataUrl
    onChange: (dataUrl: string | null) => void;
}

const SignatureInput: React.FC<SignatureInputProps> = ({ value, onChange }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const dataUrl = e.target?.result as string;
                if (dataUrl) {
                    onChange(dataUrl);
                }
            };
            reader.readAsDataURL(file);
        }
        if (event.target) {
            event.target.value = "";
        }
    };

    const triggerFileSelect = () => {
        fileInputRef.current?.click();
    };

    const handleRemove = () => {
        onChange(null);
    };

    return (
        <div className="w-full p-2 border border-dashed border-slate-300 rounded-md bg-slate-50 min-h-[100px] flex items-center justify-center">
             <input
                type="file"
                accept="image/png, image/jpeg"
                onChange={handleFileChange}
                ref={fileInputRef}
                className="hidden"
            />
            {value ? (
                <div className="relative group">
                    <img src={value} alt="Signature" className="h-24 object-contain" />
                     <button
                        type="button"
                        onClick={handleRemove}
                        className="absolute -top-2 -right-2 bg-red-600/80 hover:bg-red-700/90 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity focus:opacity-100 focus:outline-none"
                        aria-label="Remove signature"
                    >
                        <TrashIcon className="h-4 w-4" />
                    </button>
                </div>
            ) : (
                <Button
                    type="button"
                    onClick={triggerFileSelect}
                    className="bg-white text-slate-700 hover:bg-slate-100 border border-slate-300 flex items-center gap-2"
                >
                    <PhotoIcon />
                    Upload Signature
                </Button>
            )}
        </div>
    );
};

export default SignatureInput;
