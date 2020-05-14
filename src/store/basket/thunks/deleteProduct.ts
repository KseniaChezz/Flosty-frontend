import {Dispatch} from 'react';

import {setIsBasketDataProcessing, deleteProductFromBasketList} from '../actions';

import {IBasketAction} from '../types/actions';

import {deleteMethod} from '../../../utils/network';


interface IResponse {
    data: any;
}

export const deleteProduct = (shopId: number, productId: number) => {
    return (dispatch: Dispatch<IBasketAction>) => {
        dispatch(setIsBasketDataProcessing(true));

        return deleteMethod('/baskets/remove/', {products: [productId]})
            .then((res: IResponse) => {
                const {data} = res;

                dispatch(deleteProductFromBasketList(shopId, productId));
                dispatch(setIsBasketDataProcessing(false));
            })
            .catch((err: any) => {
                console.log('err', err);
                dispatch(setIsBasketDataProcessing(false));
            })
    }
}
