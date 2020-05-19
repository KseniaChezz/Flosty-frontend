import {Dispatch} from 'react';

import {setIsBasketDataProcessing, updateProductQuantityInBasketList} from '../actions';
import {setError} from '../../app/actions';

import {IBasketAction} from '../types/actions';
import {IAppAction} from '../../app/types/actions';

import {put} from '../../../utils/network';


interface IResponse {
    data: any;
}

export const updateProductQuantity = (shopId: number, productId: number, quantity: number) => {
    return (dispatch: Dispatch<IBasketAction | IAppAction>) => {
        dispatch(setIsBasketDataProcessing(true));

        return put(`/baskets/quantity/${productId}`, {quantity})
            .then((res: IResponse) => {
                const {data} = res;

                dispatch(updateProductQuantityInBasketList(shopId, productId, quantity));
                dispatch(setIsBasketDataProcessing(false));
            })
            .catch((err: string) => {
                console.log('err', err);
                dispatch(setIsBasketDataProcessing(false));
                dispatch(setError(err));
            })
    }
}
