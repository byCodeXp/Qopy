import { EditorModuleLogic } from './logic';

export interface EditorModuleProps {
    active: boolean;
    initialValue?: string;
}

export const EditorModule = (props : EditorModuleProps) => {

    const { lines, cursor } = EditorModuleLogic(props);

    return (
        <div className="w-full h-full text-white bg-primary-color p-[8px] font-mono text-[14px] relative">
            <div>
                {lines.map((line, index) => (
                    <div className="h-[20px] leading-[20px] whitespace-pre-wrap" key={index}>
                        {line}
                    </div>
                ))}
            </div>
            <div
                className={`w-[2px] h-[16px] bg-[#c2c2c2] absolute left-0 m-[10px]`}
                style={{ top: cursor.Y, left: cursor.X }}
            />
        </div>
    );
};
