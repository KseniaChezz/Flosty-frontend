import {IAddressResponse, ICardResponse} from '../../../types/user';

export interface ILoginAndRegistrationResponse {
    data: {
        user: {
            id: string;
            email: string;
            name: string;
            role: string;
            addresses: IAddressResponse[];
            cards: ICardResponse[];
        },
        token: string;
    }
}
