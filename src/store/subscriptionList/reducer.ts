import {ISubscriptionListState} from './types/state';
import {
    IAddSubscription,
    IDeleteSubscription,
    ISetSubscriptionDataIsProcessing,
    ISetSubscriptionList,
    ISetSubscriptionListIsLoading,
    ISubscriptionListAction,
    IUpdateSubscription,
} from './types/actions';
import {ISubscription} from '../../types/subscription';
import {IAppAction} from '../app/types/actions';

import {SubscriptionListAction} from './subscriptionListActionEnum';
import {AppAction} from '../app/appActionEnum';

const initialState: ISubscriptionListState = {
    list: [],
    listIsLoading: false,
    dataIsProcessing: false,
};

const onSetSubscriptionList = (state: ISubscriptionListState, action: ISetSubscriptionList): ISubscriptionListState => {
    const {list} = action;

    return {
        ...state,
        list,
    }
}

const onSetSubscriptionListIsLoading = (
    state: ISubscriptionListState,
    action: ISetSubscriptionListIsLoading,
): ISubscriptionListState => {
    const {isLoading} = action;

    return {
        ...state,
        listIsLoading: isLoading,
    }
}

const onSetSubscriptionLDataIsProcessing = (
    state: ISubscriptionListState,
    action: ISetSubscriptionDataIsProcessing,
): ISubscriptionListState => {
    const {isProcessing} = action;

    return {
        ...state,
        dataIsProcessing: isProcessing,
    }
}

const onAddSubscription = (state: ISubscriptionListState, action: IAddSubscription): ISubscriptionListState => {
    const {subscription} = action;

    return {
        ...state,
        list: [...state.list, subscription],
    }
}

const onDeleteSubscription = (state: ISubscriptionListState, action: IDeleteSubscription): ISubscriptionListState => {
    const {subscriptionId} = action;

    return {
        ...state,
        list: state.list.filter((item: ISubscription) => item.id !== subscriptionId),
    }
}

const onUpdateSubscription = (state: ISubscriptionListState, action: IUpdateSubscription): ISubscriptionListState => {
    const {subscription} = action;
    const {id} = subscription;
    const newList: ISubscription[] = state.list.map((item: ISubscription) => {
        if (item.id === id) return subscription;

        return item;
    });

    return {
        ...state,
        list: newList,
    }
}

export const subscriptionListReducer = (
    state: ISubscriptionListState = initialState,
    action: ISubscriptionListAction | IAppAction,
): ISubscriptionListState => {
    switch (action.type) {
        case SubscriptionListAction.SUBSCRIPTION_LIST_SET:
            return onSetSubscriptionList(state, action);
        case SubscriptionListAction.SUBSCRIPTION_LIST_SET_IS_DATA_PROCESSING:
            return onSetSubscriptionLDataIsProcessing(state, action);
        case SubscriptionListAction.SUBSCRIPTION_LIST_SET_IS_LIST_LOADING:
            return onSetSubscriptionListIsLoading(state, action);
        case SubscriptionListAction.SUBSCRIPTION_LIST_ADD:
            return onAddSubscription(state, action);
        case SubscriptionListAction.SUBSCRIPTION_LIST_DELETE:
            return onDeleteSubscription(state, action);
        case SubscriptionListAction.SUBSCRIPTION_LIST_UPDATE:
            return onUpdateSubscription(state, action);
        case AppAction.APP_SET_DEFAULT:
            return initialState;
        default:
            return state;
    }
}
