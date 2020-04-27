import {Dispatch} from 'react';

import {setFaforiteListDataIsProcessing, deleteProductFromFaforiteList} from '../actions';

import {IFavoriteAction} from '../types/actions';

import {deleteMethod} from '../../../utils/network';

interface IResponse {
    data: any;
}

export const deleteFavoriteProduct = (productId: number) => {
    return (dispatch: Dispatch<IFavoriteAction>) => {
        dispatch(setFaforiteListDataIsProcessing(true));

        return deleteMethod(`/favorite/${productId}`)
            .then((res: IResponse) => {
                dispatch(deleteProductFromFaforiteList(productId));
                dispatch(setFaforiteListDataIsProcessing(false));
            })
            .catch((err: any) => {
                console.log('err', err);
                dispatch(setFaforiteListDataIsProcessing(false));
            })
    }
}
