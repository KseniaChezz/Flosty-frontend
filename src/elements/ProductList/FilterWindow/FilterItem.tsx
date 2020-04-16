import React, {useState, memo} from 'react';
import {
    View,
    Text,
    Image,
    ImageSourcePropType,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';

import {TEXT, COLORS} from '../../../constants';

interface IProps {
    title: string;
    value: string;
    isDefault: boolean;
    onPress: () => void;
}

const FilterItem = memo((props: IProps) => {
    const {
        title,
        value,
        isDefault,
        onPress,
    } = props;
    const img: ImageSourcePropType = isDefault
        ? require('../../../../assets/images/next.png')
        : require('../../../../assets/images/cross_grey.png');

    return (
        <TouchableOpacity style={styles.itemContainer} onPress={onPress}>
            <View style={styles.itemInnerContainer}>
                <View style={styles.textContainer}>
                    <Text style={[styles.text, styles.name]}>
                        {title}
                    </Text>
                    <Text style={[styles.text, styles.value]}>
                        {value}
                    </Text>
                </View>

                <View>
                    <Image
                        source={img}
                        style={isDefault ? styles.imageNext : styles.imageCross}
                    />
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
        height: 56,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomColor: COLORS.Border,
        borderBottomWidth: 1,
    },
    textContainer: {
        paddingLeft: 4,
    },
    imageNext: {
        height: 20,
        width: 20,
    },
    imageCross: {
        height: 30,
        width: 30,
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

export default FilterItem;
