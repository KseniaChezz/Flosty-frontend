import {Dispatch} from 'react';

import {setSubscriptionDataIsProcessing, updateSubscription} from '../../subscriptionList/actions';
import {setError} from '../../app/actions';

import {ISubscriptionListAction} from '../../subscriptionList/types/actions';
import {IAppAction} from '../../app/types/actions';
import {ISubscriptionResponse} from '../../../types/subscription';

import {put} from '../../../utils/network';
import {mapSubscriptionFomResponse} from '../../../utils';

interface IResponse {
    data: ISubscriptionResponse;
}

export const updateSubscriptionInList = (id: number, tags: number[], shops: number[]) => {
    return (dispatch: Dispatch<ISubscriptionListAction | IAppAction>) => {
        dispatch(setSubscriptionDataIsProcessing(true));

        return put(`/personal_subs/${id}`, {tags, shops})
            .then((res: IResponse) => {
                const {data} = res;
                dispatch(updateSubscription(mapSubscriptionFomResponse(data)))
                dispatch(setSubscriptionDataIsProcessing(false));
            })
            .catch((err: Error) => {
                const {name, message, stack} = err;

                console.log('err', err);
                dispatch(setSubscriptionDataIsProcessing(false));
                dispatch(setError(`name: ${name}, message: ${message}, stack: ${stack}`));
            })
    }
}
