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

    const tab = tabs[active];

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

    const save = (path: string, content: string) => {
        writeFileSync(path, content);

        const newPath = resolve(path);
        const newName = basename(path);

        changeTabFunction({
            index: active,
            tab: { ...tabs[active], path: newPath, label: newName }
        });
    };

    const windowKeyDownListener = (event: KeyboardEvent) => {
        if (event.ctrlKey && event.code === 'KeyS') {
            if (tab.path === '') {
                setMode('save');
            } else {
                save(tab.path, tab.content);
            }
        }
    };

    useEffect(() => {
        setMode('idle');

        if (tab) {
            window.addEventListener('keydown', windowKeyDownListener);
        }

        return () => {
            window.removeEventListener('keydown', windowKeyDownListener);
        };
    }, [tab]);

    return (
        <Frame extra={<NavigationPanel />}>
            <div className="h-full flex flex-col">
                {active !== -1 ? (
                    <Editor onChange={handlePrint} value={tab.content} />
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
                            save(value, tab.content);

                            setMode('idle');
                        }}
                    />
                )}
            </div>
        </Frame>
    );
};

export { App };
