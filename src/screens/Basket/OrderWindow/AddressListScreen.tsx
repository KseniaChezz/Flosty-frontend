import React, {useState, memo} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {StackNavigationProp} from '@react-navigation/stack/lib/typescript/src/types';

import {
    HeaderWithBackButton,
    AddressRadioButtonItem,
} from '../../../elements';

import {selectAddress} from '../../../store/basket/actions';

import {IOrderNavigatorParamList} from '../../../types/orderNavigator';
import {IState} from '../../../store';
import {IAddress} from '../../../types/user';

import {OrderNavigatorRoutes} from '../../../enums/orderNavigatorRoutes';
import {TEXT, COLORS} from '../../../constants';

type ScreenNavigationProp = StackNavigationProp<IOrderNavigatorParamList, OrderNavigatorRoutes.ADDRESS_LIST_SCREEN>;

interface IProps {
    navigation: ScreenNavigationProp;
}

const AddressListScreen = memo((props: IProps) => {
    const {navigation} = props;
    const addressList: IAddress[] = useSelector((store: IState) => store.user.addressList);
    const selectedAddress: IAddress | undefined = useSelector((store: IState) => store.basket.selectedAddress);
    const dispatch = useDispatch();

    const onBackPress = () => {
        navigation.goBack();
    };

    const onAddressPress = (address: IAddress) => {
        return () => {
            dispatch(selectAddress(address));
        }
    };

    return (
        <View style={styles.container}>

            <HeaderWithBackButton
                text={TEXT.deliveryAddress}
                noShadow={true}
                onBackPress={onBackPress}
                center={true}
            />

            <View style={styles.mainContent}>
                <ScrollView>
                    {addressList.map((address: IAddress) => {
                        const {id} = address;

                        return(
                            <AddressRadioButtonItem
                                address={address}
                                isSelected={selectedAddress?.id === id}
                                onPress={onAddressPress(address)}
                            />
                        )
                    })}
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

export default AddressListScreen;
