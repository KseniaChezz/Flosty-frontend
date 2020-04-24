import {SubscriptionListAction} from '../subscriptionListActionEnum';

import {ISubscription} from '../../../types/subscription';

export interface ISetSubscriptionList {
    type: SubscriptionListAction.SUBSCRIPTION_LIST_SET;
    list: ISubscription[];
}

export interface ISetSubscriptionDataIsProcessing {
    type: SubscriptionListAction.SUBSCRIPTION_LIST_SET_IS_DATA_PROCESSING;
    isProcessing: boolean;
}

export interface ISetSubscriptionListIsLoading {
    type: SubscriptionListAction.SUBSCRIPTION_LIST_SET_IS_LIST_LOADING;
    isLoading: boolean;
}

export interface IAddSubscription {
    type: SubscriptionListAction.SUBSCRIPTION_LIST_ADD;
    subscription: ISubscription;
}

export interface IDeleteSubscription {
    type: SubscriptionListAction.SUBSCRIPTION_LIST_DELETE;
    subscriptionId: number;
}

export interface IUpdateSubscription {
    type: SubscriptionListAction.SUBSCRIPTION_LIST_UPDATE;
    subscription: ISubscription;
}

export type ISubscriptionListAction = ISetSubscriptionList
    | ISetSubscriptionDataIsProcessing
    | ISetSubscriptionListIsLoading
    | IAddSubscription
    | IDeleteSubscription
    | IUpdateSubscription;
