import { DropZoneComponent } from '../../components/dropZone';
import { IconPlus } from './components/iconPlus';
import { Tab } from './components/tab';
import { TabsModuleLogic } from './logic';

export const TabsModule = () => {

    const {
        tabs,
        current,
        handleClickTab,
        handleClickClose,
        handleClickPlus,
        handleDropFile
    } = TabsModuleLogic();

    const mapDataToTabs = tabs.map((tab, index) => (
        <Tab
            onClick={() => handleClickTab(index)}
            onClickClose={() => handleClickClose(index)}
            key={index}
            label={tab.title}
            active={index === current}
        />
    ));

    return (
        <div className="flex no-drag">
            <div className="flex gap-[2px]">{mapDataToTabs}</div>
            <DropZoneComponent onFinish={handleDropFile}>
                <div
                    onClick={handleClickPlus}
                    className="flex h-[36px] w-[36px] justify-center items-center transition-colors text-[#818181] hover:text-[#636363] cursor-pointer"
                >
                    <IconPlus />
                </div>
            </DropZoneComponent>
        </div>
    );
};
