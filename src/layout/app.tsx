import { useState, useEffect } from 'react';
import { Frame } from './frame';
import { CommandLine } from './modules/commandLine';
import { Editor } from './modules/editor';
import { NavigationPanel } from './modules/navigationPanel';
import { selectActive, selectTabs } from './modules/navigationPanel/reducer/selectors';
import { useFunctions, useAppSelector } from './store/hooks';

const { writeFileSync } = window.require('fs');
const { resolve, basename } = window.require('path');

const App = () => {
    const { pushTabFunction, changeTabFunction, selectTabFunction } = useFunctions();

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
                content: await file.text()
            });

            selectTabFunction(tabs.length);
        }
    };

    const handleDragFile = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    };

    const handlePrint = (value: string) => {
        const tab = tabs[active];

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
        writeFileSync(path, content);

        const newPath = resolve(path);
        const newName = basename(path);

        changeTabFunction({
            index: active,
            tab: { ...tabs[active], path: newPath, label: newName }
        });
    };

    useEffect(() => {
        setMode('idle');
    }, [active]);

    return (
        <Frame extra={<NavigationPanel />}>
            <div onKeyUp={saveEventHandler} className="h-full flex flex-col">
                {active !== -1 ? (
                    <Editor onChange={handlePrint} value={tabs[active].content} />
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
                    <CommandLine
                        onSubmit={(value) => {
                            save(value, tabs[active].content);

                            setMode('idle');
                        }}
                    />
                )}
            </div>
        </Frame>
    );
};

export { App };
