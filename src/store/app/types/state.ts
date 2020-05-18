import {AppTab} from '../../../enums';

export interface IAppState {
    selectedTab: AppTab;
    isDataProcessing: boolean;
    isError: boolean;
    errorText: string;
}
