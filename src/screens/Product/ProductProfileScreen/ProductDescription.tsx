import React from 'react';
import {memo, useState} from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';

import {
    Rating,
    Price,
    RoundButton,
} from '../../../elements';

import {addFavoriteProduct} from '../../../store/favorite/thunks/addFavoriteProduct';
import {deleteFavoriteProduct} from '../../../store/favorite/thunks/deleteFavoriteProduct';

import {IState} from '../../../store';
import {IDetailProduct, IShopProduct} from '../../../types/product';

import {isProductFavorite} from '../../../utils';

import {TEXT, COLORS} from '../../../constants';

interface IProps {
    product: IDetailProduct;
}

const ProductDescription = memo((props: IProps) => {
    const {product} = props;
    const {
        id,
        shopId,
        name,
        description,
        price,
        oldPrice,
        rating,
        date,
        boughtNumber,
        savedNumber,
        tagList,
        imageList,
    } = product;
    const favoriteProductcList = useSelector((stor: IState) => stor.favorite.list);
    const isProductInFavoriteList: boolean = isProductFavorite(id, favoriteProductcList);
    const favoriteImg = isProductInFavoriteList
        ? require('../../../../assets/images/chosen_select.png')
        : require('../../../../assets/images/chosen_default.png');
    const dispatch = useDispatch();

    const onAddFavoritePress = () => {
        dispatch(addFavoriteProduct({
            id,
            shopId,
            name,
            price,
            rating,
            date,
            img: imageList[0],
            tagList,
        }));
    };

    const onDeleteFavoritePress = () => {
        dispatch(deleteFavoriteProduct(id));
    };

    const onFavoritePress = isProductInFavoriteList ? onDeleteFavoritePress : onAddFavoritePress;

    return (
        <View style={styles.descriptionContainer}>
            <View style={styles.priceContainer}>
                <Price
                    price={price}
                    style={[styles.text, styles.currentPrice]}
                />

                {!!oldPrice &&
                    <Price
                        price={oldPrice}
                        style={[styles.text, styles.oldPrice]}
                    />
                }
            </View>

            <Text style={[styles.text, styles.titleText]}>
                {name}
            </Text>

            <Text style={[styles.text, styles.descriptionText]}>
                {description}
            </Text>

            <View style={styles.statisticsContainer}>
                {!!rating && <Rating rating={rating} />}

                <View style={styles.textRow}>
                    {!!boughtNumber &&
                        <Text style={[styles.text, styles.statisticsText]}>
                            {`${boughtNumber} ${TEXT.bought}`}
                        </Text>
                    }

                    {!!savedNumber &&
                        <Text style={[styles.text, styles.statisticsText, styles.marginLeft15]}>
                            {`${savedNumber} ${TEXT.saved}`}
                        </Text>
                    }
                </View>
            </View>

            <View style={styles.buttonsContainer}>
                <RoundButton
                    img={require('../../../../assets/images/messages.png')}
                    onPress={()=>{}}
                />

                <RoundButton
                    img={favoriteImg}
                    onPress={onFavoritePress}
                />
            </View>

        </View>
    );
});

const styles = StyleSheet.create({
    descriptionContainer: {
        position: 'relative',
        paddingHorizontal: 12,
        backgroundColor: COLORS.White,
    },
    text: {
        color: COLORS.DarkGrey,
        fontFamily: 'Montserrat',
    },
    titleText: {
        fontSize: 16,
        lineHeight: 20,
        fontWeight: '600',
        marginBottom: 7,
    },
    descriptionText: {
        fontSize: 14,
        lineHeight: 18,
    },
    statisticsContainer: {
        flexDirection: 'row',
        height: 44,
        justifyContent: 'space-between',
        alignContent: 'center',
    },
    textRow: {
        flexDirection: 'row',
    },
    statisticsText: {
        color: COLORS.LightGrey,
        fontSize: 12,
        lineHeight: 44,
    },
    marginLeft15: {
        marginLeft: 15,
    },
    priceContainer: {
        flexDirection: 'row',
        marginVertical: 20,
    },
    currentPrice: {
        fontSize: 22,
        lineHeight: 25,
        fontWeight: '600',
    },
    oldPrice: {
        color: COLORS.LightGrey,
        fontSize: 16,
        lineHeight: 25,
        marginLeft: 10,
        textDecorationLine: 'line-through',
    },
    buttonsContainer: {
        height: 48,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        position: 'absolute',
        top: -24,
        right: 12,
    },
});

export default ProductDescription;
