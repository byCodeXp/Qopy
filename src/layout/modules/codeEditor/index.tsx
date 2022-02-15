import { CodeEditorModuleLogic } from "./logic";

const Cursor = (position: { X: number; Y: number }) => {
    return (
        <div
            className="w-[2px] h-[16px] bg-[#c2c2c2] absolute left-0 m-[10px]"
            style={{ left: position.X * 8.41 - 2, top: position.Y * 20 }}
        />
    );
};

export interface CodeEditorModuleProps {
    defaultValue?: string;
}

export const CodeEditorModule = (props: CodeEditorModuleProps) => {

    const { codeLines, cursorPosition } = CodeEditorModuleLogic(props);

    return (
        <div className="w-full h-full text-white bg-primary-color p-[8px] font-mono text-[14px] relative">
            <div>
                {codeLines.map((line, index) => (
                    <div className="h-[20px] leading-[20px] whitespace-pre-wrap" key={index}>
                        {line}
                    </div>
                ))}
                <Cursor X={cursorPosition.X} Y={cursorPosition.Y} />
            </div>
        </div>
    );
};
