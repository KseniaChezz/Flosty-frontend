import {IAddress, ICardResponse} from '../../../types/user';

export interface ILoginAndRegistrationResponse {
    data: {
        user: {
            id: string;
            email: string;
            name: string;
            role: string;
            addresses: IAddress[];
            cards: ICardResponse[];
        },
        token: string;
    }
}
