import { render } from 'react-dom';
import { StrictMode } from 'react';
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

const App = () => {
    const { pushTabFunction, selectTabFunction } = useFunctions();

    const active = useAppSelector(selectActive);

    const tabs = useAppSelector(selectTabs);

    const handleDropFile = (event: React.DragEvent<HTMLDivElement>) => {
        console.log('File(s) dropped');

        event.preventDefault();

        if (event.dataTransfer.files) {
            const file = event.dataTransfer.files[0];

            pushTabFunction({
                path: file.path,
                label: file.name,
            });

            selectTabFunction(tabs.length);
        }
    };

    const handleDragFile = (event: React.DragEvent<HTMLDivElement>) => {
        console.log('File(s) dragged');

        event.preventDefault();
    };

    return (
        <Frame extra={<NavigationPanel />}>
            {active !== -1 ? (
                <textarea
                    spellCheck={false}
                    className="block appearance-none resize-none w-full h-full outline-none text-white bg-[#1B1B1B] p-[8px] font-mono text-[14px]"
                ></textarea>
            ) : (
                <div
                    onDrop={handleDropFile}
                    onDragOver={handleDragFile}
                    className="h-full w-full flex"
                >
                    <span className="m-auto text-slate-200/50 font-mono -translate-y-[18px] text-sm">
                        Drop file here
                    </span>
                </div>
            )}
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
