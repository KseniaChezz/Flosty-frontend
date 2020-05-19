import {Dispatch} from 'react';

import {setProcessingData, deleteCard} from '../actions';
import {setError} from '../../app/actions';

import {deleteMethod} from '../../../utils/network';

import {IUserAction} from '../types/actions';
import {IAppAction} from '../../app/types/actions';

interface IResponse {
    data: any;
}

export const deleteUserCard = (cardId: number) => {
    return (dispatch: Dispatch<IUserAction | IAppAction>) => {
        dispatch(setProcessingData(true));

        return deleteMethod(`/users/cards/${cardId}`)
            .then((res: IResponse) => {
                dispatch(deleteCard(cardId));
                dispatch(setProcessingData(false));
            })
            .catch((err: string) => {
                dispatch(setProcessingData(false));
                console.log('err', err);
                dispatch(setError(err));
            })
    }
};
