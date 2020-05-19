import {Dispatch} from 'react';

import {setIsLoading, addShopAndTagListProducts} from '../actions';
import {setError} from '../../app/actions';

import {IProductsAction} from '../types/actions';
import {IAppAction} from '../../app/types/actions';
import {IShopProduct, IProductResponse} from '../../../types/product';
import {ITag} from '../../../types/shop';

import {get} from '../../../utils/network';
import {mapProductFromResponse, getTagListAndShopId} from '../../../utils';

interface IResponse {
    data: {
        products: IProductResponse[];
        top_tags: ITag[];
    };
}

export const getProductsByTagListAndShop = (
    tagIdList: number[],
    shopId: number[] | undefined,
    cb?: (productList: IShopProduct[], popularTagList: ITag[]) => void) => {
    return (dispatch: Dispatch<IProductsAction | IAppAction>) => {
        dispatch(setIsLoading(true));

        const params: {tags: number[]; shops?: number[];} = {
            tags: tagIdList,
        };

        if (shopId) {
            params.shops = shopId;
        }

        return get('/products/by_params', params)
            .then((res: IResponse) => {
                const {
                    data: {
                        products,
                        top_tags,
                    },
                } = res;

                if (products.length !== 0) {
                    const productList: IShopProduct[] = products.map((item: IProductResponse) => {
                        return mapProductFromResponse(item);
                    });

                    dispatch(addShopAndTagListProducts(
                        getTagListAndShopId(tagIdList, shopId),
                        {
                            productList,
                            popularTagList: top_tags,
                        }));

                    cb && cb(productList, top_tags);
                }

                dispatch(setIsLoading(false));
            })
            .catch((err: string) => {
                console.log('err', err);
                dispatch(setIsLoading(false));
                dispatch(setError(err));
            })
    }
};
