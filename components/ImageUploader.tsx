
import React, { useState, useRef, useEffect } from 'react';
import { PhotoIcon, TrashIcon } from './icons/EditorIcons';
import Button from './ui/Button';
import { StoredFile } from '../types';

interface ImageUploaderProps {
    onFilesChange: (files: StoredFile[]) => void;
    existingFiles?: StoredFile[];
    isEditMode: boolean;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onFilesChange, existingFiles = [], isEditMode }) => {
    const [files, setFiles] = useState<StoredFile[]>(existingFiles);
    const fileInputRef = useRef<HTMLInputElement>(null);
    
    useEffect(() => {
        // Sync with parent state if it changes externally, avoiding re-renders if files are identical
        if (JSON.stringify(existingFiles) !== JSON.stringify(files)) {
            setFiles(existingFiles);
        }
    }, [existingFiles]);


    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = event.target.files;
        if (selectedFiles) {
            const filesToProcess = Array.from(selectedFiles).slice(0, 4 - files.length);

            filesToProcess.forEach(file => {
                const reader = new FileReader();
                reader.onload = (e) => {
                    const dataUrl = e.target?.result as string;
                    if (dataUrl) {
                        const newFile: StoredFile = { name: file.name, type: file.type, dataUrl };
                        // Use functional update to get the latest state
                        setFiles(prevFiles => {
                            const updatedFiles = [...prevFiles, newFile];
                            onFilesChange(updatedFiles);
                            return updatedFiles;
                        });
                    }
                };
                reader.readAsDataURL(file);
            });
        }
        // Reset the input value to allow selecting the same file again
        if(event.target) {
            event.target.value = "";
        }
    };

    const handleRemoveFile = (indexToRemove: number) => {
        const newFiles = files.filter((_, index) => index !== indexToRemove);
        setFiles(newFiles);
        onFilesChange(newFiles);
    };

    const triggerFileSelect = () => {
        fileInputRef.current?.click();
    };

    return (
        <div>
            <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileChange}
                ref={fileInputRef}
                className="hidden"
                disabled={files.length >= 4}
            />
            {isEditMode && (
                <Button
                    type="button"
                    onClick={triggerFileSelect}
                    className="bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-300 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={files.length >= 4}
                >
                    <PhotoIcon />
                    Upload Photos ({files.length}/4)
                </Button>
            )}
            {files.length > 0 && (
                <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {files.map((file, index) => (
                        <div key={index} className="relative w-full aspect-square rounded-lg overflow-hidden shadow-sm group">
                            <img src={file.dataUrl} alt={`Preview ${index + 1}`} className="w-full h-full object-cover" />
                            {isEditMode && (
                                <button
                                    type="button"
                                    onClick={() => handleRemoveFile(index)}
                                    className="absolute top-1 right-1 bg-red-600/80 hover:bg-red-700/90 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity focus:opacity-100 focus:outline-none"
                                    aria-label="Remove image"
                                >
                                    <TrashIcon className="h-4 w-4" />
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ImageUploader;
