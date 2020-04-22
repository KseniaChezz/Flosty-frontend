import {combineReducers, createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

import {appReducer} from './app/reducer';
import {userReducer} from './user/reducer';
import {shopReducer} from './shop/reducer';
import {subscriptionListReducer} from './subscriptionList/reducer';
import {feedReducer} from './feed/reducer';

import {IAppState} from './app/types/state';
import {IUserState} from './user/types/state';
import {IShopState} from './shop/types/state';
import {ISubscriptionListState} from './subscriptionList/types/state';
import {IFeedState} from './feed/types/state';

export interface IState {
    app: IAppState;
    user: IUserState;
    shop: IShopState;
    subscriptionList: ISubscriptionListState;
    feed: IFeedState;
}

const rootReducer = combineReducers({
    app: appReducer,
    user: userReducer,
    shop: shopReducer,
    subscriptionList: subscriptionListReducer,
    feed: feedReducer,
})

export const store = createStore(rootReducer, applyMiddleware(thunk));



