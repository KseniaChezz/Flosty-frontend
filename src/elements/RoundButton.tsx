import React from 'react';
import {memo} from 'react';
import {
    TouchableOpacity,
    Image,
    ImageSourcePropType,
    StyleSheet,
} from 'react-native';

import {COLORS} from '../constants';

interface IProps {
    img: ImageSourcePropType;
    onPress: () => void;
}

const RoundButton = memo((props: IProps) => {
    const {
        img,
        onPress,
    } = props;

    return (
        <TouchableOpacity style={styles.button}>
            <Image
                source={img}
                style={styles.img}
            />
        </TouchableOpacity>
    );
});

const styles = StyleSheet.create({
    button: {
        height: 48,
        width: 48,
        borderRadius: 24,
        backgroundColor: COLORS.White,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: COLORS.GreyBlue,
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowRadius: 5,
        shadowOpacity: 1.0,
        marginLeft: 10,
    },
    img: {
        width: 30,
        height: 30,
    },
});

export default RoundButton;
