import { Dispatch } from '@reduxjs/toolkit';
import {
    addTabAction,
    changeTabAction,
    removeTabAction,
    setActiveAction,
} from './index';

const pushTabFunction = (tab: TabInterface) => {
    return (dispatch: Dispatch) => {
        dispatch(addTabAction(tab));
    };
};

const changeTabFunction = (obj: { tab: TabInterface; index: number }) => {
    return (dispatch: Dispatch) => {
        dispatch(changeTabAction({ tab: obj.tab, index: obj.index }));
    };
};

const removeTabFunction = (index: number) => {
    return (dispatch: Dispatch) => {
        dispatch(removeTabAction(index));
    };
};

const selectTabFunction = (index: number) => {
    return (dispatch: Dispatch) => {
        dispatch(setActiveAction(index));
    };
};

export {
    pushTabFunction,
    changeTabFunction,
    removeTabFunction,
    selectTabFunction,
};
