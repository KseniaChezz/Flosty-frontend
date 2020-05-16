import {IUserCardFieldList} from './user';

export type IOrderNavigatorParamList = {
    RootOrderScreen: {
        selectedProductsPrice: number;
        hide: () => void;
    };
    PaymentScreen: undefined;
    NewCardScreen: {
        title: string;
        fieldList: IUserCardFieldList,
        isModalMode: boolean;
        onAddCardSuccess: (id: number) => void;
    };
};
