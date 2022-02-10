import { Tab } from './components/tab';
import { IconPlus } from './components/iconPlus';
import { TabsLogic } from './logic';
import { useFunctions } from '../../store/hooks';

const NavigationPanel = () => {
    const {
        tabs,
        isCurrent,
        handleAddTab,
        handleCloseTab,
        handleSetActiveTab,
    } = TabsLogic();

    const { pushTabFunction, selectTabFunction } = useFunctions();

    const handleDropFile = async (event: React.DragEvent<HTMLDivElement>) => {
        console.log('File(s) dropped');

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
        console.log('File(s) dragged');

        event.preventDefault();
    };

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
            <div
                className="h-[36px] w-[36px] flex"
                onClick={handleAddTab}
                onDrop={handleDropFile}
                onDragOver={handleDragFile}
            >
                <IconPlus className="h-[16px] w-[16px] m-auto" />
            </div>
        </div>
    );
};

export { NavigationPanel };
