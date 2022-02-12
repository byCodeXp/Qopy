import { useEffect } from 'react';
import { tabSelector } from '../../features/tab/reducer/selectors';
import { tabService } from '../../features/tab/service';
import { useAppSelector } from '../../store/hooks';

export const TabsModuleLogic = () => {
    const tabs = useAppSelector(tabSelector.tabs);
    const current = useAppSelector(tabSelector.current);

    // Create new tab on click
    const handleClickPlus = () => {

        tabService.pushTab({
            title: 'untitled',
            path: '',
            content: '',
            line: 0,
            position: 0
        });

        tabService.setCurrentTab(tabs.length);
    };

    // Close tab on click
    const handleClickClose = (index: number) => {
        tabService.removeTab(index);

        const nextLength = tabs.length - 1;

        if (nextLength === 0) {
            // If has not tabs
            tabService.setCurrentTab(-1);
        } else if (nextLength === current) {
            // If closed tab from left
            tabService.setCurrentTab(nextLength - 1);
        } else if (index < current && 0 < current) {
            // If closed tab from right
            tabService.setCurrentTab(current - 1);
        }
    };

    // Set current active tab index
    const handleClickTab = (index: number) => {
        tabService.setCurrentTab(index);
    };

    // Create new tab from file
    const handleDropFile = async (file: File) => {
        tabService.pushTab({
            path: file.path,
            title: file.name,
            content: await file.text(),
            line: 0,
            position: 0
        });

        tabService.setCurrentTab(tabs.length);
    };

    useEffect(() => {
        if (tabs.length <= 0) {
            tabService.setCurrentTab(-1);
        }
    }, [tabs]);

    return {
        tabs,
        current,
        handleClickTab,
        handleClickClose,
        handleClickPlus,
        handleDropFile
    };
};
