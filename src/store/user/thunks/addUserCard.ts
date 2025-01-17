import {Dispatch} from 'react';

import {setProcessingData, addCard} from '../actions';
import {setError} from '../../app/actions';

import {post} from '../../../utils/network';

import {IUserAction} from '../types/actions';
import {IAppAction} from '../../app/types/actions';
import {ICard, ICardResponse} from '../../../types/user';

import {getCardObjectForSend, mapCardFromResponse} from '../../../utils';

interface IResponse {
    data: ICardResponse;
}

export const addUserCard = (card: Omit<ICard, 'id' |'type'>, cb?: (card: ICard) => void) => {
    return (dispatch: Dispatch<IUserAction | IAppAction>) => {
        dispatch(setProcessingData(true));

        return post('/users/cards', getCardObjectForSend(card))
            .then((res: IResponse) => {
                const {data} = res;
                const card: ICard = mapCardFromResponse(data);

                dispatch(addCard(card));
                cb && cb(card);
                dispatch(setProcessingData(false));
            })
            .catch((err: string) => {
                dispatch(setProcessingData(false));
                console.log('err', err);
                dispatch(setError(err));
            })
    }
};
