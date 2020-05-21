import React from 'react';
import {memo, useState} from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';

import {RowMenuItem} from '../../../elements';

import {COLORS, TEXT} from '../../../constants';

interface IProps {
    // price: number;
    // time: string;
    onGuaranteePress: () => void;
}

const DeliveryAndGuaranteeSection = memo((props: IProps) => {
    const {
        // price,
        // time,
        onGuaranteePress,
    } = props;

    return (
        <View style={styles.container}>
            <View style={styles.innerContainer}>
                <Text style={[styles.text, styles.title]}>
                    {TEXT.delivery}
                </Text>

                <Text style={[styles.text, styles.deliveryText]}>
                    {/*{price === 0 ? TEXT.free : price}, {time}*/}
                    1 – 14 дней
                </Text>
            </View>

            <RowMenuItem
                text={TEXT.guarantee}
                isIconShown={true}
                onPress={onGuaranteePress}
                style={styles.paddingHorizontal0}
            />
        </View>
    );
});

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.White,
        paddingHorizontal: 8,
        marginBottom: 10,
    },
    innerContainer: {
        borderBottomColor: COLORS.Border,
        borderBottomWidth: 1,
        paddingHorizontal: 4,
        paddingVertical: 13,
    },
    text: {
        color: COLORS.DarkGrey,
        fontFamily: 'Montserrat',
    },
    title: {
        fontSize: 16,
        lineHeight: 20,
        marginBottom: 5,
    },
    deliveryText: {
        fontSize: 12,
        lineHeight: 14,
    },
    paddingHorizontal0: {
        paddingHorizontal: 0,
    },
});

export default DeliveryAndGuaranteeSection;
