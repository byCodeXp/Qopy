import { DropZoneComponent } from './components/dropZone';
import { TabConstructors } from './features/tab/helpers/constructors';
import { tabSelector } from './features/tab/reducer/selectors';
import { tabService } from './features/tab/service';
import { Frame } from './frame';
import { EditorModule } from './modules/editor';
import { TabsModule } from './modules/tabs';
import { useAppSelector } from './store/hooks';

export const App = () => {
    const tabs = useAppSelector(tabSelector.tabs);
    const current = useAppSelector(tabSelector.current);

    const handleDropFile = async (file: File) => {
        const tab = await TabConstructors.createFromFile(file);

        tabService.pushTab(tab);

        tabService.setCurrentTab(tabs.length);
    };

    return (
        <>
            <Frame extra={<TabsModule />}>
                {current !== -1 ? (
                    tabs.map((tab, index) => (
                        <div className="h-full" key={index} hidden={current !== index}>
                            <EditorModule active={current === index} initialValue={tab.content} />
                        </div>
                    ))
                ) : (
                    <DropZoneComponent className="h-full w-full flex" onFinish={handleDropFile}>
                        <span className="m-auto text-slate-200/50 font-mono -translate-y-[18px] text-sm">
                            Drop file here
                        </span>
                    </DropZoneComponent>
                )}
            </Frame>
            <div className="bg-grid"></div>
        </>
    );
};
