import 'react-native-gesture-handler';
import React, {useState, memo, SetStateAction, Dispatch} from 'react';
import {
    View,
    StyleSheet,
} from 'react-native';
import Modal from 'react-native-modal';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import RootOrderScreen from './RootOrderScreen';
import PaymentScreen from './PaymentScreen';
import DeliveryScreen from './DeliveryScreen';
import AddressListScreen from './AddressListScreen';

import {COLORS} from '../../../constants';
import {OrderNavigatorRoutes} from '../../../enums/orderNavigatorRoutes';

import {IOrderNavigatorParamList} from '../../../types/orderNavigator';
import {UserCard} from '../../User';

import {getProductIdList} from '../../../utils';

interface IProps {
    isWindowVisible: boolean;
    selectedProductsPrice: number;
    selectedProductIdListMap: Record<number, number[]>
    setSelectedProductIdListMap: Dispatch<SetStateAction<Record<number, number[]>>>;
    hide: () => void;
}

const Stack = createStackNavigator<IOrderNavigatorParamList>();

const OrderWindow = memo((props: IProps) => {
    const {
        isWindowVisible,
        selectedProductsPrice,
        selectedProductIdListMap,
        setSelectedProductIdListMap,
        hide,
    } = props;
    const productIdList: number[] = getProductIdList(selectedProductIdListMap);

    return (
        <Modal isVisible={isWindowVisible} style={styles.modalContainer}>

            <View style={styles.modalInnerContainer}>
                <NavigationContainer independent={true}>
                    <Stack.Navigator headerMode="none">
                        <Stack.Screen
                            name={OrderNavigatorRoutes.ROOT_ORDER_SCREEN}
                            component={RootOrderScreen}
                            initialParams={{selectedProductsPrice, productIdList, hide, setSelectedProductIdListMap}}
                        />
                        <Stack.Screen
                            name={OrderNavigatorRoutes.PAYMENT_SCREEN}
                            component={PaymentScreen}
                        />
                        <Stack.Screen
                            name={OrderNavigatorRoutes.NEW_CARD_SCREEN}
                            component={UserCard}
                        />
                        <Stack.Screen
                            name={OrderNavigatorRoutes.DELIVERY_SCREEN}
                            component={DeliveryScreen}
                            initialParams={{productIdList}}
                        />
                        <Stack.Screen
                            name={OrderNavigatorRoutes.ADDRESS_LIST_SCREEN}
                            component={AddressListScreen}
                        />
                    </Stack.Navigator>
                </NavigationContainer>
            </View>

        </Modal>
    );
});

const styles = StyleSheet.create({
    modalContainer: {
        marginHorizontal: 0,
        marginBottom: 0,
        marginTop: 40,
    },
    modalInnerContainer: {
        flex: 1,
        backgroundColor: COLORS.White,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        overflow: 'hidden',
    },
});

export default OrderWindow;
