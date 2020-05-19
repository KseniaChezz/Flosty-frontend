import {Dispatch} from 'react';

import {setIsLoading, setPopularProductList} from '../actions';
import {setError} from '../../app/actions';

import {IProductsAction} from '../types/actions';
import {IAppAction} from '../../app/types/actions';
import {IProductResponse, IShopProduct} from '../../../types/product';

import {get} from '../../../utils/network';
import {mapProductFromResponse} from '../../../utils';

interface IResponse {
    data: IProductResponse[];
}

export const searchProducts = (text: string, cb:(productList: IShopProduct[]) => void) => {
    return (dispatch: Dispatch<IProductsAction | IAppAction>) => {
        dispatch(setIsLoading(true));

        return get('/products/search', {text})
            .then((res: IResponse) => {
                const {
                    data,
                } = res;

                const productList: IShopProduct[] = data.map((item: IProductResponse) => {
                    return mapProductFromResponse(item);
                });

                cb(productList);
                dispatch(setIsLoading(false));
            })
            .catch((err: Error) => {
                const {name, message, stack} = err;

                console.log('err', err);
                dispatch(setIsLoading(false));
                dispatch(setError(`name: ${name}, message: ${message}, stack: ${stack}`));
            })
    }
};
