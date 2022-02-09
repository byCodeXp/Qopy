import { RootState } from './index';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from '@reduxjs/toolkit';

import {
    changeTabFunction,
    pushTabFunction,
    removeTabFunction,
    selectTabFunction,
} from '../modules/navigationPanel/reducer/functions';

export const useFunctions = () => {
    const dispatch = useDispatch();

    return bindActionCreators(
        {
            pushTabFunction,
            changeTabFunction,
            removeTabFunction,
            selectTabFunction,
        },
        dispatch,
    );
};

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
