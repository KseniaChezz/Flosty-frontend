import {Dispatch} from 'react';

import {
    setIsBasketDataProcessing,
    selectAddress,
    selectCard,
    selectDeliveryType,
    setDeliveryPrice,
} from '../actions';
import {setError} from '../../app/actions';

import {IBasketAction} from '../types/actions';
import {IAppAction} from '../../app/types/actions';

import {post} from '../../../utils/network';

interface IResponse {
    data: number;
}

export const makeOrder = (addressId: number, deliveryId: number, productIdList: number[], cb: () => void) => {
    return (dispatch: Dispatch<IBasketAction | IAppAction>) => {
        dispatch(setIsBasketDataProcessing(true));

        return post('/orders/create',
            {
                address_id: addressId,
                delivery_type_id: deliveryId,
                basket_products_id: productIdList,
            },
        )
            .then((res: IResponse) => {
                const {data} = res;
                debugger;

                dispatch(setIsBasketDataProcessing(false));
                dispatch(selectAddress());
                dispatch(selectCard());
                dispatch(selectDeliveryType());
                dispatch(setDeliveryPrice(0));
                cb();
            })
            .catch((err: string) => {
                console.log('err', err);
                dispatch(setError(err));
                dispatch(setIsBasketDataProcessing(false));
                cb();
            })
    }
}
