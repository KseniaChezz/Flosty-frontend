import React, {memo, useState} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    ImageSourcePropType,
    StyleSheet,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';

import Price from './Price';
import Rating from './Rating';

import {addFavoriteProduct} from '../store/favorite/thunks/addFavoriteProduct';
import {deleteFavoriteProduct} from '../store/favorite/thunks/deleteFavoriteProduct';

import {TEXT, COLORS} from '../constants';

import {IFeedProduct, IShopProduct} from '../types/product';
import {IState} from '../store';
import {ITag} from '../types/shop';

import {
    getLogoForFeedProduct,
    getShopNameForFeedProduct,
    isProductFavorite,
    navigate,
} from '../utils';

import {RootNavigatorRoutes} from '../enums';

interface IProps {
    product: IFeedProduct | IShopProduct;
    onProductPress: () => void;
    onBasketPress: () => void;
    isShopShown?: boolean;
}

const isFeedProduct = (product: IFeedProduct | IShopProduct): product is IFeedProduct => {
    return (product as IFeedProduct).subscription !== undefined;
}

const ProductCardBig = memo((props: IProps) => {
    const {
        product,
        onProductPress,
        onBasketPress,
        isShopShown,
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
    const favoriteIcon: ImageSourcePropType = isFavorite
        ? require('../../assets/images/chosen_select.png')
        : require('../../assets/images/chosen_default.png');
    const dispatch = useDispatch();

    const source =  Image.getSize(
        img,
        (width: number, height: number) => {
            setRatio(width / height);
    },
        (err) => console.log(err));

    const onAddFavoritePress = () => {
        dispatch(addFavoriteProduct(product as IShopProduct));
    }

    const onDeleteFavoritePress = () => {
        dispatch(deleteFavoriteProduct(id));
    }

    const onTagPress = (id: number) => {
        return () => navigate(RootNavigatorRoutes.TAG_PROFILE, {id});
    }

    const renderFeedProductInfoFromSubscription = (product: IFeedProduct) => {
        const {subscription} = product;
        const {tags} = subscription;
        const logo: ImageSourcePropType = getLogoForFeedProduct(subscription);
        const shopName: string = getShopNameForFeedProduct(subscription);
        const subscriptionText: string = shopName ? TEXT.shop : '';

        return (
            <View style={styles.shopContainer}>
                <Image
                    style={styles.logo}
                    source={logo}
                />

                <View>
                    {!!shopName && <Text style={[styles.text, styles.shop]}>{shopName}</Text>}

                    <View style={styles.subscriptionSourceRow}>
                        <Text style={[styles.text, styles.subscription]}>{TEXT.subscription} {subscriptionText}</Text>

                        {tags.map((item: ITag) => {
                            const {id, name} = item;

                            return (
                                <TouchableOpacity onPress={onTagPress(+id)}>
                                    <Text style={[styles.text, styles.subscription, styles.tag]}>#{name}</Text>
                                </TouchableOpacity>
                            )
                        })}
                    </View>
                </View>
            </View>
        )
    }

    return (
        <TouchableOpacity onPress={onProductPress} style={styles.container}>

            {isFeedProduct(product) && renderFeedProductInfoFromSubscription(product)}

            <Image
                style={[styles.productImage, {aspectRatio: ratio}]}
                source={{uri:img}}
            />

            <View style={styles.textContainer}>

                <View style={styles.priceAndRatingContainer}>

                    <Price price={price}/>

                    {!!rating && <Rating rating={rating} />}

                </View>

                <View style={styles.iconContainer}>

                    <TouchableOpacity onPress={isFavorite ? onDeleteFavoritePress : onAddFavoritePress}>
                        <Image
                            source={favoriteIcon}
                            style={styles.icon}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={onBasketPress}>
                        <Image
                            source={require('../../assets/images/basket_default.png')}
                            style={styles.icon}
                        />
                    </TouchableOpacity>

                </View>

            </View>

        </TouchableOpacity>
    );
});

const styles = StyleSheet.create({
    container: {
       marginTop: 10,
    },
    shopContainer: {
        flexDirection: 'row',
        height: 44,
        backgroundColor: COLORS.White,
        paddingHorizontal: 10,
        alignItems: 'center',
    },
    logo: {
        height: 36,
        width: 36,
        borderRadius: 18,
        marginRight: 15,
    },
    productImage: {
        width: '100%',
        resizeMode: 'contain',
    },
    textContainer: {
        flexDirection: 'row',
        height: 44,
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: COLORS.White,
        paddingHorizontal: 10,
    },
    priceAndRatingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconContainer: {
        flexDirection: 'row',
        width: 90,
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    icon: {
        width: 30,
        height: 30,
    },
    text: {
        fontFamily: 'Montserrat',
        color: COLORS.DarkGrey,
    },
    shop: {
        fontSize: 14,
        lineHeight: 18,
        fontWeight: '600',
    },
    subscription: {
        fontSize: 12,
        lineHeight: 14,
        marginRight: 5,
    },
    tag: {
        color: COLORS.BrightBlue,
    },
    subscriptionSourceRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
});

export default ProductCardBig;
