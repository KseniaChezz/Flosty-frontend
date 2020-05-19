import {Dispatch} from 'react';

import {setSubscriptionList, setSubscriptionListIsLoading} from '../../subscriptionList/actions';
import {setError} from '../../app/actions';

import {ISubscriptionListAction} from '../../subscriptionList/types/actions';
import {IAppAction} from '../../app/types/actions';
import {ISubscription, ISubscriptionShop, ISubscriptionTag, ISubscriptionResponse} from '../../../types/subscription';

import {get} from '../../../utils/network';
import {getSubscriptionType, mapSubscriptionFomResponse} from '../../../utils';

interface IResponse {
    data: ISubscriptionResponse[];
}

export const getSubscriptionList = () => {
    return (dispatch: Dispatch<ISubscriptionListAction | IAppAction>) => {
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
            .catch((err: Error) => {
                const {name, message, stack} = err;

                console.log('err', err);
                dispatch(setSubscriptionListIsLoading(false));
                dispatch(setError(`name: ${name}, message: ${message}, stack: ${stack}`));
            })
    }
}
