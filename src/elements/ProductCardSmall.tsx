import React, {memo, useState, Fragment} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    ImageSourcePropType,
    StyleSheet,
} from 'react-native';
import {useSelector} from 'react-redux';

import Price from './Price';
import Rating from './Rating';

import {COLORS} from '../constants';

import {IShopProduct} from '../types/product';
import {IState} from '../store';
import { isProductFavorite } from '../utils';

interface IProps {
    product: IShopProduct;
    onProductPress: () => void;
}

const ProductCardSmall = memo((props: IProps) => {
    const {
        product,
        onProductPress,
    }= props;
    const {
        id,
        img,
        price,
        rating,
    } = product;
    const [ratio, setRatio] = useState<number>(0);
    const favoriteList: IShopProduct[] = useSelector((stor: IState) => stor.favorite.list);
    const isFavorite: boolean = isProductFavorite(id, favoriteList);

    const source =  Image.getSize(
        img,
        (width: number, height: number) => {
            setRatio(width / height);
        },
        (err) => console.log(err));

    return (
        <TouchableOpacity
            style={styles.container}
            onPress={onProductPress}
        >
            <Image
                source={{uri: img}}
                style={[styles.productImage, {aspectRatio: ratio}]}
            />

            <View style={styles.textContainer}>
                <Price price={price} />

                {!!rating && <Rating rating={rating} />}
            </View>

            {isFavorite &&
                <Image
                    source={require('../../assets/images/chosen_select.png')}
                    style={styles.selected}
                />
            }
        </TouchableOpacity>
    );
});

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        marginTop: 10,
    },
    productImage: {
        width: '100%',
        height: undefined,
        resizeMode: 'contain',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    textContainer: {
        flexDirection: 'row',
        height: 34,
        backgroundColor: COLORS.White,
        paddingHorizontal: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
    },
    selected: {
        position: 'absolute',
        top: 10,
        right: 10,
        height: 20,
        width: 20,
    },
});

export default ProductCardSmall;
