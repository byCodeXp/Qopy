import type { ReactNode } from 'react';

interface Props {
    extra: ReactNode;
    children: ReactNode;
}

const { ipcRenderer } = window.require('electron');

const Frame = ({ children, extra }: Props) => {
    const handleClickMinimize = () => {
        ipcRenderer.send('WINDOW_MINIMIZE');
    };

    const handleClickMaximize = () => {
        ipcRenderer.send('WINDOW_MAXIMIZE');
    };

    const handleClickClose = () => {
        ipcRenderer.send('WINDOW_CLOSE');
    };

    return (
        <div className="flex flex-col h-full p-[2px]">
            <header className="flex flex-row justify-start h-[36px]">
                {extra}
                <div className="flex flex-row gap-[8px] pr-[16px] flex-1 justify-end drag py-[8px]">
                    <div
                        onClick={handleClickMinimize}
                        className="w-[20px] h-[20px] rounded-[8px] shadow bg-[#949494] no-drag"
                    ></div>
                    <div
                        onClick={handleClickMaximize}
                        className="w-[20px] h-[20px] rounded-[8px] shadow bg-[#7A8A8F] no-drag"
                    ></div>
                    <div
                        onClick={handleClickClose}
                        className="w-[20px] h-[20px] rounded-[8px] shadow bg-[#8F7A7A] no-drag"
                    ></div>
                </div>
            </header>
            <main className="flex-1">{children}</main>
            <div className="bg-grid"></div>
        </div>
    );
};

export { Frame };
