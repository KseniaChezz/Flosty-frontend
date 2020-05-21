import React, {useState, memo, useEffect} from 'react';
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack/lib/typescript/src/types';
import {useSelector, useDispatch} from 'react-redux';

import {ScreenWrapperWithBackButton} from '../../../elements';
import OrderCard from './OrderCard';

import {getUserOrders} from '../../../store/user/thunks/getUserOrders';

import {IRootNavigatorParamList} from '../../../types/rootNavigator';
import {IState} from '../../../store';
import {IOrder, IOrderProduct} from '../../../types/user';

import {TEXT, COLORS} from '../../../constants';
import {RootNavigatorRoutes} from '../../../enums';

type ScreenNavigationProp = StackNavigationProp<IRootNavigatorParamList, RootNavigatorRoutes.USER_PROFILE_ORDER_LIST>;

interface IProps {
    navigation: ScreenNavigationProp;
}

const UserOrderList = memo((props: IProps) => {
    const {navigation} = props;
    const isLoading: boolean = useSelector((state: IState) => state.user.isLoading);
    const orderList: IOrder[] = useSelector((state: IState) => state.user.orderList);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUserOrders());
    }, []);

    const onBackPress = () => {
        navigation.pop();
    };

    const renderEmptyList = () => {
        return (
            <View style={styles.emptyListContainer}>
                <Text style={styles.emptyListText}>
                    {TEXT.emptyOrderList}
                </Text>
            </View>
        );
    };

    const renderList = () => {
        return (
            <View>
                <ScrollView>
                    {orderList.map((item: IOrder) => {
                        const {trackNumber} = item;

                        return (
                            <OrderCard
                                key={trackNumber}
                                order={item}
                            />
                        )
                    })}
                </ScrollView>
            </View>
        )
    }

    return (
        <ScreenWrapperWithBackButton
            text={TEXT.myOrders}
            onBackPress={onBackPress}
            style={styles.wrapper}
        >

            {orderList.length === 0 ? renderEmptyList() : renderList()}

        </ScreenWrapperWithBackButton>
    );
});

const styles = StyleSheet.create({
    wrapper: {
        paddingTop: 10,
    },
    emptyListContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 88,
    },
    emptyListText: {
        fontFamily: 'Montserrat',
        color: COLORS.LightGrey,
        fontSize: 14,
        lineHeight: 18,
        fontWeight: '400',
        textAlign: 'center',
        paddingHorizontal: 30,
    },
});

export default UserOrderList;
