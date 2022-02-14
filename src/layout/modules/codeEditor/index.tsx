import { useEffect, useState } from 'react';

interface CodeEditorModuleProps {
    defaultValue?: string;
}

export const CodeEditorModule = (props: CodeEditorModuleProps) => {
    
    const [codeLines, setCodeLines] = useState<String[]>(['']);

    useEffect(() => {

        if (props.defaultValue)
        setCodeLines(props.defaultValue.split('\r\n'));
    }, []);

    return (
        <div className="w-full h-full text-white bg-primary-color p-[8px] font-mono text-[14px] relative">
            <div>
                {codeLines.map((line, index) => (
                    <div className="h-[20px] leading-[20px] whitespace-pre-wrap" key={index}>
                        {line}
                    </div>
                ))}
            </div>
        </div>
    );
};
