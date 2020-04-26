import {Dispatch} from 'react';

import {setSubscriptionList, setSubscriptionListIsLoading} from '../../subscriptionList/actions';

import {ISubscriptionListAction} from '../../subscriptionList/types/actions';
import {ISubscription, ISubscriptionShop, ISubscriptionTag, ISubscriptionResponse} from '../../../types/subscription';

import {get} from '../../../utils/network';
import {getSubscriptionType, mapSubscriptionFomResponse} from '../../../utils';

interface IResponse {
    data: ISubscriptionResponse[];
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
                        return mapSubscriptionFomResponse(item);
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
