import {Dispatch} from 'react';

import {setIsBasketDataProcessing} from '../actions';
import {setError} from '../../app/actions';

import {IBasketAction} from '../types/actions';
import {IAppAction} from '../../app/types/actions';

import {post} from '../../../utils/network';

interface IResponse {
    data: any;
}

export const putProductToBasket = (
    productId: number,
    color: string | undefined,
    size: string | undefined,
    cb: () => void,
) => {
    return (dispatch: Dispatch<IBasketAction | IAppAction>) => {
        dispatch(setIsBasketDataProcessing(true));

        return post(`/baskets/add/${productId}`, {color, size})
            .then((res: IResponse) => {
                const {data} = res;

                dispatch(setIsBasketDataProcessing(false));
                cb();
            })
            .catch((err: Error) => {
                const {name, message, stack} = err;

                console.log('err', err);
                dispatch(setIsBasketDataProcessing(false));
                dispatch(setError(`name: ${name}, message: ${message}, stack: ${stack}`));
            })
    }
}
