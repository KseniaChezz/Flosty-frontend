import {Dispatch} from 'react';

import {setIsBasketDataProcessing, deleteProductFromBasketList} from '../actions';
import {setError} from '../../app/actions';

import {IBasketAction} from '../types/actions';
import {IAppAction} from '../../app/types/actions';

import {deleteMethod} from '../../../utils/network';


interface IResponse {
    data: any;
}

export const deleteProduct = (shopId: number, productId: number) => {
    return (dispatch: Dispatch<IBasketAction | IAppAction>) => {
        dispatch(setIsBasketDataProcessing(true));

        return deleteMethod('/baskets/remove/', {products: [productId]})
            .then((res: IResponse) => {
                const {data} = res;

                dispatch(deleteProductFromBasketList(shopId, productId));
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
