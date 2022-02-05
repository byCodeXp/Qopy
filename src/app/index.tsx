import React from 'react';
import { render } from 'react-dom';
import { Tab } from './components/tab';

import './tailwind.css';

const { ipcRenderer } = window.require('electron');

const App = () => {
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
        <div className="flex flex-col h-full">
            <header className="flex flex-row justify-between drag">
                <div className="flex flex-row gap-[2px] no-drag py-[2px] px-[2px]">
                    <Tab label="index.tsx" />
                    <Tab label="app.tsx" />
                    <Tab label="test.tsx" />
                </div>
                <div className="flex flex-row gap-[8px] no-drag py-[8px] pr-[16px]">
                    <div
                        onClick={handleClickMinimize}
                        className="w-[20px] h-[20px] rounded-[8px] shadow bg-[#949494]"
                    ></div>
                    <div
                        onClick={handleClickMaximize}
                        className="w-[20px] h-[20px] rounded-[8px] shadow bg-[#7A8A8F]"
                    ></div>
                    <div
                        onClick={handleClickClose}
                        className="w-[20px] h-[20px] rounded-[8px] shadow bg-[#8F7A7A]"
                    ></div>
                </div>
            </header>
            <main className="px-[2px] pb-[2px] flex-1">
                <textarea
                    spellCheck={false}
                    className="appearance-none resize-none w-full h-full outline-none text-white bg-[#1B1B1B] p-[8px] font-mono text-[14px]"
                ></textarea>
            </main>
        </div>
    );
};

render(<App />, document.getElementById('root'));
