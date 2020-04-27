import {IProductResponse, IShopProduct} from '../types/product';
import {ITag} from '../types/shop';
import { TEXT } from '../constants';

export const isStringWithNumbers = (value: string): boolean => {
    return /^\d{1,}$/.test(value);
};

export const getTagListId = (tagIdList: number[]): string => {
    if (tagIdList.length === 1) return tagIdList[0].toString();

    return tagIdList.join(',');
};

export const mapProductFromResponse = (productResponse: IProductResponse): IShopProduct => {
    const {
        id,
        name,
        price,
        rating,
        updated_at,
        price_with_sale,
        image,
        tags,
    } = productResponse;

    return {
        id,
        name,
        rating,
        price: price_with_sale ? price_with_sale : price,
        date: +new Date(updated_at),
        img: image,
        tagList: tags,
    }
};

export const filterProductListByNameAndTag = (searchText: string, productList: IShopProduct[]): IShopProduct[] => {
    return productList.filter((item: IShopProduct) => {
        if (searchText === '') return productList;

        const text: string = searchText.replace('#', '');
        const {name, tagList} = item;

        return name.includes(text) || tagList.some((tag: ITag) => tag.name.includes(text));
    });
};

export const formatProductPrice = (price: number): string => {
    const priceString: string = price.toString();
    const rub: string = TEXT.rubleSign;
    if (price >= 1000000) {
        return `${Math.floor(price/1000000)} ${priceString.slice(-6, 3)} ${priceString.slice(-3)} ${rub}`;
    }

    if (price >= 1000) {
        return `${Math.floor(price/1000)} ${priceString.slice(-3)} ${rub}`;
    }

    return `${priceString} ${rub}`;
}
