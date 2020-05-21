import {Dispatch} from 'react';

import {setIsBasketDataProcessing, setDeliveryPrice} from '../actions';
import {setError} from '../../app/actions';

import {IBasketAction} from '../types/actions';
import {IAppAction} from '../../app/types/actions';

import {get} from '../../../utils/network';

interface IResponse {
    data: number;
}

export const getDeliveryPrice = (addressId: number, deliveryId: number, productIdList: number[]) => {
    return (dispatch: Dispatch<IBasketAction | IAppAction>) => {
        dispatch(setIsBasketDataProcessing(true));

        return get('/delivery/calculate',
            {
                address_id: addressId,
                delivery_type_id: deliveryId,
                basket_products_id: productIdList,
                },
            )
            .then((res: IResponse) => {
                const {data} = res;

                dispatch(setDeliveryPrice(data));
                dispatch(setIsBasketDataProcessing(false));
            })
            .catch((err: string) => {
                console.log('err', err);
                dispatch(setError(err));
                dispatch(setIsBasketDataProcessing(false));
            })
    }
}
