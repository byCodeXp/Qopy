import { tabSelector } from '../../features/tab/reducer/selectors';
import { tabService } from '../../features/tab/service';
import { useAppSelector } from '../../store/hooks';

export const EditorModule = () => {

    const tabs = useAppSelector(tabSelector.tabs);
    const current = useAppSelector(tabSelector.current);

    const currentTab = tabs[current];

    const handleTypeText = (value: string) => {

        tabService.updateTab({ ...currentTab, content: value });
    };

    return (
        <textarea
            onChange={(event) => handleTypeText(event.target.value)}
            value={currentTab.content}
            spellCheck={false}
            className="block appearance-none resize-none w-full h-full outline-none text-white bg-primary-color p-[8px] font-mono text-[14px]"
        />
    );
};
