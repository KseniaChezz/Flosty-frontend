import {Dispatch} from 'react';

import {setIsLoading, addTagListProducts} from '../actions';

import {IProductsAction} from '../types/actions';
import {IShopProduct, IProductResponse} from '../../../types/product';

import {get} from '../../../utils/network';
import {getTagListId, mapProductFromResponse} from '../../../utils';

interface IResponse {
    data: IProductResponse[];
}

export const getProductsByTagList = (tagIdList: number[], shopId?: number) => {
    return (dispatch: Dispatch<IProductsAction>) => {
        dispatch(setIsLoading(true));

        return get('/tags/get_by', {tags: tagIdList})
            .then((res: IResponse) => {
                const {
                    data,
                } = res;
                debugger;

                if (data.length !== 0) {
                    const productList: IShopProduct[] = data.map((item: IProductResponse) => {
                        return mapProductFromResponse(item);
                    });

                    dispatch(addTagListProducts(tagIdList.join('_'), productList));
                }

                dispatch(setIsLoading(false));
            })
            .catch((err: any) => {
                console.log('err', err);
                dispatch(setIsLoading(false));
            })
    }
};
