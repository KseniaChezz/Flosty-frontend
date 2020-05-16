import {Dispatch} from 'react';

import {setProcessingData, addCard} from '../actions';

import {post} from '../../../utils/network';

import {IUserAction} from '../types/actions';
import {ICard, ICardResponse} from '../../../types/user';

import {getCardObjectForSend, mapCardFromResponse} from '../../../utils';

interface IResponse {
    data: ICardResponse;
}

export const addUserCard = (card: Omit<ICard, 'id' |'type'>, cb?: (id: number) => void) => {
    return (dispatch: Dispatch<IUserAction>) => {
        dispatch(setProcessingData(true));

        return post('/users/cards', getCardObjectForSend(card))
            .then((res: IResponse) => {
                const {data} = res;

                dispatch(addCard(mapCardFromResponse(data)));
                cb && cb(data.id);
                dispatch(setProcessingData(false));
            })
            .catch((err: any) => {
                dispatch(setProcessingData(false));
                console.log('err', err);
            })
    }
};
