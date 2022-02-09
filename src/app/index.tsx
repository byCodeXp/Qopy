import { render } from 'react-dom';
import { StrictMode, useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import { useAppSelector, useFunctions } from './store/hooks';
import {
    selectActive,
    selectTabs,
} from './modules/navigationPanel/reducer/selectors';

import { Frame } from './frame';
import { NavigationPanel } from './modules/navigationPanel';

import './tailwind.css';

const { ipcRenderer } = window.require('electron');

const App = () => {
    const { pushTabFunction, changeTabFunction, selectTabFunction } =
        useFunctions();

    const active = useAppSelector(selectActive);
    const tabs = useAppSelector(selectTabs);

    const [mode, setMode] = useState<'idle' | 'save'>('idle');

    const handleDropFile = async (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();

        if (event.dataTransfer.files) {
            const file = event.dataTransfer.files[0];

            pushTabFunction({
                path: file.path,
                label: file.name,
                content: await file.text(),
            });

            selectTabFunction(tabs.length);
        }
    };

    const handleDragFile = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    };

    const handlePrint = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const tab = tabs[active];

        const value = event.target.value;

        changeTabFunction({ tab: { ...tab, content: value }, index: active });
    };

    const saveEventHandler = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.ctrlKey && event.code === 'KeyS') {
            const tab = tabs[active];

            if (tab.path === '') {
                setMode('save');
            } else {
                save(tab.path, tab.content);
            }
        }
    };

    const save = (path: string, content: string) => {
        ipcRenderer.send('SAVE_CHANGES', path, content);
    };

    useEffect(() => {
        setMode('idle');
    }, [active]);

    return (
        <Frame extra={<NavigationPanel />}>
            <div onKeyUp={saveEventHandler} className="h-full flex flex-col">
                {active !== -1 ? (
                    <textarea
                        onChange={handlePrint}
                        value={tabs[active].content}
                        spellCheck={false}
                        className="block appearance-none resize-none w-full flex-1 outline-none text-white bg-[#1B1B1B] p-[8px] font-mono text-[14px]"
                    ></textarea>
                ) : (
                    <div
                        onDrop={handleDropFile}
                        onDragOver={handleDragFile}
                        className="flex-1 w-full flex"
                    >
                        <span className="m-auto text-slate-200/50 font-mono -translate-y-[18px] text-sm">
                            Drop file here
                        </span>
                    </div>
                )}
                {mode === 'save' && (
                    <div className="border-t-2 h-[36px] border-[#242424] bg-[#1b1b1b] px-[12px]">
                        <input
                            type="text"
                            className="h-full w-full appearance-none outline-none font-mono text-xs text-white bg-transparent"
                            spellCheck={false}
                            placeholder="enter file name here"
                            onKeyPress={(event) => {

                                if (event.code === "Enter")
                                {
                                    save(
                                        event.currentTarget.value,
                                        tabs[active].content,
                                    );

                                    setMode('idle');
                                }
                                
                            }}
                        />
                    </div>
                )}
            </div>
        </Frame>
    );
};

render(
    <StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </StrictMode>,
    document.getElementById('root'),
);
