import {Dispatch} from 'react';

import {setIsBasketDataProcessing} from '../actions';
import {setError} from '../../app/actions';

import {IBasketAction} from '../types/actions';
import {IAppAction} from '../../app/types/actions';

import {post} from '../../../utils/network';

interface IResponse {
    data: any;
}

interface IParams {
    color?: string;
    size?: string;
}

export const putProductToBasket = (
    productId: number,
    color: string | undefined,
    size: string | undefined,
    cb: () => void,
) => {
    return (dispatch: Dispatch<IBasketAction | IAppAction>) => {
        dispatch(setIsBasketDataProcessing(true));
        const params: IParams = {};

        if (color) {
            params.color = color;
        }

        if (size) {
            params.size = size;
        }

        return post(`/baskets/add/${productId}`, {...params})
            .then((res: IResponse) => {
                const {data} = res;

                dispatch(setIsBasketDataProcessing(false));
                cb();
            })
            .catch((err: string) => {
                console.log('err', err);
                dispatch(setIsBasketDataProcessing(false));
                dispatch(setError(err));
            })
    }
}
