import { useAppSelector } from '../../store/hooks';
import { selectActive, selectTabs } from './reducer/selectors';
import { useFunctions } from '../../store/hooks';

const TabsLogic = () => {
    const { pushTabFunction, selectTabFunction, removeTabFunction } =
        useFunctions();

    const tabs = useAppSelector(selectTabs);
    const active = useAppSelector(selectActive);

    const isCurrent = (index: number) => index === active;

    const handleAddTab = () => {
        pushTabFunction({
            path: '/',
            label: 'untitled',
            content: '',
        });
        selectTabFunction(tabs.length);
    };

    const handleSetActiveTab = (index: number) => {
        selectTabFunction(index);
    };

    const handleCloseTab = (index: number) => {
        const nextLength = tabs.length - 1;

        if (nextLength === 0) {
            selectTabFunction(-1);
        } else {
            if (active > 0 && active > index) {
                selectTabFunction(active - 1);
            }
            if (active === nextLength) {
                selectTabFunction(nextLength - 1);
            }
        }

        removeTabFunction(index);
    };

    return {
        tabs,
        isCurrent,
        handleAddTab,
        handleCloseTab,
        handleSetActiveTab,
    };
};

export { TabsLogic };
