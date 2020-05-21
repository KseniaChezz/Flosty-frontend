import React, {useState, memo} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack/lib/typescript/src/types';
import {useSelector, useDispatch} from 'react-redux';

import {
    HeaderWithBackButton,
    PlainRadioButtonRowItem,
    RadioButtonRowItem,
} from '../../../elements';

import {selectCard} from '../../../store/basket/actions';

import {IOrderNavigatorParamList} from '../../../types/orderNavigator';
import {IState} from '../../../store';
import {ICard} from '../../../types/user';

import {OrderNavigatorRoutes} from '../../../enums/orderNavigatorRoutes';
import {TEXT, COLORS} from '../../../constants';

import {getCardObjectForRender, getCardString} from '../../../utils';

type ScreenNavigationProp = StackNavigationProp<IOrderNavigatorParamList, OrderNavigatorRoutes.PAYMENT_SCREEN>;

interface IProps {
    navigation: ScreenNavigationProp;
}

const PaymentScreen = memo((props: IProps) => {
    const {navigation,} = props;
    const cardList: ICard[] = useSelector((store: IState) => store.user.cardList);
    const selectedCard: ICard | undefined = useSelector((state: IState) => state.basket.selectedCard);
    const dispatch = useDispatch();

    const onBackPress = () => {
        navigation.goBack();
    };

    const onPaymentPress = (card: ICard) => {
        return () => {
            dispatch(selectCard(card));
        }
    };

    const onAddCardSuccess = (card: ICard) => {
        dispatch(selectCard(card));
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
                        const {id} = card;
                        const text: string = getCardString(card);

                        return (
                            <PlainRadioButtonRowItem
                                key={id}
                                text={text}
                                isSelected={selectedCard?.id === id}
                                onPress={onPaymentPress(card)}
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
