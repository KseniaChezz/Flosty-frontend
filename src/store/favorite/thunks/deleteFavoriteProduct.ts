import {Dispatch} from 'react';

import {setFaforiteListDataIsProcessing, deleteProductFromFaforiteList} from '../actions';
import {setError} from '../../app/actions';

import {IFavoriteAction} from '../types/actions';
import {IAppAction} from '../../app/types/actions';

import {deleteMethod} from '../../../utils/network';

interface IResponse {
    data: any;
}

export const deleteFavoriteProduct = (productId: number) => {
    return (dispatch: Dispatch<IFavoriteAction | IAppAction>) => {
        dispatch(setFaforiteListDataIsProcessing(true));

        return deleteMethod(`/favorite/${productId}`)
            .then((res: IResponse) => {
                dispatch(deleteProductFromFaforiteList(productId));
                dispatch(setFaforiteListDataIsProcessing(false));
            })
            .catch((err: Error) => {
                const {name, message, stack} = err;

                console.log('err', err);
                dispatch(setFaforiteListDataIsProcessing(false));
                dispatch(setError(`name: ${name}, message: ${message}, stack: ${stack}`));
            })
    }
}
