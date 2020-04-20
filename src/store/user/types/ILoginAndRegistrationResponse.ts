import {IAddress, ICard} from '../../../types/user';

export interface ILoginAndRegistrationResponse {
    data: {
        user: {
            id: string;
            email: string;
            name: string;
            role: string;
            addresses: IAddress[];
            cards: ICard[];
        },
        token: string;
    }
}
