import {Dispatch} from 'react';

import {setIsBasketDataProcessing} from '../actions';

import {IBasketAction} from '../types/actions';

import {post} from '../../../utils/network';


interface IResponse {
    data: any;
}

export const putProductToBasket = (productId: number, color: string | undefined, size: string | undefined) => {
    return (dispatch: Dispatch<IBasketAction>) => {
        dispatch(setIsBasketDataProcessing(true));

        return post(`/baskets/add/${productId}`, {color, size})
            .then((res: IResponse) => {
                const {data} = res;

                dispatch(setIsBasketDataProcessing(false));
            })
            .catch((err: any) => {
                console.log('err', err);
                dispatch(setIsBasketDataProcessing(false));
            })
    }
}
