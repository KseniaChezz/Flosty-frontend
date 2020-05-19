import {Dispatch} from 'react';

import {setIsLoading, addTagProducts} from '../actions';
import {setError} from '../../app/actions';

import {IProductsAction} from '../types/actions';
import {IAppAction} from '../../app/types/actions';
import {IShopProduct, IProductResponse} from '../../../types/product';
import {ITag} from '../../../types/shop';

import {get} from '../../../utils/network';
import {mapProductFromResponse} from '../../../utils';

interface IResponse {
    data: {
        id: number;
        name: string;
        image: string;
        subscribers: number;
        top_tags: ITag[];
        products: IProductResponse[];
    };
}

export const getTagProducts = (tagId: number) => {
    return (dispatch: Dispatch<IProductsAction | IAppAction>) => {
        dispatch(setIsLoading(true));

        return get(`/tags/${tagId}/products`)
            .then((res: IResponse) => {
                const {
                    data: {
                        name,
                        subscribers,
                        image,
                        top_tags,
                        products,
                    },
                } = res;

                if (products.length !== 0) {
                    const tagProductList: IShopProduct[] = products.map((item: IProductResponse) => {
                        return mapProductFromResponse(item);
                    });
                    dispatch(addTagProducts(
                        tagId,
                        {
                            name,
                            subscribers,
                            logo: image,
                            popularTagList: top_tags,
                            productList: tagProductList,
                        },
                    ));
                }

                dispatch(setIsLoading(false));
            })
            .catch((err: Error) => {
                const {name, message, stack} = err;

                console.log('err', err);
                dispatch(setIsLoading(false));
                dispatch(setError(`name: ${name}, message: ${message}, stack: ${stack}`));
            })
    }
};
