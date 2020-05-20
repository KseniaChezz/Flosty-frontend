import React, {useState, memo} from 'react';
import {
    View,
    Text,
    Image,
    ImageSourcePropType,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';

import {IAddress} from '../types/user';

import {COLORS} from '../constants';

import {getAddressString} from '../utils';

interface IProps {
    address: IAddress;
    isSelected: boolean;
    onPress: () => void;
}

const AddressRadioButtonItem = memo((props: IProps) => {
    const {
        address,
        isSelected,
        onPress,
    } = props;
    const {
        country,
        city,
        street,
        house,
        building,
        block,
        apartment,
        index,
        firstName,
        name,
        phoneNumber,
        email,
    } = address;

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
                    <Text style={[styles.text, styles.textBold]}>
                        {`${firstName} ${name},`}
                    </Text>

                    <Text style={[styles.text, styles.textBold]}>
                        {`+7 ${phoneNumber}, ${email}`}
                    </Text>

                    <Text style={[styles.text, styles.marginTop5]}>
                        {getAddressString(street, house, building, block, apartment)}
                    </Text>

                    <Text style={styles.text}>
                        {`${country}, ${city}`}
                    </Text>

                    <Text style={styles.text}>
                        {index}
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
        fontSize: 14,
        lineHeight: 18,
        color: COLORS.DarkGrey,
    },
    textBold: {
        fontWeight: '600',
    },
    marginTop5: {
        marginTop: 5,
    },
});

export default AddressRadioButtonItem;
