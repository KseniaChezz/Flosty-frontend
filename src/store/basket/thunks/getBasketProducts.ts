import {Dispatch} from 'react';

import {setIsBasketListLoading, setBasketList} from '../actions';

import {IBasketAction} from '../types/actions';
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
    return (dispatch: Dispatch<IBasketAction>) => {
        dispatch(setIsBasketListLoading(true));

        return get('/baskets/get')
            .then((res: IResponse) => {
                const {
                    data: {
                        shops,
                    },
                } = res;

                if (shops.length) {
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
            .catch((err: any) => {
                console.log('err', err);
                dispatch(setIsBasketListLoading(false));
            })
    }
}
