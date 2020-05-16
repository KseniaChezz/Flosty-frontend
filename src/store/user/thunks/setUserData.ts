import {Dispatch} from 'react';

import {setUser, setAddressList, setCardList} from '../actions';

import {IUserAction} from '../types/actions';
import {ILoginAndRegistrationResponse} from '../types/ILoginAndRegistrationResponse';
import {ICardResponse} from '../../../types/user';

import {TEXT} from '../../../constants';

import {setToken} from '../../../utils/network';
import {mapCardFromResponse} from '../../../utils';

export const setUserData = (
    dispatch: Dispatch<IUserAction>,
    res: ILoginAndRegistrationResponse
) => {
    const {
        data: {
            user:
                {
                    id,
                    email,
                    name,
                    role,
                    addresses,
                    cards,
                },
            token,
        },
    } = res;

    setToken(token);

    dispatch(setUser({email, name, profile: role === 'user' ? TEXT.private : TEXT.business}));
    dispatch(setAddressList(addresses));
    dispatch(setCardList(cards.map((card: ICardResponse) => mapCardFromResponse(card))));
}
