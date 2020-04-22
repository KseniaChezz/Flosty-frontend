import {IFeedAction, ISetFeedList, ISetIsFeedListLoading,} from './types/actions';
import {IFeedState} from './types/state';
import {FeedAction} from "./feedActionEnum";

const initialState: IFeedState = {
    list: [],
    isLoading: false,
};

const onSetFeedList = (state: IFeedState = initialState, action: ISetFeedList): IFeedState => {
    const {list} = action;

    return {
        ...state,
        list,
    }
}

const onSetIsFeedListLoading = (state: IFeedState = initialState, action: ISetIsFeedListLoading): IFeedState => {
    const {isLoading} = action;

    return {
        ...state,
        isLoading,
    }
}

export const feedReducer = (state: IFeedState = initialState, action: IFeedAction): IFeedState => {
    switch (action.type) {
        case FeedAction.FEED_SET_LIST:
            return onSetFeedList(state, action);
        case FeedAction.FEED_SET_IS_LIST_LOADING:
            return onSetIsFeedListLoading(state, action);
        default:
            return state;
    }
};
