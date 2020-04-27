import {IProductResponse, IShopProduct} from '../types/product';
import {ITag} from '../types/shop';

export const isStringWithNumbers = (value: string): boolean => {
    return /^\d{1,}$/.test(value);
};

export const getTagListId = (tagIdList: number[]): string => {
    if (tagIdList.length === 1) return tagIdList[0].toString();

    return tagIdList.join(',');
}

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
