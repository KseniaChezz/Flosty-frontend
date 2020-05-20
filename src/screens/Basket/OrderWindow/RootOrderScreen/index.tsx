import React, {useState, memo} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
} from 'react-native';
import {useSelector} from 'react-redux';
import {StackNavigationProp} from '@react-navigation/stack/lib/typescript/src/types';
import {RouteProp} from '@react-navigation/native';

import styles from './style';

import {ColoredButton, Title, InfoRow} from '../../../../elements';
import FilterItem from '../../../../elements/ProductList/FilterWindow/FilterItem';

import {IOrderNavigatorParamList} from '../../../../types/orderNavigator';
import {IState} from '../../../../store';
import {ICard, IAddress} from '../../../../types/user';

import {OrderNavigatorRoutes} from '../../../../enums/orderNavigatorRoutes';
import {TEXT} from '../../../../constants';

import {getAddressForBasketMenuItem} from '../../../../utils';

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
                hide,
            }
        }
    } = props;
    const [paymentWay, setPaymentWay] = useState<string>(TEXT.choosePaymentWay);
    const [address, setAddress] = useState<string>(TEXT.doAddAddress);
    const [deliveryWay, setDeliveryWay] = useState<string>(TEXT.carrier);
    const selectedCard: ICard | undefined = useSelector((state: IState) => state.basket.selectedCard);
    const selectedAddress: IAddress | undefined = useSelector((state: IState) => state.basket.selectedAddress);

    const onPaymentWayPress = () => {
        navigation.navigate(OrderNavigatorRoutes.PAYMENT_SCREEN, {setPaymentWay});
    };

    const onDeliveryPress = () => {
        navigation.navigate(OrderNavigatorRoutes.DELIVERY_SCREEN, {hide, setDeliveryWay, deliveryWay});
    };

    return (
        <View style={styles.container}>
            <View style={styles.mainContent}>
                <View style={styles.titleRow}>
                    <Title
                        text={TEXT.orderProcessing}
                        textStyle={styles.title}
                    />
                    <TouchableOpacity
                        style={styles.close}
                        onPress={hide}
                    >
                        <Text style={styles.title}>X</Text>
                    </TouchableOpacity>
                </View>

                <FilterItem
                    title={TEXT.delivery}
                    value={selectedAddress ? `${deliveryWay}, ${getAddressForBasketMenuItem(selectedAddress)}` : TEXT.doAddAddress}
                    isDefault={!selectedAddress}
                    onPress={onDeliveryPress}
                />

                <FilterItem
                    title={TEXT.paymentWay}
                    value={paymentWay}
                    isDefault={paymentWay === TEXT.choosePaymentWay}
                    onPress={onPaymentWayPress}
                />

                <InfoRow
                    title={TEXT.orderSum}
                    value={selectedProductsPrice}
                />

                <InfoRow
                    title={TEXT.deliverySum}
                    value={0}
                />

                <InfoRow
                    title={TEXT.discount}
                    value={0}
                />

                <InfoRow
                    title={TEXT.totalSum}
                    value={selectedProductsPrice}
                />
            </View>

            <View>
                <ColoredButton
                    text={TEXT.agreeOrder}
                    onPress={()=>{}}
                    buttonStyle={styles.button}
                    textStyle={styles.buttonText}
                />

                <Text style={styles.conditionsText}>
                    {TEXT.pressOrder}
                    <Text
                        style={[styles.conditionsText, styles.conditionButtonText]}
                        onPress={()=>{}}
                    >
                        {TEXT.userAgreement}
                    </Text>
                </Text>
            </View>
        </View>
    );
});

export default RootOrderScreen;
