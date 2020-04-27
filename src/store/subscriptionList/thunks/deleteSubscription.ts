import {Dispatch} from 'react';

import {setSubscriptionDataIsProcessing, deleteSubscription} from '../../subscriptionList/actions';

import {ISubscriptionListAction} from '../../subscriptionList/types/actions';

import {deleteMethod} from '../../../utils/network';

interface IResponse {
    data: any;
}

export const deleteSubscriptionFromList = (id: number, cb?: () => void) => {
    return (dispatch: Dispatch<ISubscriptionListAction>) => {
        dispatch(setSubscriptionDataIsProcessing(true));

        return deleteMethod(`/personal_subs/${id}`)
            .then((res: IResponse) => {
                dispatch(deleteSubscription(id))
                dispatch(setSubscriptionDataIsProcessing(false));
                cb && cb();
            })
            .catch((err: any) => {
                console.log('err', err);
                dispatch(setSubscriptionDataIsProcessing(false));
            })
    }
}