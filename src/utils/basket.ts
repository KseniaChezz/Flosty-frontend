import {SetStateAction, Dispatch} from 'react';

import {IBasketProductResponse, IBasketProduct} from '../types/basket';
import {IShopInfoAndBasketProduct} from '../store/basket/types/state';
import {IAddress} from '../types/user';

export const mapBasketProductResponse = (basketProductResponse: IBasketProductResponse): IBasketProduct => {
    const {
        id,
        name,
        price,
        total_price,
        color,
        size,
        quantity,
        image,
    } = basketProductResponse;

    return {
        id,
        name,
        image,
        color,
        size,
        quantity,
        price: total_price ? total_price : price,
    }
};

export const getTotalBasketProductsCount = (list: IShopInfoAndBasketProduct[]): number => {
    let result: number = 0;

    list.forEach((item: IShopInfoAndBasketProduct) => {
        result += item.productList.length;
    });

    return result;
};

export const isShopSelected = (
    shopId: number,
    selectedShopProductMap: Record<number, number[]>,
    basketProductList: IShopInfoAndBasketProduct[],
): boolean => {
    const selectedShopList: number[] | undefined = selectedShopProductMap[shopId];
    const basketShop: IShopInfoAndBasketProduct | undefined = basketProductList.find(
        (item: IShopInfoAndBasketProduct) => item.id === shopId);
    const basketShopList: IBasketProduct[] | undefined = basketShop?.productList;

    return !!selectedShopList && !!basketShopList && selectedShopList.length === basketShopList.length;
};

export const isProductSelected = (
    shopId: number,
    productId: number,
    selectedShopProductMap: Record<number, number[]>,
): boolean => {
    const shopList: number[] | undefined = selectedShopProductMap[shopId];

    return !!shopList && !!shopList.find((id: number) => id === productId);
};

export const selectAllBasketProducts = (
    basketProductList: IShopInfoAndBasketProduct[],
    setSelectedProductIdListMap: Dispatch<SetStateAction<Record<number, number[]>>>,
): void => {
    const newSelectedProductListMap: Record<number, number[]> = {};

    basketProductList.forEach((item: IShopInfoAndBasketProduct) => {
        const {id, productList} = item;

        newSelectedProductListMap[id] = productList.map((item: IBasketProduct) => item.id);
    });

    setSelectedProductIdListMap(newSelectedProductListMap);
};

export const selectAllShopBasketProducts = (
    shopId: number,
    basketProductList: IShopInfoAndBasketProduct[],
    setSelectedProductIdListMap: Dispatch<SetStateAction<Record<number, number[]>>>,
): void => {
    setSelectedProductIdListMap((prev: Record<number, number[]>) => {
        const newSelectedProductList = {...prev};
        const shop: IShopInfoAndBasketProduct | undefined =
            basketProductList.find((item: IShopInfoAndBasketProduct) => item.id === shopId);

        if (shop) {
            newSelectedProductList[shopId] = shop.productList.map((item: IBasketProduct) => item.id);
        }

        return newSelectedProductList;
    });
};

export const selectBasketProduct = (
    shopId: number,
    productId: number,
    setSelectedProductIdListMap: Dispatch<SetStateAction<Record<number, number[]>>>,
): void => {
    setSelectedProductIdListMap((prev: Record<number, number[]>) => {
        return {
            ...prev,
            [shopId]: prev[shopId] ? [...prev[shopId], productId] : [productId],
        }
    })
};

export const unSelectAllShopBasketProducts = (
    shopId: number,
    setSelectedProductIdListMap: Dispatch<SetStateAction<Record<number, number[]>>>,
): void => {
    setSelectedProductIdListMap((prev: Record<number, number[]>) => {
        const newSelectedProductList = {...prev};
        delete newSelectedProductList[shopId];
        return newSelectedProductList;
    });
};

export const unSelectBasketProduct = (
    shopId: number,
    productId: number,
    setSelectedProductIdListMap: Dispatch<SetStateAction<Record<number, number[]>>>,
): void => {
    setSelectedProductIdListMap((prev: Record<number, number[]>) => {
        return {
            ...prev,
            [shopId]: prev[shopId].filter((id: number) => id !== productId),
        }
    })
};

export const getSelectedBasketProductsCount = (selectedShopProductMap: Record<number, number[]>): number => {
    let result: number = 0;

    Object.keys(selectedShopProductMap).forEach((key: string) => {
        result += selectedShopProductMap[+key].length;
    });

    return result;
};

export const getSelectedBasketProductsPrice = (
    selectedShopProductMap: Record<number, number[]>,
    basketProductList: IShopInfoAndBasketProduct[],
): number => {
    let result: number = 0;

    Object.keys(selectedShopProductMap).forEach((key: string) => {
        const shopProductIdList = selectedShopProductMap[+key];

        shopProductIdList.forEach((id: number) => {
            const shop: IShopInfoAndBasketProduct | undefined = basketProductList.find(
                (item: IShopInfoAndBasketProduct) => item.id === +key);

            if (shop) {
                const product: IBasketProduct | undefined = shop.productList.find(
                    (item: IBasketProduct) => item.id === id);

                if (product) {
                    const {price, quantity} = product;

                    result += price * quantity;
                }
            }
        })
    });

    return result;
};

export const getAddressForBasketMenuItem = (address: IAddress): string => {
    const {
        country,
        region,
        city,
        street,
        house,
        building,
        block,
        apartment,
        index,
    } = address;
    let result: string = `${index}, ${country}, ${city}, ${street}, д.${house}, `;

    if (building) {
        result += `к.${building}, `;
    }

    if (block) {
        result += `стр.${block}, `;
    }

    result += `кв.${apartment}`;

    return result;
}
