import {IShopProduct} from '../types/product';

export const isProductFavorite = (productId: number, favoriteProductList: IShopProduct[]): boolean => {
    return favoriteProductList.some((item: IShopProduct) => item.id === productId);
};
