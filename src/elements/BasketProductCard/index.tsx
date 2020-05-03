import React, {memo} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    ImageSourcePropType,
} from 'react-native';

import {styles} from './style';

import PriceRow from './PriceRow';

import {IBasketProduct} from '../../types/basket';

import {TEXT} from '../../constants';

interface IProps {
    product: IBasketProduct;
    isSelected: boolean;
    onProductPress: () => void;
}

const BasketProductCard = memo((props: IProps) => {
    const {
        product,
        isSelected,
        onProductPress,
    } = props;
    const {
        id,
        image,
        name,
        color,
        size,
        price,
        quantity,
    } = product;
    const checkboxImage: ImageSourcePropType = isSelected
        ? require('../../../assets/images/checkbox_select.png')
        : require('../../../assets/images/checkbox_default.png');

    return (
        <View>
            <View key={id} style={styles.productContainer}>
                <TouchableOpacity onPress={onProductPress}>
                    <Image
                        source={checkboxImage}
                        style={styles.checkbox}
                    />
                </TouchableOpacity>

                <Image
                    source={{uri: image}}
                    style={styles.productImage}
                />

                <View style={styles.textContainer}>
                    <Text style={[styles.text, styles.titleText, styles.marginBottom5]}>
                        {name}
                    </Text>
                    <Text style={[styles.text, styles.plainText, styles.marginBottom5]}>
                        {TEXT.size}: {size}, {TEXT.color}: {color}
                    </Text>
                    <Text style={[styles.text, styles.plainText]}>
                        Доставка 0 – 300 ₽, 2 – 5 дней
                    </Text>
                </View>
            </View>

            <PriceRow
                quantity={quantity}
                price={price}
            />
        </View>
    );
});

export default BasketProductCard;
