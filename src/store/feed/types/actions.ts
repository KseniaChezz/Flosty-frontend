import {FeedAction} from '../feedActionEnum';

export interface ISetFeedList {
    type: FeedAction.FEED_SET_LIST;
    list: any[];
}

export interface ISetIsFeedListLoading {
    type: FeedAction.FEED_SET_IS_LIST_LOADING;
    isLoading: boolean;
}

export type IFeedAction = ISetFeedList
    | ISetIsFeedListLoading;
