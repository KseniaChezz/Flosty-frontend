import {IShopProduct} from '../types/product';

import {TEXT} from '../constants';
import {IProductFilter} from '../types/filter';

export const getMaxPriceFilterProductList = (maxPrice: number, productList: IShopProduct[]): IShopProduct[] => {
    return productList.filter((item: IShopProduct) => {
        const {price} = item;

        return price <= maxPrice;
    });
};

export const getMinPriceFilterProductList = (minPrice: number, productList: IShopProduct[]): IShopProduct[] => {
    return productList.filter((item: IShopProduct) => {
        const {price} = item;

        return price >= minPrice;
    });
};

export const getSortingFilterProductList = (sorting: string, productList: IShopProduct[]): IShopProduct[] => {
    switch (sorting) {
        case TEXT.increase:
            return productList.sort((item1: IShopProduct, item2: IShopProduct) => {
                return item1.price - item2.price;
            });
        case TEXT.decrease:
            return productList.sort((item1: IShopProduct, item2: IShopProduct) => {
                return item2.price - item1.price;
            });
        case TEXT.rating:
            return productList.sort((item1: IShopProduct, item2: IShopProduct) => {
                return +item2.rating - +item1.rating;
            });
        default:
            return productList;
    }
};

export const getFilteredProductList = (filter: IProductFilter, productList: IShopProduct[]): IShopProduct[] => {
    const {
        sorting,
        category,
        season,
        maxPrice,
        minPrice,
    } = filter;
    let result: IShopProduct[] = productList.slice();

    if (maxPrice !== '') {
        result = getMaxPriceFilterProductList(+maxPrice, result);
    }

    if (minPrice !== '') {
        result = getMinPriceFilterProductList(+minPrice, result);
    }

    if (sorting !== TEXT.default && sorting !== TEXT.new) {
        result = getSortingFilterProductList(sorting, result);
    }

    return result;
}
