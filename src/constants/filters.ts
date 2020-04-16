import {TEXT} from './text';

import {IFilterItem, IFilterCheckBoxItem} from '../types/filter';

export const sortingFilter: IFilterCheckBoxItem[] = [
    {value: TEXT.default},
    {value: TEXT.increase},
    {value: TEXT.decrease},
    {value: TEXT.new},
    {value: TEXT.rating},
];

export const shoesFilter: IFilterCheckBoxItem[] = [
    {value: TEXT.all},
    {value: TEXT.ballerinas},
    {value: TEXT.sandals},
    {value: TEXT.boots},
    {value: TEXT.slippers},
    {value: TEXT.gumshoes},
    {value: TEXT.sneakers},
    {value: TEXT.loafers},
    {value: TEXT.moccasins},
    {value: TEXT.lowShoes},
    {value: TEXT.highBoots},
    {value: TEXT.shoes},
];

export const clothesFilter: IFilterCheckBoxItem[] = [
    {value: TEXT.all},
    {value: TEXT.shirts},
    {value: TEXT.overalls},
    {value: TEXT.costumes},
    {value: TEXT.homeWear},
    {value: TEXT.jackets},
    {value: TEXT.dresses},
    {value: TEXT.sweaters},
    {value: TEXT.tShirts},
    {value: TEXT.trouthers},
    {value: TEXT.skirts},
];

export const accessoriesFilter: IFilterCheckBoxItem[] = [
    {value: TEXT.all},
    {value: TEXT.hats},
    {value: TEXT.socks},
    {value: TEXT.scarves},
];

export const seasonFilter : IFilterCheckBoxItem[] = [
    {value: TEXT.allSeasons},
    {value: TEXT.winter},
    {value: TEXT.summer},
    {value: TEXT.fall},
    {value: TEXT.spring},
];

export const categoryFilter: IFilterCheckBoxItem[] = [
    {value: TEXT.allCategories},
    {value: TEXT.footWear, additionalFilter: shoesFilter},
    {value: TEXT.clothes,  additionalFilter: clothesFilter},
    {value: TEXT.accessorises, additionalFilter: accessoriesFilter},
];

export const rootFilter: IFilterItem[] = [
    {
        value: TEXT.sorting,
        additionalFilter: sortingFilter,
        filterName: 'sorting',
    },
    {
        value: TEXT.category,
        additionalFilter: categoryFilter,
        filterName: 'category',
    },
    {
        value: TEXT.season,
        additionalFilter: seasonFilter,
        filterName: 'season',
    },
];


