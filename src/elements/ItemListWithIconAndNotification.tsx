import React from 'react';
import {memo} from 'react';
import {
    Text,
    View,
    Image,
    TouchableOpacity,
    ImageSourcePropType,
    ViewStyle,
    TextStyle,
    StyleSheet,
} from 'react-native';

import Notification from './Notification';

import {COLORS} from '../constants';

interface IProps {
    text: string;
    img: ImageSourcePropType;
    notificationCount?: number;

    onPress: () => void;

    style?: ViewStyle;
    textStyle?: TextStyle;
}

const ItemListWithIconAndContainer = memo((props: IProps) => {
    const {
        img,
        text,
        notificationCount,
        style,
        textStyle,
        onPress,
    } = props;

    return (
        <TouchableOpacity
            onPress={onPress}
            style={[styles.container, style]}
        >

            <View style={styles.innerContainer}>

                <View style={styles.iconContainer}>
                    <Image
                        style={styles.icon}
                        source={img}
                    />
                </View>

                <View style={styles.textContainer}>

                    <Text style={[styles.itemText, textStyle]}>
                        {text}
                    </Text>

                </View>

                <Notification count={notificationCount} />

            </View>

        </TouchableOpacity>
    );
});

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 5,
        backgroundColor: COLORS.White,
    },
    innerContainer: {
        height: 44,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: COLORS.Border,
    },
    iconContainer: {
        paddingLeft: 8,
    },
    icon: {
        height: 30,
        width: 30,
    },
    textContainer: {
        flex: 1,
        paddingLeft: 17,
    },
    itemText: {
        fontFamily: 'Montserrat',
        color: COLORS.DarkGrey,
        fontSize: 14,
        lineHeight: 18,
    },
});

export default ItemListWithIconAndContainer;
