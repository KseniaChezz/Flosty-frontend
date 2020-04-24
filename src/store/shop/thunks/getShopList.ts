import {Dispatch} from 'react';

import {addShop, setShopIsLoading, setShopList} from '../actions';

import {IShop, ITag} from '../../../types/shop';
import {IShopAction} from '../types/actions';

import {get} from '../../../utils/network';

interface IResponse {
    data: IShopResponse[];
}

interface IShopResponse {
    id: number;
    name: string;
    description: string;
    image: string;
    rating: string;
    address: string;
    phone_number: string;
    email: string;
    subscribers: number;
    last_three_product_images: string[];
    top_tags: ITag[];
}

export const getShopList = () => {
    return (dispatch: Dispatch<IShopAction>) => {
        dispatch(setShopIsLoading(true));

        return get('/shops',)
            .then((res: IResponse) => {
                const {
                    data: shops,
                } = res

                if (shops.length !== 0) {
                    const shopList: IShop[] = shops.map((shop: IShopResponse) => {
                        const {
                            id,
                            name,
                            description,
                            image,
                            address,
                            phone_number,
                            email,
                            rating,
                            subscribers,
                            last_three_product_images,
                            top_tags,
                        } = shop;

                        return {
                            id,
                            name,
                            description,
                            address,
                            email,
                            rating,
                            subscribers,
                            tagList: top_tags,
                            logo: image,
                            phoneNumber: phone_number,
                            productImgList: last_three_product_images,
                        };
                    });

                    shopList.forEach((shop: IShop) => dispatch(addShop(shop)));
                    dispatch(setShopList(shopList));
                }

                dispatch(setShopIsLoading(false));
            })
            .catch((err: any) => {
                console.log('err', err);
                dispatch(setShopIsLoading(false));
            })
    }
}
