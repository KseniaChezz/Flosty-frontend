import React, {useState, memo} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack/lib/typescript/src/types';
import {RouteProp} from '@react-navigation/native';
import {useSelector} from 'react-redux';

import {HeaderWithBackButton, PlainRadioButtonRowItem, RadioButtonRowItem} from '../../../elements';

import {IOrderNavigatorParamList} from '../../../types/orderNavigator';
import {IState} from '../../../store';
import {ICard} from '../../../types/user';

import {OrderNavigatorRoutes} from '../../../enums/orderNavigatorRoutes';
import {TEXT, COLORS} from '../../../constants';
import {getCardObjectForRender} from '../../../utils';

type ScreenNavigationProp = StackNavigationProp<IOrderNavigatorParamList, OrderNavigatorRoutes.PAYMENT_SCREEN>;
type ScreenRouteProp = RouteProp<IOrderNavigatorParamList, OrderNavigatorRoutes.PAYMENT_SCREEN>;

interface IProps {
    navigation: ScreenNavigationProp;
    route: ScreenRouteProp;
}

const PaymentScreen = memo((props: IProps) => {
    const {
        navigation,
        route: {
            params: {
                setPaymentWay,
            },
        },
    } = props;
    const cardList: ICard[] = useSelector((store: IState) => store.user.cardList);
    const [selectedPayment, setSelectedPayment] = useState<string | number | undefined>();

    const onBackPress = () => {
        navigation.goBack();
    };

    const onPaymentPress = (value: string | number, text: string) => {
        return () => {
            setSelectedPayment(value);
            setPaymentWay(text);
        }
    };

    const onAddCardSuccess = (card: ICard) => {
        const {id, type, cardNumber} = card;
        const text: string = `${type}, **** ${cardNumber.toString().slice(-4)}`;

        setSelectedPayment(id);
        setPaymentWay(text);
    };

    const onNewCardPress = () => {
        navigation.navigate(
            OrderNavigatorRoutes.NEW_CARD_SCREEN,
            {
                onAddCardSuccess,
                title: TEXT.bankCard,
                fieldList: getCardObjectForRender(),
                isModalMode: true,
            },
        );
    };

    return (
        <View style={styles.container}>

            <HeaderWithBackButton
                text={TEXT.paymentWay}
                noShadow={true}
                onBackPress={onBackPress}
                center={true}
            />

            <View style={styles.mainContent}>
                <ScrollView>
                    {cardList.map((card: ICard) => {
                        const {id, type, cardNumber} = card;
                        const text: string = `${type}, **** ${cardNumber.toString().slice(-4)}`;

                        return (
                            <PlainRadioButtonRowItem
                                key={id}
                                text={text}
                                isSelected={selectedPayment === id}
                                onPress={onPaymentPress(id, text)}
                            />
                        )
                    })}

                    <RadioButtonRowItem
                        title={TEXT.bankCard}
                        value={TEXT.cardListToPay}
                        isSelected={false}
                        isDefault={true}
                        onPress={onNewCardPress}
                    />

                    <PlainRadioButtonRowItem
                        text={TEXT.yandexMoney}
                        isSelected={selectedPayment === TEXT.yandexMoney}
                        onPress={onPaymentPress(TEXT.yandexMoney, TEXT.yandexMoney)}
                    />
                </ScrollView>
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
});

export default PaymentScreen;
