import React, { useEffect, useState } from 'react';

const Cursor = (position: { X: number; Y: number }) => {
    return (
        <div
            className="w-[2px] h-[16px] bg-[#c2c2c2] absolute left-0 m-[10px]"
            style={{ left: position.X, top: position.Y }}
        />
    );
};

interface CodeEditorModuleProps {
    defaultValue?: string;
}

export const CodeEditorModule = (props: CodeEditorModuleProps) => {

    const [codeLines, setCodeLines] = useState<String[]>(['']);

    const handleKeyDown = (event: KeyboardEvent) => {
        
        console.log(event.key);
    };

    // Setup when open new instance of code editor
    useEffect(() => {

        if (props.defaultValue) {

            setCodeLines(props.defaultValue.split('\r\n'));
        }

        document.addEventListener('keydown', handleKeyDown);

        return () => {

            document.removeEventListener('keydown', handleKeyDown);
        };
        
    }, []);

    return (
        <div className="w-full h-full text-white bg-primary-color p-[8px] font-mono text-[14px] relative">
            <div>
                {codeLines.map((line, index) => (
                    <div className="h-[20px] leading-[20px] whitespace-pre-wrap" key={index}>
                        {line}
                    </div>
                ))}
                <Cursor X={0} Y={0} />
            </div>
        </div>
    );
};
