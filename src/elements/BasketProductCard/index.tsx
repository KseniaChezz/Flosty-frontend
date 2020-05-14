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
    quantity: number;
    isSelected: boolean;
    onProductPress: () => void;
    onIncreaseProductQuantityPress: () => void;
    onDecreaseProductQuantityPress: () => void;
    onDeleteProductPress: () => void;
}

const BasketProductCard = memo((props: IProps) => {
    const {
        product,
        quantity,
        isSelected,
        onProductPress,
        onIncreaseProductQuantityPress,
        onDecreaseProductQuantityPress,
        onDeleteProductPress,
    } = props;
    const {
        id,
        image,
        name,
        color,
        size,
        price,
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
                onIncreaseProductQuantityPress={onIncreaseProductQuantityPress}
                onDecreaseProductQuantityPress={onDecreaseProductQuantityPress}
                onDeleteProductPress={onDeleteProductPress}
            />
        </View>
    );
});

export default BasketProductCard;
