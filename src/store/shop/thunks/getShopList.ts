import {Dispatch} from 'react';

import {addShop, setShopIsLoading, setShopList} from '../actions';
import {setError} from '../../app/actions';

import {IShop, ITag, IShopResponse} from '../../../types/shop';
import {IShopAction} from '../types/actions';
import {IAppAction} from '../../app/types/actions';

import {get} from '../../../utils/network';
import {mapShopFromResponse} from '../../../utils';

interface IResponse {
    data: IShopResponse[];
}

export const getShopList = () => {
    return (dispatch: Dispatch<IShopAction | IAppAction>) => {
        dispatch(setShopIsLoading(true));

        return get('/shops',)
            .then((res: IResponse) => {
                const {
                    data: shops,
                } = res

                if (shops.length !== 0) {
                    const shopList: IShop[] = shops.map((shop: IShopResponse) => {
                        return mapShopFromResponse(shop);
                    });

                    shopList.forEach((shop: IShop) => dispatch(addShop(shop)));
                    dispatch(setShopList(shopList));
                }

                dispatch(setShopIsLoading(false));
            })
            .catch((err: string) => {
                console.log('err', err);
                dispatch(setShopIsLoading(false));
                dispatch(setError(err));
            })
    }
}
