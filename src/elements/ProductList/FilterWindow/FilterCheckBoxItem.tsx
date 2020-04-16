import React, {useState, memo} from 'react';
import {
    View,
    Text,
    Image,
    ImageSourcePropType,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';

import {COLORS} from '../../../constants';

interface IProps {
    text: string;
    isSelected: boolean;
    hasAdditionalFilter: boolean;
    onPress: () => void;
}

const FilterCheckBoxItem = memo((props: IProps) => {
    const {
        text,
        isSelected,
        hasAdditionalFilter,
        onPress,
    } = props;
    const imgCheckBox: ImageSourcePropType = isSelected
        ? require('../../../../assets/images/check_box_select.png')
        : require('../../../../assets/images/check_box_default.png');
    const imgNextFilter: ImageSourcePropType = isSelected
        ? require('../../../../assets/images/cross_grey.png')
        : require('../../../../assets/images/next.png');

    return (
        <TouchableOpacity style={styles.itemContainer} onPress={onPress}>
            <View style={styles.itemInnerContainer}>

                <View style={styles.leftContainer}>
                    <Image
                        source={imgCheckBox}
                        style={styles.iconBig}
                    />
                    <Text style={styles.text}>
                        {text}
                    </Text>
                </View>

                {hasAdditionalFilter && <Image
                    source={imgNextFilter}
                    style={isSelected ? styles.iconBig : styles.iconSmall}
                />}

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
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: COLORS.Border,
        paddingHorizontal: 4,
    },
    leftContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconSmall: {
        height: 20,
        width: 20,
    },
    iconBig: {
        height: 30,
        width: 30,
    },
    text: {
        fontFamily: 'Montserrat',
        color: COLORS.DarkGrey,
        fontSize: 14,
        lineHeight: 18,
        marginLeft: 15,
    },
});

export default FilterCheckBoxItem;
