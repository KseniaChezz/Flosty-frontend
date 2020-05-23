import {Dispatch} from 'react';

import {
    setIsBasketDataProcessing,
    selectAddress,
    selectCard,
    selectDeliveryType,
    setDeliveryPrice,
} from '../actions';
import {setError} from '../../app/actions';
import {getBasketProducts} from './getBasketProducts';

import {IBasketAction} from '../types/actions';
import {IAppAction} from '../../app/types/actions';

import {post} from '../../../utils/network';

interface IResponse {
    data: number;
}

export const makeOrder = (
    addressId: number,
    cardId: number,
    deliveryId: number,
    productIdList: number[],
    cb: (isError: boolean) => void,
) => {
    return (dispatch: Dispatch<IBasketAction | IAppAction>) => {
        dispatch(setIsBasketDataProcessing(true));

        return post('/orders/create',
            {
                address_id: addressId,
                card_id: cardId,
                delivery_type_id: deliveryId,
                basket_products_id: productIdList,
            },
        )
            .then((res: IResponse) => {
                const {data} = res;

                dispatch(setIsBasketDataProcessing(false));
                dispatch(selectAddress());
                dispatch(selectCard());
                dispatch(selectDeliveryType());
                dispatch(setDeliveryPrice(0));
                dispatch(getBasketProducts());
                cb(false);
            })
            .catch((err: string) => {
                console.log('err', err);
                dispatch(setError(err));
                dispatch(setIsBasketDataProcessing(false));
                cb(true);
            })
    }
}
