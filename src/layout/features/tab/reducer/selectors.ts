import { RootState } from "../../../store";

export const tabSelector = {
   tabs: (state: RootState) => state.tab.tabs,
   current: (state: RootState) => state.tab.current
};