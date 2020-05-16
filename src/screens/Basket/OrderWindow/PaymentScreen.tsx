import React, {useState, memo} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useSelector} from 'react-redux';

import {HeaderWithBackButton, PlainRadioButtonRowItem, RadioButtonRowItem} from '../../../elements';

import {IOrderNavigatorParamList} from '../../../types/orderNavigator';
import {IState} from '../../../store';
import {ICard} from '../../../types/user';

import {OrderNavigatorRoutes} from '../../../enums/orderNavigatorRoutes';
import {TEXT, COLORS} from '../../../constants';
import { getCardObjectForRender } from '../../../utils';

type ScreenNavigationProp = StackNavigationProp<IOrderNavigatorParamList, OrderNavigatorRoutes.ROOT_ORDER_SCREEN>;

interface IProps {
    navigation: ScreenNavigationProp;
}

const PaymentScreen = memo((props: IProps) => {
    const {
        navigation,
    } = props;
    const cardList: ICard[] = useSelector((store: IState) => store.user.cardList);
    const [selectedPayment, setSelectedPayment] = useState<string | number | undefined>();

    const onBackPress = () => {
        navigation.goBack();
    };

    const onPaymentPress = (value: string | number) => {
        return () => setSelectedPayment(value);
    };

    const onAddCardSuccess = (id: number) => {
        setSelectedPayment(id);
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

                        return (
                            <PlainRadioButtonRowItem
                                key={id}
                                text={`${type}, **** ${cardNumber.toString().slice(-4)}`}
                                isSelected={selectedPayment === id}
                                onPress={onPaymentPress(id)}
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
                        onPress={onPaymentPress(TEXT.yandexMoney)}
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
