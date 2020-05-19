import {Dispatch} from 'react';

import {setFaforiteListIsLoading, setFaforiteList} from '../actions';
import {setError} from '../../app/actions';

import {IFavoriteAction} from '../types/actions';
import {IAppAction} from '../../app/types/actions';
import {IProductResponse, IShopProduct} from '../../../types/product';

import {get} from '../../../utils/network';
import {mapProductFromResponse} from '../../../utils';

interface IResponse {
    data: IProductResponse[];
}

export const getFavoriteList = () => {
    return (dispatch: Dispatch<IFavoriteAction | IAppAction>) => {
        dispatch(setFaforiteListIsLoading(true));

        return get('/favorite')
            .then((res: IResponse) => {
                const {data} = res;

                if (data.length !== 0) {
                    const favoriteList: IShopProduct[] = data.map((item: IProductResponse) => {
                        return mapProductFromResponse(item);
                    });

                    dispatch(setFaforiteList(favoriteList));
                }

                dispatch(setFaforiteListIsLoading(false));
            })
            .catch((err: Error) => {
                const {name, message, stack} = err;

                console.log('err', err);
                dispatch(setFaforiteListIsLoading(false));
                dispatch(setError(`name: ${name}, message: ${message}, stack: ${stack}`));
            })
    }
}
