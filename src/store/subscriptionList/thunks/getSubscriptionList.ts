import {Dispatch} from 'react';

import {setSubscriptionList, setSubscriptionListIsLoading} from '../../subscriptionList/actions';

import {ISubscriptionListAction} from '../../subscriptionList/types/actions';
import {ISubscription, ISubscriptionShop, ISubscriptionTag} from '../../../types/subscription';

import {get} from '../../../utils/network';

import {SubscriptionType} from '../../../enums';

interface IResponse {
    data: ISubscriptionResponse[];
}

interface ISubscriptionResponse {
    id: number;
    updated_at: string;
    shops: ISubscriptionShop[];
    tags: ISubscriptionTag[];
}

export const getSubscriptionList = () => {
    return (dispatch: Dispatch<ISubscriptionListAction>) => {
        dispatch(setSubscriptionListIsLoading(true));

        return get('/personal_subs',)
            .then((res: IResponse) => {
                const {
                    data: list,
                } = res;

                if (list) {
                    const subscriptionList: ISubscription[] = list.map((item: ISubscriptionResponse) => {
                        const {
                            id,
                            updated_at,
                            shops,
                            tags,
                        } = item;
                        let type: SubscriptionType = SubscriptionType.ADJUSTED;

                        if (shops.length === 0 && tags.length === 1) {
                            type = SubscriptionType.TAG;
                        } else if (shops.length === 1 && tags.length === 0) {
                            type = SubscriptionType.SHOP;
                        }

                        return {
                            id,
                            shops,
                            tags,
                            date: + new Date(updated_at),
                            type,
                        }
                    });

                    dispatch(setSubscriptionList(subscriptionList));
                }

                dispatch(setSubscriptionListIsLoading(false));
            })
            .catch((err: any) => {
                console.log('err', err);
                dispatch(setSubscriptionListIsLoading(false));
            })
    }
}
