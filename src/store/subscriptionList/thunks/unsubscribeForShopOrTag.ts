import {Dispatch} from 'react';

import {setSubscriptionDataIsProcessing} from '../../subscriptionList/actions';

import {ISubscriptionListAction} from '../../subscriptionList/types/actions';

import {deleteMethod} from '../../../utils/network';

import {SubscriptionType} from '../../../enums';

interface IResponse {
    data: any;
}

export const unsubscribeForShopOrTag = (id: number, type: SubscriptionType, cb?: () => void) => {
    return (dispatch: Dispatch<ISubscriptionListAction>) => {
        dispatch(setSubscriptionDataIsProcessing(true));

        return deleteMethod(`/${type === SubscriptionType.SHOP ? 'shops' : 'tags'}/subscribe/${id}`)
            .then((res: IResponse) => {
                dispatch(setSubscriptionDataIsProcessing(false));
                cb && cb();
            })
            .catch((err: any) => {
                console.log('err', err);
                dispatch(setSubscriptionDataIsProcessing(false));
            })
    }
}
