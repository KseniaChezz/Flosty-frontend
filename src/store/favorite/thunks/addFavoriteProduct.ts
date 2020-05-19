import {Dispatch} from 'react';

import {setFaforiteListDataIsProcessing, addProductToFaforiteList} from '../actions';
import {setError} from '../../app/actions';

import {IFavoriteAction} from '../types/actions';
import {IShopProduct} from '../../../types/product';
import {IAppAction} from '../../app/types/actions';

import {post} from '../../../utils/network';

interface IResponse {
    data: any;
}

export const addFavoriteProduct = (product: IShopProduct) => {
    return (dispatch: Dispatch<IFavoriteAction | IAppAction>) => {
        dispatch(setFaforiteListDataIsProcessing(true));

        const {id} = product;

        return post(`/favorite/${id}`)
            .then((res: IResponse) => {
                dispatch(addProductToFaforiteList(product));
                dispatch(setFaforiteListDataIsProcessing(false));
            })
            .catch((err: Error) => {
                const {name, message, stack} = err;

                console.log('err', err);
                dispatch(setFaforiteListDataIsProcessing(false));
                dispatch(setError(`name: ${name}, message: ${message}, stack: ${stack}`));
            })
    }
}
