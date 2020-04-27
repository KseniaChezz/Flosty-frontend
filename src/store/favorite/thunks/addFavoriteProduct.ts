import {Dispatch} from 'react';

import {setFaforiteListDataIsProcessing, addProductToFaforiteList} from '../actions';

import {IFavoriteAction} from '../types/actions';
import {IShopProduct} from '../../../types/product';

import {post} from '../../../utils/network';

interface IResponse {
    data: any;
}

export const addFavoriteProduct = (product: IShopProduct) => {
    return (dispatch: Dispatch<IFavoriteAction>) => {
        dispatch(setFaforiteListDataIsProcessing(true));

        const {id} = product;

        return post(`/favorite/${id}`)
            .then((res: IResponse) => {
                dispatch(addProductToFaforiteList(product));
                dispatch(setFaforiteListDataIsProcessing(false));
            })
            .catch((err: any) => {
                console.log('err', err);
                dispatch(setFaforiteListDataIsProcessing(false));
            })
    }
}
