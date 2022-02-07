import { StrictMode, useState } from 'react';
import { render } from 'react-dom';
import { Tab } from './components/tab';
import { Provider } from 'react-redux';
import { store } from './store';

import './tailwind.css';
import { Frame } from './frame';

const IconPlus = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-4 w-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="#818181"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={3}
            d="M12 4v16m8-8H4"
        />
    </svg>
);

const App: React.FC = () => {
    const [tabs, setTabs] = useState<{ label: string }[]>([]);

    const [activeTab, setActiveTab] = useState<number>(-1);

    const handleAddTab = () => {
        setTabs([...tabs, { label: Math.random().toString() }]);
        setActiveTab(tabs.length);
    };

    const handleSetActiveTab = (index: number) => {
        setActiveTab(index);
    };

    const handleCloseTab = (index: number) => {
        setTabs([...tabs.slice(0, index), ...tabs.slice(index + 1)]);

        if (tabs.length === 1) {
            setActiveTab(-1);
        }
    };

    return (
        <Frame
            extra={
                <div className="flex flex-row gap-[2px] no-drag pt-[2px] px-[2px] items-center">
                    {tabs.map((tab, index) => (
                        <div key={index}>
                            <Tab
                                label={tab.label}
                                active={index === activeTab}
                                onClick={() => handleSetActiveTab(index)}
                                onClose={handleCloseTab}
                                index={index}
                            />
                        </div>
                    ))}
                    <div
                        onClick={handleAddTab}
                        className="w-[34px] flex justify-center"
                    >
                        <IconPlus />
                    </div>
                </div>
            }
        >
            {activeTab !== -1 && (
                <textarea
                    spellCheck={false}
                    className="appearance-none resize-none w-full h-full outline-none text-white bg-[#1B1B1B] p-[8px] font-mono text-[14px]"
                ></textarea>
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
