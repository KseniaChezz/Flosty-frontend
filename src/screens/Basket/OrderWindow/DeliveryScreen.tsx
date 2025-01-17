import React, {useState, useEffect, memo} from 'react';
import {
    View,
    StyleSheet,
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import {useSelector, useDispatch} from 'react-redux';
import {StackNavigationProp} from '@react-navigation/stack/lib/typescript/src/types';
import {RouteProp} from '@react-navigation/native';

import {
    HeaderWithBackButton,
    PlainRadioButtonRowItem,
    InfoRow,
} from '../../../elements';
import FilterItem from '../../../elements/ProductList/FilterWindow/FilterItem';

import {selectDeliveryType} from '../../../store/basket/actions';
import {getDeliveryPrice} from '../../../store/basket/thunks/getDeliveryPrice';

import {IOrderNavigatorParamList} from '../../../types/orderNavigator';
import {IState} from '../../../store';
import {IAddress} from '../../../types/user';
import {IDeliveryType} from '../../../types/basket';

import {OrderNavigatorRoutes} from '../../../enums/orderNavigatorRoutes';
import {RootNavigatorRoutes} from '../../../enums';
import {TEXT, COLORS} from '../../../constants';

import {navigate, getAddressForBasketMenuItem} from '../../../utils';

type ScreenNavigationProp = StackNavigationProp<IOrderNavigatorParamList, OrderNavigatorRoutes.DELIVERY_SCREEN>;
type ScreenRouteProp = RouteProp<IOrderNavigatorParamList, OrderNavigatorRoutes.DELIVERY_SCREEN>;

interface IProps {
    navigation: ScreenNavigationProp;
    route: ScreenRouteProp;
}

const DeliveryScreen = memo((props: IProps) => {
    const {
        navigation,
        route: {
            params: {
                hide,
                productIdList,
            },
        },
    } = props;
    const addressList: IAddress[] = useSelector((store: IState) => store.user.addressList);
    const selectedAddress: IAddress | undefined = useSelector((state: IState) => state.basket.selectedAddress);
    const deliveryTypeList: IDeliveryType[] = useSelector((state: IState) => state.basket.deliveryTypeList);
    const selectedDeliveryType: IDeliveryType = useSelector(
        (state: IState) => state.basket.selectedDeliveryType);
    const deliveryPrice: number = useSelector((state: IState) => state.basket.deliveryPrice);
    const isDataProcessing: boolean = useSelector((state: IState) => state.basket.isDataProcessing);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!selectedAddress) return;

        dispatch(getDeliveryPrice(selectedAddress.id, selectedDeliveryType.id, productIdList));
    }, [selectedAddress, selectedDeliveryType]);

    const onBackPress = () => {
        navigation.goBack();
    };

    const onDeliveryTypePress = (type: IDeliveryType) => {
        return () => {
            dispatch(selectDeliveryType(type));
        }
    };

    const onAddressPress = () => {
        if (addressList.length === 0) {
            navigate(RootNavigatorRoutes.USER_PROFILE_ADDRESS_LIST);
            hide();
        } else {
            navigation.navigate(OrderNavigatorRoutes.ADDRESS_LIST_SCREEN);
        }
    };

    return (
        <View style={styles.container}>

            <HeaderWithBackButton
                text={TEXT.delivery}
                noShadow={true}
                onBackPress={onBackPress}
                center={true}
            />

            <View style={styles.mainContent}>
                {deliveryTypeList.map((type: IDeliveryType) => {
                    const {id, name} = type;

                    return (
                        <PlainRadioButtonRowItem
                            key={id}
                            text={name}
                            isSelected={selectedDeliveryType?.id === id}
                            onPress={onDeliveryTypePress(type)}
                        />
                    )
                })}

                <FilterItem
                    title={TEXT.deliveryAddress}
                    value={selectedAddress ? getAddressForBasketMenuItem(selectedAddress) : TEXT.selectAddress}
                    isDefault={!selectedAddress}
                    onPress={onAddressPress}
                />

                <InfoRow
                    title={TEXT.deliverySum}
                    value={deliveryPrice}
                />
            </View>

            <Spinner visible={isDataProcessing} />

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

export default DeliveryScreen;
