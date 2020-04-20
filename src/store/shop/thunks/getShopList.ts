import {Dispatch} from 'react';

import {setIsDataProcessing} from '../../app/actions';
import {addShop} from '../actions';

import {IShop} from '../../../types/shop';
import {IAppAction} from '../../app/types/actions';
import {IShopAction} from '../types/actions';

import {get} from '../../../utils/network';

interface IResponse {
    data: {
        shops: IShop[];
    }
}

//TODO: temporary
const shopList: IShop[] = [
    {
        id: 'id1',
        name: 'AZART',
        logo: '',
        subscribers: 123,
        rating: '4,7',
        address: 'Нижний Сусальный пер., 5 стр. 19',
        phoneNumber: '8 (499) 101-01-00',
        email: 'info@az-art.me',
    },
    {
        id: 'id2',
        name: 'INCITY',
        logo: '',
        subscribers: 1000,
        rating: '4,7',
        address: 'Нижний Сусальный пер., 5 стр. 19',
        phoneNumber: '8 (499) 101-01-00',
        email: 'info@az-art.me',
    },
    {
        id: 'id3',
        name: 'JLO',
        logo: '',
        subscribers: 1000000,
        rating: '4,7',
        address: 'Нижний Сусальный пер., 5 стр. 19',
        phoneNumber: '8 (499) 101-01-00',
        email: 'info@az-art.me',
    },
    {
        id: 'id4',
        name: 'MONKI',
        logo: '',
        subscribers: 1431,
        rating: '4,7',
        address: 'Нижний Сусальный пер., 5 стр. 19',
        phoneNumber: '8 (499) 101-01-00',
        email: 'info@az-art.me',
    }
];

export const getShopList = (cb: (shopList: IShop[]) => void) => {
    return (dispatch: Dispatch<IShopAction | IAppAction>) => {
        dispatch(setIsDataProcessing(true));

        return get('/shops',)
            .then((res: IResponse) => {
                const {
                    data: {
                        shops,
                    },
                } = res

                // if (shops.length !== 0) {
                //     shops.forEach((shop: IShop) => dispatch(addShop(shop)))
                // }
                //
                // cb(shops);

                //TODO: temporary
                shopList.forEach(item => dispatch(addShop(item)));
                cb(shopList);

                dispatch(setIsDataProcessing(false));
            })
            .catch((err: any) => {
                console.log('err', err);
                dispatch(setIsDataProcessing(false));
            })
    }
}
