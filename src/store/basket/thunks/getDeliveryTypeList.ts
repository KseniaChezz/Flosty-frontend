import {Dispatch} from 'react';

import {setDeliveryTypeList, selectDeliveryType} from '../actions';
import {setError} from '../../app/actions';

import {IBasketAction} from '../types/actions';
import {IAppAction} from '../../app/types/actions';
import {IDeliveryType} from '../../../types/basket';

import {get} from '../../../utils/network';

interface IResponse {
    data: IDeliveryType[];
}

export const getDeliveryTypeList = () => {
    return (dispatch: Dispatch<IBasketAction | IAppAction>) => {
        return get('/delivery/types')
            .then((res: IResponse) => {
                const {data} = res;

                if (data.length !== 0) {
                    dispatch(setDeliveryTypeList(data));
                    dispatch(selectDeliveryType(data[0]));
                }
            })
            .catch((err: string) => {
                console.log('err', err);
                dispatch(setError(err));
            })
    }
}
