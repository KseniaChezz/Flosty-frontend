import {
    ISetSubscriptionList,
    ISetSubscriptionDataIsProcessing,
    ISetSubscriptionListIsLoading,
    IAddSubscription,
    IDeleteSubscription
} from './types/actions';
import {ISubscription} from '../../types/subscription';

import {SubscriptionListAction} from './subscriptionListActionEnum';

export const setSubscriptionList = (list: ISubscription[]): ISetSubscriptionList => {
    return {
        type: SubscriptionListAction.SUBSCRIPTION_LIST_SET,
        list,
    }
}

export const setSubscriptionDataIsProcessing = (isProcessing: boolean): ISetSubscriptionDataIsProcessing => {
    return {
        type: SubscriptionListAction.SUBSCRIPTION_LIST_SET_IS_DATA_PROCESSING,
        isProcessing,
    }
}

export const setSubscriptionListIsLoading = (isLoading: boolean): ISetSubscriptionListIsLoading => {
    return {
        type: SubscriptionListAction.SUBSCRIPTION_LIST_SET_IS_LIST_LOADING,
        isLoading,
    }
}

export const addSubscription = (subscription: ISubscription): IAddSubscription => {
    return {
        type: SubscriptionListAction.SUBSCRIPTION_LIST_ADD,
        subscription,
    }
}

export const deleteSubscription = (subscriptionId: number): IDeleteSubscription => {
    return {
        type: SubscriptionListAction.SUBSCRIPTION_LIST_DELETE,
        subscriptionId,
    }
}
