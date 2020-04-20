import React, {useState, memo} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    StyleSheet,
} from 'react-native';

import {IAddress} from '../../../types/user';

import {COLORS} from '../../../constants';

interface IProps {
    address: IAddress;
    onPress: () => void;
}

const AddresCard = memo((props: IProps) => {
    const {
        onPress,
        address,
    } = props;
    const {
        country,
        region,
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

    return (
        <TouchableOpacity
            style={styles.cardContainer}
            onPress={onPress}
        >
            <View style={styles.cardInnerContainer}>

                <View style={styles.textContainer}>

                    <Text style={[styles.text, styles.textBold]}>
                        {`${firstName} ${name},`}
                    </Text>

                    <Text style={[styles.text, styles.textBold]}>
                        {`+7 ${phoneNumber}, ${email}`}
                    </Text>

                    <Text style={[styles.text, styles.marginTop5]}>
                        {`${street}, д.${house}, к.${building}, стр.${block}, кв.${apartment}`}
                    </Text>

                    <Text style={styles.text}>
                        {`${country}, ${city}`}
                    </Text>

                    <Text style={styles.text}>
                        {index}
                    </Text>

                </View>

                <View style={styles.iconContainer}>
                    <Image
                        style={styles.icon}
                        source={require('../../../../assets/images/next.png')}
                    />
                </View>

            </View>

        </TouchableOpacity>
    );
});

const styles = StyleSheet.create({
    cardContainer: {
        backgroundColor: COLORS.White,
        marginBottom: 5,
    },
    cardInnerContainer: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: COLORS.Border,
        marginHorizontal: 8,
        paddingHorizontal: 4,
        paddingTop: 10,
        paddingBottom:5,
    },
    textContainer: {
        flex: 1,
    },
    iconContainer: {
        width: 30,
        justifyContent: 'flex-start',
        alignItems: 'flex-end',
    },
    icon: {
        height: 20,
        width: 20,
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

export default AddresCard;
