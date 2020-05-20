import {IUserCardFieldList} from './user';

export type IOrderNavigatorParamList = {
    RootOrderScreen: {
        selectedProductsPrice: number;
        hide: () => void;
    };
    PaymentScreen: {setPaymentWay: (way: string) => void};
    NewCardScreen: {
        title: string;
        fieldList: IUserCardFieldList,
        isModalMode: boolean;
        onAddCardSuccess: (id: number) => void;
    };
    DeliveryScreen: {
        hide: () => void;
        setDeliveryWay: (way: string) => void;
        deliveryWay: string;
    };
    AddressListScreen: undefined;
};
