import {Dispatch} from 'react';

import {setIsLoading, addShopProducts} from '../actions';

import {IProductsAction} from '../types/actions';
import {IShopProduct, IShopProductResponse} from '../../../types/product';

import {get} from '../../../utils/network';
import {mapProductFromResponse} from '../../../utils';

interface IResponse {
    data: IShopProductResponse[];
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
                        return mapProductFromResponse(item);
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
