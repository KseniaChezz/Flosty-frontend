import {Dispatch} from 'react';

import {setUser, setAddressList, setCardList} from '../actions';

import {IUserAction} from '../types/actions';
import {ILoginAndRegistrationResponse} from '../types/ILoginAndRegistrationResponse';
import {ICardResponse, IAddressResponse} from '../../../types/user';

import {TEXT} from '../../../constants';

import {setToken} from '../../../utils/network';
import {mapCardFromResponse, mapAddressFromResponse} from '../../../utils';

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
    dispatch(setAddressList(addresses.map((address: IAddressResponse) => mapAddressFromResponse(address))));
    dispatch(setCardList(cards.map((card: ICardResponse) => mapCardFromResponse(card))));
}
