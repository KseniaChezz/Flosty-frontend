import React, {memo} from 'react';
import {
    View,
    Text,
    StyleSheet,
} from 'react-native';

import OrderProductCard from './OrderProductCard';

import {IOrder, IOrderProduct} from '../../../types/user';

import {TEXT, COLORS} from '../../../constants';

import {getDayAndMonth} from '../../../utils';

interface IProps {
    order: IOrder;
}

const OrderCard = memo((props: IProps) => {
    const {order} = props;
    const {
        deliveryDate,
        status,
        trackNumber,
        products,
    } = order;

    return (
        <View style={styles.container}>
            <View style={styles.deliveryContainer}>
                <Text style={[styles.text, styles.deliveryText]}>
                    {TEXT.delivery}
                </Text>
                <Text style={[styles.text, styles.flex1]}>
                    {TEXT.till} {getDayAndMonth(deliveryDate)}
                </Text>
                <View style={styles.statusContainer}>
                    <Text style={[styles.text, styles.statusText]}>
                        {status}
                    </Text>
                </View>
            </View>

            {products.map((product: IOrderProduct) => {
                const {id} = product;

                return (
                    <OrderProductCard
                        key={id}
                        product={product}
                        trackNumber={trackNumber}
                    />
                )
            })}
        </View>
    );
});

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.White,
        marginTop: 10,
        paddingHorizontal: 8,
    },
    deliveryContainer: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: COLORS.Border,
        height: 44,
        paddingHorizontal: 4,
        alignItems: 'center',
    },
    text: {
        fontFamily: 'Montserrat',
        fontSize: 14,
        lineHeight: 18,
    },
    statusContainer: {
        height: 20,
        backgroundColor: COLORS.TagLightBlue,
        paddingHorizontal: 5,
        borderRadius: 5,
    },
    statusText: {
        color: COLORS.White,
        fontSize: 10,
        lineHeight: 20,
        fontWeight: '600',
    },
    deliveryText: {
        color: COLORS.LightGrey,
        marginRight: 5,
    },
    flex1: {
        flex: 1,
    },
});

export default OrderCard;
