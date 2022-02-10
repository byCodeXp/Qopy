import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { reducer as tab } from '../modules/navigationPanel/reducer';

const store = configureStore({
    reducer: { tab },
});

export { store };

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;
