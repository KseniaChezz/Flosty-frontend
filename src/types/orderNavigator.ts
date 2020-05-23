import {SetStateAction, Dispatch} from 'react';

import {IUserCardFieldList} from './user';

export type IOrderNavigatorParamList = {
    RootOrderScreen: {
        selectedProductsPrice: number;
        productIdList: number[];
        hide: () => void;
        setSelectedProductIdListMap: Dispatch<SetStateAction<Record<number, number[]>>>;
    };
    PaymentScreen: undefined;
    NewCardScreen: {
        title: string;
        fieldList: IUserCardFieldList,
        isModalMode: boolean;
        onAddCardSuccess: (id: number) => void;
    };
    DeliveryScreen: {
        productIdList: number[];
        hide: () => void;
    };
    AddressListScreen: undefined;
};
