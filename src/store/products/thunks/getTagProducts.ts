import {Dispatch} from 'react';

import {setIsLoading, addShopProducts, addTagProducts} from '../actions';

import {IProductsAction} from '../types/actions';
import {IShopProduct, ITagProductResponse} from '../../../types/product';

import {get} from '../../../utils/network';
import {getTagListId, mapProductFromResponse} from '../../../utils';

interface IResponse {
    data: ITagProductResponse[];
}

export const getTagProducts = (tagIdList: number[]) => {
    return (dispatch: Dispatch<IProductsAction>) => {
        dispatch(setIsLoading(true));

        return get(`/tags/get_by/`, {tags: tagIdList})
            .then((res: IResponse) => {
                const {
                    data,
                } = res;
                debugger;

                if (data.length !== 0) {
                    const tagProductList: IShopProduct[] = data.map((item: ITagProductResponse) => {
                        return mapProductFromResponse(item);
                    });
                    debugger;
                    dispatch(addTagProducts(getTagListId(tagIdList), tagProductList));
                }

                dispatch(setIsLoading(false));
            })
            .catch((err: any) => {
                console.log('err', err);
                dispatch(setIsLoading(false));
            })
    }
};
