import {Dispatch} from 'react';

import {setIsLoading, addShopProducts} from '../actions';

import {IProductsAction} from '../types/actions';
import {IShopProduct} from '../../../types/product';

import {get} from '../../../utils/network';

interface IResponse {
    data: IShopProductResponse[];
}

interface IShopProductResponse {
    id: number;
    price: number;
    price_with_sale: number;
    updated_at: string;
    rating: string;
    images: string[];
}

export const getShopProducts = (shopId: number) => {
    return (dispatch: Dispatch<IProductsAction>) => {
        dispatch(setIsLoading(true));

        return get(`/shops/${shopId}/products`,)
            .then((res: IResponse) => {
                const {
                    data,
                } = res;

                if (data.length !== 0) {
                    const shopProductList: IShopProduct[] = data.map((item: IShopProductResponse) => {
                        const {
                            id,
                            price,
                            rating,
                            updated_at,
                            price_with_sale,
                            images,
                        } = item;

                        return {
                            id,
                            rating,
                            price: price_with_sale ? price_with_sale : price,
                            date: +new Date(updated_at),
                            img: images[0],
                        }
                    });

                    dispatch(addShopProducts(shopId, shopProductList));
                }

                dispatch(setIsLoading(false));
            })
            .catch((err: any) => {
                console.log('err', err);
                dispatch(setIsLoading(false));
            })
    }
};
