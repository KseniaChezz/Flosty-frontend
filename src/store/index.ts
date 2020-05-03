import {combineReducers, createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

import {appReducer} from './app/reducer';
import {userReducer} from './user/reducer';
import {shopReducer} from './shop/reducer';
import {subscriptionListReducer} from './subscriptionList/reducer';
import {feedReducer} from './feed/reducer';
import {productsReducer} from './products/reducer';
import {favoriteReducer} from './favorite/reducer';
import {basketReducer} from './basket/reducer';

import {IAppState} from './app/types/state';
import {IUserState} from './user/types/state';
import {IShopState} from './shop/types/state';
import {ISubscriptionListState} from './subscriptionList/types/state';
import {IFeedState} from './feed/types/state';
import {IProductsState} from './products/types/state';
import {IFavoriteState} from './favorite/types/state';
import {IBasketState} from './basket/types/state';

export interface IState {
    app: IAppState;
    user: IUserState;
    shop: IShopState;
    subscriptionList: ISubscriptionListState;
    feed: IFeedState;
    products: IProductsState;
    favorite: IFavoriteState;
    basket: IBasketState;
}

const rootReducer = combineReducers({
    app: appReducer,
    user: userReducer,
    shop: shopReducer,
    subscriptionList: subscriptionListReducer,
    feed: feedReducer,
    products: productsReducer,
    favorite: favoriteReducer,
    basket: basketReducer,
})

export const store = createStore(rootReducer, applyMiddleware(thunk));



