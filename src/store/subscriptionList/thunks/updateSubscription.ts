import {Dispatch} from 'react';

import {setSubscriptionDataIsProcessing, updateSubscription} from '../../subscriptionList/actions';

import {ISubscriptionListAction} from '../../subscriptionList/types/actions';
import {ISubscriptionResponse} from '../../../types/subscription';

import {put} from '../../../utils/network';

import {mapSubscriptionFomResponse} from '../../../utils/subscribe';

interface IResponse {
    data: ISubscriptionResponse;
}

export const updateSubscriptionInList = (id: number, tags: number[], shops: number[]) => {
    return (dispatch: Dispatch<ISubscriptionListAction>) => {
        dispatch(setSubscriptionDataIsProcessing(true));

        return put(`/personal_subs/${id}`, {tags, shops})
            .then((res: IResponse) => {
                debugger;
                const {data} = res;
                dispatch(updateSubscription(mapSubscriptionFomResponse(data)))
                dispatch(setSubscriptionDataIsProcessing(false));
            })
            .catch((err: any) => {
                console.log('err', err);
                dispatch(setSubscriptionDataIsProcessing(false));
            })
    }
}
