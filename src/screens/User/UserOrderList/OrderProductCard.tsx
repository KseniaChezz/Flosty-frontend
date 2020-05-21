import React, {memo} from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
} from 'react-native';

import {Price} from '../../../elements';

import {IOrderProduct} from '../../../types/user';

import {getSizeColorQuantityText} from '../../../utils';

import {COLORS} from '../../../constants';

interface IProps {
    product: IOrderProduct;
    trackNumber: string;
}

const OrderProductCard = memo((props: IProps) => {
    const {product, trackNumber} = props;
    const {id, image, price} = product;
    const sizeColorQuantityText: string = getSizeColorQuantityText(product);

    return (
        <View style={styles.productcontainer}>
            <Image
                source={{uri: image}}
                style={styles.img}
            />

            <View>
                <Text style={[styles.text, styles.marginBottom5]}>
                    № {trackNumber}
                </Text>

                <Text style={[styles.text, styles.marginBottom5]}>
                    {sizeColorQuantityText}
                </Text>

                <Price
                    price={price}
                    style={styles.priceText}
                />
            </View>
        </View>
    );
});

const styles = StyleSheet.create({
    text: {
        fontFamily: 'Montserrat',
        fontSize: 14,
        lineHeight: 18,
    },
    productcontainer: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: COLORS.Border,
        paddingHorizontal: 4,
        paddingVertical: 10,
        alignItems: 'center',
    },
    img: {
        height: 60,
        width: 60,
        borderRadius: 10,
        marginRight: 15,
    },
    marginBottom5: {
        marginBottom: 5,
    },
    priceText: {
        fontWeight: '600',
        fontSize: 16,
        lineHeight: 20,
    },
});

export default OrderProductCard;
