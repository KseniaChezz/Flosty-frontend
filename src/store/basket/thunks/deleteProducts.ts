import {Dispatch} from 'react';

import {
    setIsBasketDataProcessing,
    deleteAllProductFromBasketList,
    deleteAllShopProductsFromBasketList,
    deleteShopProductsFromBasketList,
} from '../actions';
import {setError} from '../../app/actions';

import {IBasketAction} from '../types/actions';
import {IAppAction} from '../../app/types/actions';
import {IState} from '../../../store';

import {deleteMethod} from '../../../utils/network';
import {IShopInfoAndBasketProduct} from '../types/state';
import { isShopSelected } from '../../../utils';


interface IResponse {
    data: any;
}

export const deleteProducts = (selectedProductIdListMap: Record<number, number[]>) => {
    return (dispatch: Dispatch<IBasketAction | IAppAction>, getState: () => IState) => {
        dispatch(setIsBasketDataProcessing(true));

        const basketList: IShopInfoAndBasketProduct[] = getState().basket.list;
        const shops: number[] = [];
        let products: number[] = [];

        Object.keys(selectedProductIdListMap).forEach((key: string) => {
            const isSelected: boolean = isShopSelected(+key, selectedProductIdListMap, basketList);

            if (isSelected) {
                shops.push(+key);
            } else {
                products = [...products, ...selectedProductIdListMap[+key]];
            }
        })

        return deleteMethod('/baskets/remove/', {shops, products})
            .then((res: IResponse) => {
                const {data} = res;

                Object.keys(selectedProductIdListMap).forEach((key: string) => {
                    const isSelected: boolean = isShopSelected(+key, selectedProductIdListMap, basketList);

                    if (isSelected) {
                        dispatch(deleteAllShopProductsFromBasketList(+key));
                    } else {
                        dispatch(deleteShopProductsFromBasketList(+key, selectedProductIdListMap[+key]))
                    }
                })

                dispatch(setIsBasketDataProcessing(false));
            })
            .catch((err: any) => {
                console.log('err', err);
                dispatch(setIsBasketDataProcessing(false));
            })
    }
}

export const deleteAllProducts = () => {
    return (dispatch: Dispatch<IBasketAction | IAppAction>, getState: () => IState) => {
        dispatch(setIsBasketDataProcessing(true));

        const basketList: IShopInfoAndBasketProduct[] = getState().basket.list;
        debugger;
        const shops: number[] = basketList.map(item => item.id);

        return deleteMethod('/baskets/remove/', {shops})
            .then((res: IResponse) => {
                const {data} = res;

                dispatch(deleteAllProductFromBasketList());
                dispatch(setIsBasketDataProcessing(false));
            })
            .catch((err: Error) => {
                const {name, message, stack} = err;

                console.log('err', err);
                dispatch(setIsBasketDataProcessing(false));
                dispatch(setError(`name: ${name}, message: ${message}, stack: ${stack}`));
            })
    }
}
