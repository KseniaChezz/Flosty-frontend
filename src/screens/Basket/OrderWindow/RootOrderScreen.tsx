import React, {useState, memo} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    StyleSheet,
} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';

import {ColoredButton, Title, InfoRow} from '../../../elements';
import FilterItem from '../../../elements/ProductList/FilterWindow/FilterItem';

import {IOrderNavigatorParamList} from '../../../types/orderNavigator';

import {OrderNavigatorRoutes} from '../../../enums/orderNavigatorRoutes';
import {TEXT, COLORS} from '../../../constants';

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

    const onPaymentWayPress = () => {
        navigation.navigate(OrderNavigatorRoutes.PAYMENT_SCREEN);
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
                    // key={value}
                    title={TEXT.delivery}
                    value={TEXT.doAddAddress}
                    isDefault={true}
                    onPress={()=>{}}
                />

                <FilterItem
                    // key={value}
                    title={TEXT.paymentWay}
                    value={paymentWay}
                    isDefault={true}
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.White,
    },
    mainContent: {
        flex: 1,
    },
    titleRow: {
        flexDirection: 'row',
        position: 'relative',
        justifyContent: 'center',
    },
    title: {
        fontSize: 18,
        lineHeight: 22,
        marginTop: 35,
        marginBottom: 15,
    },
    close: {
       position: 'absolute',
       right: 10,
    },
    button: {
        height: 44,
        backgroundColor: COLORS.Border,
        margin: 10,
        marginBottom: 10,
    },
    buttonText: {
        color: COLORS.LightGrey,
        fontFamily: 'Montserrat',
        fontSize: 16,
        fontWeight: '600',
    },
    conditionsText: {
        fontSize: 12,
        fontFamily: 'Montserrat',
        color: COLORS.DarkGrey,
        marginBottom: 20,
        textAlign: 'center',
        paddingHorizontal: 10,
    },
    conditionButtonText: {
        color: COLORS.Blue,
    },
});

export default RootOrderScreen;
