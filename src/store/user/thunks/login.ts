import {Dispatch} from 'react';

import {setIsDataProcessing} from '../../app/actions';

import {post} from '../../../utils/network';
import {setUserData} from './setUserData'

import {IUserAction} from '../types/actions';
import {IAppAction} from '../../app/types/actions';
import {ILoginAndRegistrationResponse} from '../types/ILoginAndRegistrationResponse';

export const loginUser = (email: string, password: string, cb?: () => void) => {
    return (dispatch: Dispatch<IUserAction | IAppAction>) => {
        dispatch(setIsDataProcessing(true));

        return post('/login', {email, password})
            .then((res: ILoginAndRegistrationResponse) => {
                setUserData(dispatch, res);
                dispatch(setIsDataProcessing(false));

                cb && cb();
            })
            .catch((err: any) => {
                dispatch(setIsDataProcessing(false));
                console.log('err', err);
            })
    }
};
