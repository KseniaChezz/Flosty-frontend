import {Dispatch} from 'react';

import {setIsLoading, addShopProducts, addTagProducts} from '../actions';

import {IProductsAction} from '../types/actions';
import {IShopProduct, IProductResponse} from '../../../types/product';

import {get} from '../../../utils/network';
import {getTagListId, mapProductFromResponse} from '../../../utils';
import { ITag } from '../../../types/shop';

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
    return (dispatch: Dispatch<IProductsAction>) => {
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
            .catch((err: any) => {
                console.log('err', err);
                dispatch(setIsLoading(false));
            })
    }
};
