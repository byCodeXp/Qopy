import { RootState } from '../../../store';

export const selectTabs = (state: RootState) => state.tab.tabs;
export const selectActive = (state: RootState) => state.tab.active;
