import {Dispatch} from 'react';

import {setIsFeedListLoading, setFeedList} from '../../../store/feed/actions';

import {IFeedAction} from '../../../store/feed/types/actions';
import {IFeedProduct} from '../../../types/product';

import {get} from '../../../utils/network';

interface IResponse {
    data: IFeedResponse[];
}

interface IFeedResponse {
    id: number;
    name: string;
    price: number;
    price_with_sale: number;
    image: string;
    rating: string;
    ref: {
        type: string;
        id: number;
        name: string;
    },
    shop_name: string;
    shop_image: string;
}

export const getFeedList = () => {
    return (dispatch: Dispatch<IFeedAction>) => {
        dispatch(setIsFeedListLoading(true));

        return get('/users/feed',)
            .then((res: IResponse) => {
                const {
                    data,
                } = res;

                if (data.length !== 0) {
                    const feedList: IFeedProduct[] = data.map((item: IFeedResponse) => {
                        const {
                            id,
                            name,
                            price,
                            price_with_sale,
                            rating,
                            image,
                            ref,
                            shop_name,
                            shop_image,
                        } = item;

                        return {
                            id,
                            ref,
                            rating,
                            price: price_with_sale ? price_with_sale : price,
                            img: image,
                            shopName:shop_name,
                            shopLogo: shop_image,
                        }
                    })

                    dispatch(setFeedList(feedList));
                }

                dispatch(setIsFeedListLoading(false));
            })
            .catch((err: any) => {
                console.log('err', err);
                dispatch(setIsFeedListLoading(false));
            })
    }
};
