import {Dispatch} from 'react';

import {setProcessingData, addCard} from '../actions';
import {setError} from '../../app/actions';

import {post} from '../../../utils/network';

import {IUserAction} from '../types/actions';
import {IAppAction} from '../../app/types/actions';
import {ICard, ICardResponse, IAddress} from '../../../types/user';

import {getCardObjectForSend, mapCardFromResponse} from '../../../utils';

interface IResponse {
    data: ICardResponse;
}

interface IAddressObligatoryFields {
    zip_code: string;
    region: string;
    city: string;
    street: string;
    house: string;
    apartment: string;
    recipient_first_name: string;
    recipient_last_name: string;
    phone_number: string;
    email: string;
}

interface IAddressForSave extends IAddressObligatoryFields {
    building?: string;
    block?: string;
}

export const addUserAddress = (address: Omit<IAddress, 'id'>) => {
    return (dispatch: Dispatch<IUserAction | IAppAction>) => {
        dispatch(setProcessingData(true));
        const {
            country,
            region,
            city,
            street,
            house,
            building,
            block,
            apartment,
            index,
            firstName,
            name,
            phoneNumber,
            email,
        } = address;
        const addressForSave: IAddressForSave = {
            region,
            city,
            street,
            house,
            apartment,
            email,
            recipient_first_name: name,
            recipient_last_name: firstName,
            phone_number: phoneNumber,
            zip_code: index,
        };

        if (building) {
            addressForSave.building = building;
        }

        if (block) {
            addressForSave.block = block;
        }

        return post('/users/addresses', {...addressForSave})
            .then((res: IResponse) => {
                const {data} = res;
                debugger;

                dispatch(addCard(mapCardFromResponse(data)));
                dispatch(setProcessingData(false));
            })
            .catch((err: string) => {
                dispatch(setProcessingData(false));
                console.log('err', err);
                dispatch(setError(err));
            })
    }
};
