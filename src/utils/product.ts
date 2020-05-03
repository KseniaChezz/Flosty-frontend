import {
    IProductResponse,
    IShopProduct,
    IColor,
    IColorResponse,
    ISizeResponse,
    ISize,
} from '../types/product';
import {ITag} from '../types/shop';

import {TEXT} from '../constants';

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
        shop_id,
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
        shopId: shop_id,
        price: price_with_sale ? price_with_sale : price,
        date: +new Date(updated_at),
        img: image,
        tagList: tags,
    }
};

export const mapColorProductResponse = (colorResponse: IColorResponse): IColor => {
    const {
        id,
        name,
        order,
        hex_code,
    } = colorResponse;

    return {
        id,
        value: name,
        order,
        code: hex_code,
    }
};

export const mapSizeProductResponse = (sizeResponse: ISizeResponse): ISize => {
    const {
        id,
        size,
    } = sizeResponse;

    return {
        id,
        value: size,
    };
};

export const getFilteredProductListByTagAndTagId = (
    searchText: string,
    productList: IShopProduct[],
): {list: IShopProduct[]; tagId: number | undefined} => {
    let tagId: number | undefined;
    const list: IShopProduct[] =  productList.filter((item: IShopProduct) => {
        if (searchText === '') return productList;

        const text: string = searchText.replace('#', '');
        const {tagList} = item;

        return tagList.some((tag: ITag) => {
            if (tag.name.includes(text)) {
                tagId = +tag.id;
                return true;
            }

            return false;
        });
    });

    return {
        list,
        tagId,
    };
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
