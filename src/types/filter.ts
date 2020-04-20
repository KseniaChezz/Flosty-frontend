export interface IFilterItem {
    value: string;
    additionalFilter: IFilterCheckBoxItem[];
    filterName: IProductFilterKey;
}

export interface IFilterCheckBoxItem {
    value: string;
    additionalFilter?: IFilterCheckBoxItem[];
}

interface IProductChackBoxFilter {
    sorting: string;
    category: string;
    season: string;
}
export interface IProductFilter extends IProductChackBoxFilter{
    maxPrice: string;
    minPrice: string;
}

export type IProductFilterKey = keyof IProductChackBoxFilter;
