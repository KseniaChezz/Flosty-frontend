import React, {useState, memo} from 'react';
import {
    View,
    Text,
    Image,
    ImageSourcePropType,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';

import {COLORS} from '../constants';

interface IProps {
    text: string;
    isSelected: boolean;
    onPress: () => void;
}

const PlainRadioButtonRowItem = memo((props: IProps) => {
    const {
        text,
        isSelected,
        onPress,
    } = props;
    const img: ImageSourcePropType = isSelected
        ? require('../../assets/images/radio_button_select.png')
        : require('../../assets/images/radio_button_default.png');

    return (
        <TouchableOpacity style={styles.itemContainer} onPress={onPress}>
            <View style={styles.itemInnerContainer}>
                <Image
                    source={img}
                    style={styles.img}
                />

                <View style={styles.textContainer}>
                    <Text style={styles.text}>
                        {text}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );
});

const styles = StyleSheet.create({
    itemContainer: {
        paddingHorizontal: 8,
    },
    itemInnerContainer: {
        height: 44,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: COLORS.Border,
        borderBottomWidth: 1,
    },
    textContainer: {
        paddingLeft: 4,
    },
    img: {
        height: 30,
        width: 30,
        marginLeft: -5,
    },
    text: {
        fontFamily: 'Montserrat',
        color: COLORS.DarkGrey,
        fontSize: 14,
        lineHeight: 18,
        marginBottom: 3,
    },
});

export default PlainRadioButtonRowItem;
