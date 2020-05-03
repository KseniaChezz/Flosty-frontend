import React, {memo} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    StyleSheet,
} from 'react-native';

import {TEXT, COLORS} from '../../constants';
import {RootNavigatorRoutes} from '../../enums';

import {navigate} from '../../utils';

interface IProps {
    shopId: number;
    shopName: string;
    shopLogo: string;
}

const SendMessage = memo((props: IProps) => {
    const {shopId, shopName, shopLogo} = props;

    const onMessagePress = () => {
        navigate(RootNavigatorRoutes.USER_PROFILE_SHOP_CHAT, {shopId, shopName, shopLogo});
    };

    return (
        <TouchableOpacity
            style={styles.rightContainer}
            onPress={onMessagePress}
        >
            <Image
                source={require('../../../assets/images/messages.png')}
                style={styles.message}
            />
            <Text style={styles.text}>{TEXT.sendMessage}</Text>
        </TouchableOpacity>
    );
});

const styles = StyleSheet.create({
    rightContainer: {
        flexDirection: 'row',
        height: 44,
        alignItems: 'center',
    },
    message: {
        height: 20,
        width: 20,
        marginRight: 10,
    },
    text: {
        fontFamily: 'Montserrat',
        color: COLORS.DarkGrey,
    },
});

export default SendMessage;
