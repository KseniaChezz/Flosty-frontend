import {Dispatch} from 'react';

import {setIsDataProcessing, setDefault, setAppTab} from '../../app/actions';

import {IAppAction} from '../../app/types/actions';

import {AppTab} from '../../../enums';

import {get, setToken} from '../../../utils/network';

interface IResponse {
    data: any;
}

export const logoutUser = (cb:() => void) => {
    return (dispatch: Dispatch<IAppAction>) => {
        dispatch(setIsDataProcessing(true));

        return get('/logout')
            .then((res: IResponse) => {
                dispatch(setDefault());
                setToken('');
                dispatch(setAppTab(AppTab.MAIN));
                dispatch(setIsDataProcessing(false));
                cb();
            })
            .catch((err: any) => {
                dispatch(setIsDataProcessing(false));
                console.log('err', err);
            })
    }
};
