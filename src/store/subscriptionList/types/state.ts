import {ISubscription} from '../../../types/subscription';

export interface ISubscriptionListState {
    list: ISubscription[];
    listIsLoading: boolean;
    dataIsProcessing: boolean;
}
