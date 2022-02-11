import { ReactNode } from 'react';

interface Props {
    onFinish: (file: File) => void;
    children: ReactNode;
    className?: string;
}

export const DropZoneComponent = ({ onFinish, children, className }: Props) => {

    const handleDragFile = (event: React.DragEvent<HTMLDivElement>) => event.preventDefault();

    const handleDropFile = async (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();

        if (event.dataTransfer.files) {
            const file = event.dataTransfer.files[0];

            onFinish(file);
        }
    };

    return (
        <div className={className} onDrop={handleDropFile} onDragOver={handleDragFile}>
            {children}
        </div>
    );
};
