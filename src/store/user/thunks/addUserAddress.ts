import {Dispatch} from 'react';

import {setProcessingData, addAddress} from '../actions';
import {setError} from '../../app/actions';

import {post} from '../../../utils/network';

import {IUserAction} from '../types/actions';
import {IAppAction} from '../../app/types/actions';
import {IAddress, IAddressResponse} from '../../../types/user';

import {getCardObjectForSend, mapAddressFromResponse} from '../../../utils';

interface IResponse {
    data: IAddressResponse;
}

export const addUserAddress = (address: Omit<IAddress, 'id'>) => {
    return (dispatch: Dispatch<IUserAction | IAppAction>) => {
        dispatch(setProcessingData(true));
        const {
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
        const addressForSave: Omit<IAddressResponse, 'id'> = {
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

        if (region) {
            addressForSave.region = region;
        }

        return post('/users/addresses', {...addressForSave})
            .then((res: IResponse) => {
                const {data} = res;

                dispatch(addAddress(mapAddressFromResponse(data)));
                dispatch(setProcessingData(false));
            })
            .catch((err: string) => {
                dispatch(setProcessingData(false));
                console.log('err', err);
                dispatch(setError(err));
            })
    }
};
