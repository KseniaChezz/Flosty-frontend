import {Dispatch} from 'react';

import {setSubscriptionList, setSubscriptionDataIsProcessing, addSubscription} from '../../subscriptionList/actions';

import {ISubscriptionListAction} from '../../subscriptionList/types/actions';
import {ISubscription} from '../../../types/subscription';

import {post} from '../../../utils/network';

interface IData extends ISubscription {}

interface IResponse {
    data: IData;
}

export const postSubscription = (tags: number[], shops: number[]) => {
    return (dispatch: Dispatch<ISubscriptionListAction>) => {
        dispatch(setSubscriptionDataIsProcessing(true));
        debugger;

        return post('/personal_subs', {tags, shops})
            .then((res: IResponse) => {
                const {
                    data,
                } = res;
                const {
                    id,
                    shops,
                    tags,
                } = data;

                dispatch(addSubscription({id, shops, tags}))
                dispatch(setSubscriptionDataIsProcessing(false));
            })
            .catch((err: any) => {
                console.log('err', err);
                dispatch(setSubscriptionDataIsProcessing(false));
            })
    }
}
