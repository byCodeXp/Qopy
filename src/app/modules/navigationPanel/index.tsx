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
        <div className="flex">
            <div className="flex flex-row gap-[2px] no-drag">
                {tabs.map((tab, index) => (
                    <Tab
                        {...tab}
                        key={index}
                        active={isCurrent(index)}
                        onClick={() => handleSetActiveTab(index)}
                        onClose={() => handleCloseTab(index)}
                    />
                ))}
            </div>
            <div className="h-[36px] w-[36px] flex" onClick={handleAddTab}>
                <IconPlus className="h-[16px] w-[16px] m-auto" />
            </div>
        </div>
    );
};

export { NavigationPanel };
