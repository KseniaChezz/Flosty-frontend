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
    title: string;
    value: string;
    isSelected: boolean;
    isDefault: boolean;
    onPress: () => void;
}

const RadioButtonRowItem = memo((props: IProps) => {
    const {
        title,
        value,
        isSelected,
        isDefault,
        onPress,
    } = props;
    const imgLeft: ImageSourcePropType = isSelected
        ? require('../../assets/images/radio_button_select.png')
        : require('../../assets/images/radio_button_default.png');
    const imgRight: ImageSourcePropType = isDefault
        ? require('../../assets/images/next.png')
        : require('../../assets/images/cross_grey.png');

    return (
        <TouchableOpacity style={styles.itemContainer} onPress={onPress}>
            <View style={styles.itemInnerContainer}>
                <Image
                    source={imgLeft}
                    style={styles.imageRadio}
                />

                <View style={styles.textContainer}>
                    <Text style={[styles.text, styles.name]}>
                        {title}
                    </Text>
                    <Text style={[styles.text, styles.value]}>
                        {value}
                    </Text>
                </View>

                <Image
                    source={imgRight}
                    style={isDefault ? styles.imageNext : styles.imageCross}
                />
            </View>
        </TouchableOpacity>
    );
});

const styles = StyleSheet.create({
    itemContainer: {
        paddingHorizontal: 8,
    },
    itemInnerContainer: {
        height: 56,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: COLORS.Border,
        borderBottomWidth: 1,
    },
    textContainer: {
        paddingLeft: 4,
        flex: 1,
    },
    imageNext: {
        height: 20,
        width: 20,
        marginRight: -5,
    },
    imageCross: {
        height: 30,
        width: 30,
    },
    imageRadio: {
        height: 30,
        width: 30,
        marginLeft: -5,
    },
    text: {
        fontFamily: 'Montserrat',
    },
    name: {
        color: COLORS.DarkGrey,
        fontSize: 14,
        lineHeight: 18,
        marginBottom: 3,
    },
    value: {
        color: COLORS.LightGrey,
        fontSize: 12,
        lineHeight: 14,
    },
});

export default RadioButtonRowItem;
