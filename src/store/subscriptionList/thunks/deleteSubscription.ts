import {Dispatch} from 'react';

import {setSubscriptionDataIsProcessing, deleteSubscription} from '../../subscriptionList/actions';
import {setError} from '../../app/actions';

import {ISubscriptionListAction} from '../../subscriptionList/types/actions';
import {IAppAction} from '../../app/types/actions';

import {deleteMethod} from '../../../utils/network';

interface IResponse {
    data: any;
}

export const deleteSubscriptionFromList = (id: number, cb?: () => void) => {
    return (dispatch: Dispatch<ISubscriptionListAction | IAppAction>) => {
        dispatch(setSubscriptionDataIsProcessing(true));

        return deleteMethod(`/personal_subs/${id}`)
            .then((res: IResponse) => {
                dispatch(deleteSubscription(id))
                dispatch(setSubscriptionDataIsProcessing(false));
                cb && cb();
            })
            .catch((err: Error) => {
                const {name, message, stack} = err;

                console.log('err', err);
                dispatch(setSubscriptionDataIsProcessing(false));
                dispatch(setError(`name: ${name}, message: ${message}, stack: ${stack}`));
            })
    }
}
