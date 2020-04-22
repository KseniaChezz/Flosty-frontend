import {
    ISetFeedList,
    ISetIsFeedListLoading,
} from './types/actions';
import {IFeedProduct} from '../../types/product';

import {FeedAction} from './feedActionEnum';

export const setFeedList = (list: IFeedProduct[]): ISetFeedList => {
    return {
        type: FeedAction.FEED_SET_LIST,
        list,
    }
};

export const setIsFeedListLoading = (isLoading: boolean): ISetIsFeedListLoading => {
    return {
        type: FeedAction.FEED_SET_IS_LIST_LOADING,
        isLoading,
    }
};
