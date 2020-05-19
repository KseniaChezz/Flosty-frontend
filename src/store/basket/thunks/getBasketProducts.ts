import {Dispatch} from 'react';

import {setIsBasketListLoading, setBasketList} from '../actions';
import {setError} from '../../app/actions';

import {IBasketAction} from '../types/actions';
import {IAppAction} from '../../app/types/actions';
import {IBasketProductResponse} from '../../../types/basket';
import {IShopInfoAndBasketProduct} from '../types/state';

import {get} from '../../../utils/network';
import {mapBasketProductResponse} from '../../../utils';

interface IResponse {
    data: {
        shops: IBasketItemResponse[];
    };
}

interface IBasketItemResponse {
    id: number;
    name: string;
    image: string;
    products: IBasketProductResponse[];
}

export const getBasketProducts = () => {
    return (dispatch: Dispatch<IBasketAction | IAppAction>) => {
        dispatch(setIsBasketListLoading(true));

        return get('/baskets/get')
            .then((res: IResponse) => {
                const {
                    data: {
                        shops,
                    },
                } = res;

                if (shops && shops.length) {
                    const list: IShopInfoAndBasketProduct[] = shops.map((item: IBasketItemResponse) => {
                        const {
                            id,
                            name: shopName,
                            image,
                            products,
                        } = item;

                        return {
                            id,
                            shopName,
                            shopLogo: image,
                            productList: products.map((item: IBasketProductResponse) => mapBasketProductResponse(item)),
                        }
                    })

                    dispatch(setBasketList(list));
                }

                dispatch(setIsBasketListLoading(false));
            })
            .catch((err: string) => {
                console.log('err', err);
                dispatch(setIsBasketListLoading(false));
                dispatch(setError(err));
            })
    }
}
