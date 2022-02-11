import { bindActionCreators, Dispatch } from '@reduxjs/toolkit';
import { store } from '../../store';
import { createTabAction, updateTabAction, deleteTabAction, setCurrentAction } from './reducer';

const pushTab = (tab: TabType) => {
    return (dispatch: Dispatch) => {
        dispatch(createTabAction(tab));
    };
};

const updateTab = (tab: TabType) => {
    return (dispatch: Dispatch) => {
        dispatch(updateTabAction(tab));
    };
};

const removeTab = (index: number) => {
    return (dispatch: Dispatch) => {
        dispatch(deleteTabAction(index));
    };
};

const setCurrentTab = (index: number) => {
    return (dispatch: Dispatch) => {
        dispatch(setCurrentAction(index));
    };
};

export const tabService = bindActionCreators(
    {
        pushTab,
        updateTab,
        removeTab,
        setCurrentTab
    },
    store.dispatch
);
