import {ISearchClarificationItem} from './search';

export type ISearchNavigatorParamList = {
    SearchRootScreen: undefined;
    SearchMenuScreen: {
        title: string,
        menuList: ISearchClarificationItem[],
        search: (text: string) => void,
    };
};
