import { Tab } from './components/tab';
import { IconPlus } from './components/iconPlus';
import { TabsLogic } from './logic';

const NavigationPanel = () => {
    const {
        tabs,
        isCurrent,
        handleAddTab,
        handleCloseTab,
        handleSetActiveTab,
    } = TabsLogic();

    return (
        <div className="flex flex-row gap-[2px] no-drag pt-[2px] px-[2px] items-center">
            {tabs.map((tab, index) => (
                <div key={index}>
                    <Tab
                        {...tab}
                        active={isCurrent(index)}
                        onClick={() => handleSetActiveTab(index)}
                        onClose={() => handleCloseTab(index)}
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
    );
};

export { NavigationPanel };
