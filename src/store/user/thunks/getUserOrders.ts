import {Dispatch} from 'react';

import {setIsLoading, setOrderList} from '../actions';
import {setError} from '../../app/actions';

import {get} from '../../../utils/network';

import {IUserAction} from '../types/actions';
import {IAppAction} from '../../app/types/actions';
import {IOrderResponse} from '../../../types/user';

import {mapOrderResponse} from '../../../utils';

interface IResponse {
    data: IOrderResponse[];
}

export const getUserOrders = () => {
    return (dispatch: Dispatch<IUserAction | IAppAction>) => {
        dispatch(setIsLoading(true));

        return get('/orders')
            .then((res: IResponse) => {
                const {data} = res;

                if (data.length !== 0) {
                    dispatch(setOrderList(data.map((item: IOrderResponse) => mapOrderResponse(item))));
                }

                dispatch(setIsLoading(false));
            })
            .catch((err: string) => {
                dispatch(setIsLoading(false));
                console.log('err', err);
                dispatch(setError(err));
            })
    }
};
