import {combineReducers, createStore} from 'redux';

import {appReducer} from './app/reducer';
import {userReducer} from './user/reducer';
import {shopReducer} from './shop/reducer';

import {IAppState} from './app/types/state';
import {IUserState} from './user/types/state';
import {IShopState} from './shop/types/state';

export interface IState {
    app: IAppState;
    user: IUserState;
    shop: IShopState;
}

const rootReducer = combineReducers({
    app: appReducer,
    user: userReducer,
    shop: shopReducer,
})

export const store = createStore(rootReducer);



