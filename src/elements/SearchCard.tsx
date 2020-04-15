import React from 'react';
import {memo} from 'react';
import {
    Text,
    Image,
    TouchableOpacity,
    ImageSourcePropType,
    ViewStyle,
    StyleSheet,
} from 'react-native';

import {COLORS} from '../constants';

interface IProps {
    text: string;
    img: ImageSourcePropType;
    onPress: () => void;
    style?: ViewStyle;
}

const SearchCard = memo((props: IProps) => {
    const {
        text,
        img,
        onPress,
        style,
    } = props;

    return (
        <TouchableOpacity
            style={[styles.container, style]}
            onPress={onPress}
        >
            <Image
                source={img}
                style={styles.img}
            />
            <Text style={styles.text}>
                {text}
            </Text>
        </TouchableOpacity>
    );
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
        backgroundColor: COLORS.White,
        borderRadius: 10,
    },
    img: {
        width: 60,
        height: 60,
        borderRadius: 30,
    },
    text: {
        color: COLORS.DarkGrey,
        fontFamily: 'Montserrat',
        fontSize: 10,
        lineHeight: 14,
        textAlign: 'center',
    },
});

export default SearchCard;
