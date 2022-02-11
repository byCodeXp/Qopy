import { DropZoneComponent } from './components/dropZone';
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
        tabService.pushTab({
            path: file.path,
            title: file.name,
            content: await file.text()
        });

        tabService.setCurrentTab(tabs.length);
    };

    return (
        <>
            <Frame extra={<TabsModule />}>
                {current !== -1 ? (
                    <EditorModule />
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
