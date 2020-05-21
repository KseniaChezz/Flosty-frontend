import React, {memo} from 'react';
import {
    View,
    StyleSheet,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {StackNavigationProp} from '@react-navigation/stack/lib/typescript/src/types';
import {RouteProp} from '@react-navigation/native';

import {InfoRow} from '../../../../elements';
import FilterItem from '../../../../elements/ProductList/FilterWindow/FilterItem';
import OrderButton from './OrderButton';
import OrderHeader from './OrderHeader';

import {makeOrder} from '../../../../store/basket/thunks/makeOrder';

import {IOrderNavigatorParamList} from '../../../../types/orderNavigator';
import {IState} from '../../../../store';
import {ICard, IAddress} from '../../../../types/user';
import {IDeliveryType} from '../../../../types/basket';

import {OrderNavigatorRoutes} from '../../../../enums/orderNavigatorRoutes';
import {TEXT, COLORS} from '../../../../constants';

import {getAddressForBasketMenuItem, getCardString} from '../../../../utils';

type ScreenNavigationProp = StackNavigationProp<IOrderNavigatorParamList, OrderNavigatorRoutes.ROOT_ORDER_SCREEN>;
type ScreenRouteProp = RouteProp<IOrderNavigatorParamList, OrderNavigatorRoutes.ROOT_ORDER_SCREEN>;

interface IProps {
    navigation: ScreenNavigationProp;
    route: ScreenRouteProp;
}

const RootOrderScreen = memo((props: IProps) => {
    const {
        navigation,
        route: {
            params: {
                selectedProductsPrice,
                productIdList,
                hide,
            }
        }
    } = props;
    const selectedCard: ICard | undefined = useSelector((state: IState) => state.basket.selectedCard);
    const selectedAddress: IAddress | undefined = useSelector((state: IState) => state.basket.selectedAddress);
    const selectedDeliveryType: IDeliveryType = useSelector(
        (state: IState) => state.basket.selectedDeliveryType);
    const deliveryPrice: number = useSelector((state: IState) => state.basket.deliveryPrice);
    const addressText: string = selectedAddress
        ? selectedDeliveryType
            ? `${selectedDeliveryType.name}, ${getAddressForBasketMenuItem(selectedAddress)}`
            : `${getAddressForBasketMenuItem(selectedAddress)}`
        : TEXT.doAddAddress;
    const isButtonDisabled: boolean = !selectedAddress || !selectedCard;
    const dispatch = useDispatch();

    const onPaymentWayPress = () => {
        navigation.navigate(OrderNavigatorRoutes.PAYMENT_SCREEN);
    };

    const onDeliveryPress = () => {
        navigation.navigate(OrderNavigatorRoutes.DELIVERY_SCREEN, {hide});
    };

    const onOrderSuccessCallback = () => {
        hide();
    };

    const onOrderButtonPress = () => {
        if (!selectedAddress) return;

        dispatch(makeOrder(selectedAddress.id, selectedDeliveryType.id, productIdList, onOrderSuccessCallback));
    };

    return (
        <View style={styles.container}>
            <View style={styles.mainContent}>
                <OrderHeader
                    hide={hide}
                />

                <FilterItem
                    title={TEXT.delivery}
                    value={addressText}
                    isDefault={!selectedAddress}
                    onPress={onDeliveryPress}
                />

                <FilterItem
                    title={TEXT.paymentWay}
                    value={selectedCard ? getCardString(selectedCard) : TEXT.choosePaymentWay}
                    isDefault={!selectedCard}
                    onPress={onPaymentWayPress}
                />

                <InfoRow
                    title={TEXT.orderSum}
                    value={selectedProductsPrice}
                />

                <InfoRow
                    title={TEXT.deliverySum}
                    value={deliveryPrice}
                />

                <InfoRow
                    title={TEXT.discount}
                    value={0}
                />

                <InfoRow
                    title={TEXT.totalSum}
                    value={selectedProductsPrice + deliveryPrice}
                />
            </View>

            <OrderButton
                isDisabled={isButtonDisabled}
                onPress={onOrderButtonPress}
            />
        </View>
    );
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.White,
    },
    mainContent: {
        flex: 1,
    },
});

export default RootOrderScreen;
