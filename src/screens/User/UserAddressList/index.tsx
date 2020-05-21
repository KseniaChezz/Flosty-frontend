import React, {useState, memo} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack/lib/typescript/src/types';
import {useSelector} from 'react-redux';

import {styles} from './style';

import {ScreenWrapperWithBackButton} from '../../../elements';
import AddressCard from './AddressCard';

import {IRootNavigatorParamList} from '../../../types/rootNavigator';
import {IAddress} from '../../../types/user';
import {IState} from '../../../store';

import {TEXT} from '../../../constants';
import {RootNavigatorRoutes} from '../../../enums';

import {getAddressObjectForRender} from '../../../utils';

type ScreenNavigationProp = StackNavigationProp<IRootNavigatorParamList, RootNavigatorRoutes.USER_PROFILE_ADDRESS_LIST>;

interface IProps {
    navigation: ScreenNavigationProp;
}

const UserAddressList = memo((props: IProps) => {
    const {navigation} = props;
    const addressList: IAddress[] = useSelector((state: IState) => state.user.addressList);

    const onBackPress = () => {
        navigation.goBack();
    };

    const onAddPress = () => {
        navigation.navigate(
            RootNavigatorRoutes.USER_PROFILE_ADDRESS,
            {title: TEXT.addAddress, fieldList: getAddressObjectForRender()},
        );
    };

    const onCardPress = (address: IAddress) => {
        return () => {
            navigation.navigate(
                RootNavigatorRoutes.USER_PROFILE_ADDRESS,
                {title: TEXT.editAddress, fieldList: getAddressObjectForRender(address), id: address.id},
            );
        }
    }

    const renderEmptyList = () => {
        return (
            <View style={styles.emptyListContainer}>

                <Text style={styles.emptyListText}>
                    {TEXT.emptyUserAddressList}
                </Text>

            </View>
        );
    };

    const renderList = () => {
        return addressList.map((address: IAddress) => {
            return (
                <AddressCard
                    key={address.id}
                    address={address}
                    onPress={onCardPress(address)}
                />
            )
        })
    }

    return (
        <ScreenWrapperWithBackButton
            text={TEXT.myAddresses}
            img={require('../../../../assets/images/add.png')}
            onImgPress={onAddPress}
            onBackPress={onBackPress}
            style={styles.wrapper}
        >

            {addressList.length === 0 ? renderEmptyList() : renderList()}

        </ScreenWrapperWithBackButton>
    );
});

export default UserAddressList;
