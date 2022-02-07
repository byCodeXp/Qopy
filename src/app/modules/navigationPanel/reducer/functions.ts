import { Dispatch } from '@reduxjs/toolkit';
import { addTabAction, removeTabAction, setActiveAction } from './index';

const pushTabFunction = () => {
    return (dispatch: Dispatch) => {
        dispatch(addTabAction());
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

export { pushTabFunction, removeTabFunction, selectTabFunction };
