import {Dispatch} from 'react';

import {addShop, setShopIsLoading, setShopList} from '../actions';

import {IShop, ITag, IShopResponse} from '../../../types/shop';
import {IShopAction} from '../types/actions';

import {get} from '../../../utils/network';
import {mapShopFromResponse} from '../../../utils';

interface IResponse {
    data: IShopResponse[];
}

export const getShopList = () => {
    return (dispatch: Dispatch<IShopAction>) => {
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
            .catch((err: any) => {
                console.log('err', err);
                dispatch(setShopIsLoading(false));
            })
    }
}
