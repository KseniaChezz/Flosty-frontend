import {Dispatch} from 'react';

import {setSubscriptionList, setSubscriptionListIsLoading} from '../../subscriptionList/actions';

import {ISubscriptionListAction} from '../../subscriptionList/types/actions';
import {ISubscription, ISubscriptionShop, ISubscriptionTag, ISubscriptionResponse} from '../../../types/subscription';

import {get} from '../../../utils/network';
import {getSubscriptionType, mapSubscriptionFomResponse} from '../../../utils/subscribe';

interface IResponse {
    data: any;
}

export const getHistory = () => {
    return (dispatch: Dispatch<ISubscriptionListAction>) => {
        dispatch(setSubscriptionListIsLoading(true));

        return get('/users/sub_history',)
            .then((res: IResponse) => {
                const {
                    data,
                } = res;
                debugger;

                dispatch(setSubscriptionListIsLoading(false));
            })
            .catch((err: any) => {
                console.log('err', err);
                dispatch(setSubscriptionListIsLoading(false));
            })
    }
}
