import {Dispatch} from 'react';

import {setSubscriptionDataIsProcessing, addSubscription} from '../../subscriptionList/actions';
import {setError} from '../../app/actions';

import {ISubscriptionListAction} from '../../subscriptionList/types/actions';
import {IAppAction} from '../../app/types/actions';
import {ISubscription, ISubscriptionShop, ISubscriptionTag} from '../../../types/subscription';

import {post} from '../../../utils/network';
import {mapSubscriptionFomResponse} from '../../../utils';

interface IData {
    id: number;
    shops: ISubscriptionShop[];
    tags: ISubscriptionTag[];
    updated_at: string;
}

interface IResponse {
    data: IData;
}

export const postSubscription = (tags: number[], shops: number[], cb?: (id: number) => void) => {
    return (dispatch: Dispatch<ISubscriptionListAction | IAppAction>) => {
        dispatch(setSubscriptionDataIsProcessing(true));

        return post('/personal_subs', {tags, shops})
            .then((res: IResponse) => {
                const {
                    data,
                } = res;
                const subscription: ISubscription = mapSubscriptionFomResponse(data);

                dispatch(addSubscription(subscription))
                dispatch(setSubscriptionDataIsProcessing(false));
                cb && cb(data.id);
            })
            .catch((err: Error) => {
                const {name, message, stack} = err;

                console.log('err', err);
                dispatch(setSubscriptionDataIsProcessing(false));
                dispatch(setError(`name: ${name}, message: ${message}, stack: ${stack}`));
            })
    }
}
