import {Dispatch} from 'react';

import {setIsFeedListLoading, setFeedList} from '../../../store/feed/actions';

import {IFeedAction} from '../../../store/feed/types/actions';
import {IFeedProduct} from '../../../types/product';
import {ISubscription, ISubscriptionResponse} from '../../../types/subscription';

import {get} from '../../../utils/network';
import {mapSubscriptionFomResponse} from '../../../utils';

interface IResponse {
    data: {
        products: IFeedProductResponse[];
    };
}

interface IFeedProductResponse {
    id: number;
    name: string;
    price: number;
    price_with_sale: number;
    image: string;
    rating: string;
    personal_sub: ISubscriptionResponse;
    shop_name: string;
    shop_image: string;
    shop_id: number;
}

export const getFeedList = () => {
    return (dispatch: Dispatch<IFeedAction>) => {
        dispatch(setIsFeedListLoading(true));

        return get('/users/feed',)
            .then((res: IResponse) => {
                const {
                    data: {
                        products,
                    },
                } = res;

                if (products.length !== 0) {
                    const feedList: IFeedProduct[] = products.map((item: IFeedProductResponse) => {
                        const {
                            id,
                            name,
                            price,
                            price_with_sale,
                            rating,
                            image,
                            personal_sub,
                            shop_name,
                            shop_image,
                            shop_id,
                        } = item;

                        return {
                            id,
                            rating,
                            subscription: mapSubscriptionFomResponse(personal_sub),
                            price: price_with_sale ? price_with_sale : price,
                            img: image,
                            shopId: shop_id,
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
