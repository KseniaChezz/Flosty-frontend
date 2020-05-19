import {Dispatch} from 'react';

import {addShop, setShopIsLoading, setShopList} from '../actions';
import {setError} from '../../app/actions';

import {IShop, ITag, IShopResponse} from '../../../types/shop';
import {IShopAction} from '../types/actions';
import {IAppAction} from '../../app/types/actions';

import {get} from '../../../utils/network';
import {mapShopFromResponse} from '../../../utils';

interface IResponse {
    data: IShopResponse;
}

export const getShop = (id: number) => {
    return (dispatch: Dispatch<IShopAction | IAppAction>) => {
        dispatch(setShopIsLoading(true));

        return get(`/shops/${id}`,)
            .then((res: IResponse) => {
                const {
                    data,
                } = res;
                const shop: IShop = mapShopFromResponse(data);

                dispatch(addShop(shop));
                dispatch(setShopIsLoading(false));
            })
            .catch((err: string) => {
                console.log('err', err);
                dispatch(setShopIsLoading(false));
                dispatch(setError(err));
            })
    }
}
