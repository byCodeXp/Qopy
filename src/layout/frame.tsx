import { ReactNode } from 'react';
import { appEvents } from '../events';

interface FrameProps {
    extra: JSX.Element;
    children: ReactNode;
}

const { ipcRenderer } = window.require('electron');

export const Frame = ({ extra, children }: FrameProps) => {
    // Minimize window
    const handleClickMinimize = () => {
        ipcRenderer.send(appEvents.MINIMIZE_FRAME);
    };

    // Maximize window
    const handleClickMaximize = () => {
        ipcRenderer.send(appEvents.MAXIMIZE_FRAME);
    };

    // Close window
    const handleClickClose = () => {
        ipcRenderer.send(appEvents.CLOSE_FRAME);
    };

    return (
        <div className="p-[2px] h-full flex flex-col">
            <header className="flex">
                <div className="flex flex-1 drag">{extra}</div>
                <div className="flex gap-[8px] py-[8px] pr-[12px]">
                    <div
                        onClick={handleClickMinimize}
                        className="w-[20px] h-[20px] rounded-[8px] shadow transition-colors bg-[#949494] hover:bg-[#9e9e9e]"
                    />
                    <div
                        onClick={handleClickMaximize}
                        className="w-[20px] h-[20px] rounded-[8px] shadow transition-colors bg-[#7a8a8f] hover:bg-[#849499]"
                    />
                    <div
                        onClick={handleClickClose}
                        className="w-[20px] h-[20px] rounded-[8px] shadow transition-colors bg-[#8f7a7a] hover:bg-[#998484]"
                    />
                </div>
            </header>
            <main className="flex-1">{children}</main>
        </div>
    );
};
