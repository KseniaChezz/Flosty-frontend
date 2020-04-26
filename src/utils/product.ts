import {ITagProductResponse, IShopProduct} from "../types/product";

export const isStringWithNumbers = (value: string): boolean => {
    return /^\d{1,}$/.test(value);
};

export const getTagListId = (tagIdList: number[]): string => {
    if (tagIdList.length === 1) return tagIdList[0].toString();

    return tagIdList.join(',');
}

export const mapProductFromResponse = (productResponse: ITagProductResponse): IShopProduct => {
    const {
        id,
        price,
        rating,
        updated_at,
        price_with_sale,
        images,
    } = productResponse;

    return {
        id,
        rating,
        price: price_with_sale ? price_with_sale : price,
        date: +new Date(updated_at),
        img: images[0],
    }
}
