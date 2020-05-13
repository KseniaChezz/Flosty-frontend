import {Dispatch} from 'react';

import {setIsLoading, addDetailProduct} from '../actions';

import {IProductsAction} from '../types/actions';
import {
    IDetailedProductResponse,
    IColorResponse,
    ISizeResponse,
    IDetailProduct,
} from '../../../types/product';

import {get} from '../../../utils/network';
import {mapColorProductResponse, mapSizeProductResponse} from '../../../utils';

interface IResponse {
    data: IDetailedProductResponse;
}

export const getDetailProduct = (shopId: number, productId: number) => {
    return (dispatch: Dispatch<IProductsAction>) => {
        dispatch(setIsLoading(true));

        return get(`/shops/${shopId}/products/${productId}`,)
            .then((res: IResponse) => {
                const {
                    data,
                } = res;
                const {
                    id,
                    shop_id,
                    name,
                    price,
                    rating,
                    updated_at,
                    price_with_sale,
                    tags,
                    description,
                    number_of_sales,
                    number_of_saves,
                    characteristic,
                    images,
                    colors,
                    sizes,
                } = data;
                const detailProduct: IDetailProduct = {
                    id,
                    name,
                    description,
                    rating,
                    tagList: tags,
                    characteristic: JSON.parse(characteristic),
                    date: +new Date(updated_at),
                    imageList: images,
                    price: price_with_sale ? price_with_sale : price,
                    shopId: shop_id,
                    oldPrice: price_with_sale ? price: undefined,
                    boughtNumber: number_of_sales,
                    savedNumber: number_of_saves,
                }

                if (colors) {
                    detailProduct.colorList = colors.map((item: IColorResponse) => mapColorProductResponse(item));
                }

                if (sizes) {
                    detailProduct.sizeList = sizes.map((item: ISizeResponse) => mapSizeProductResponse(item));
                }

                dispatch(addDetailProduct(detailProduct))
                dispatch(setIsLoading(false));
            })
            .catch((err: any) => {
                console.log('err', err);
                dispatch(setIsLoading(false));
            })
    }
};
