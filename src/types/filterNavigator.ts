import {IFilterCheckBoxItem} from '../types/filter';
import {IProductFilterKey} from './filter';

export type IFilterNavigatorParamList = {
    RootFilterScreen: undefined;
    FilterItemScreen: {
        title: string,
        filterCheckBoxItemList: IFilterCheckBoxItem[],
        filterName: IProductFilterKey,
    };
    DetailFilterItemScreen: {
        title: string,
        filterCheckBoxItemList: IFilterCheckBoxItem[],
        filterName: IProductFilterKey,
    };
};



