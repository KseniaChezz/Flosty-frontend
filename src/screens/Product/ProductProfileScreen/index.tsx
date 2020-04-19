import React from 'react';
import {memo, useState, Fragment} from 'react';
import {View, Text, Image, TouchableOpacity, ScrollView} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useSelector} from 'react-redux';

import {styles} from './style';

import MainProductSection from './MainProductSection';
import TagListSection from './TagListSection';
import ProductPropertyPicker from './ProductPropertyPicker';
import ShopSection from './ShopSection';
import DeliveryAndGuaranteeSection from './DeliveryAndGuaranteeSection';
import {ColoredButton} from '../../../elements';

import {IProductNavigatorParamList} from '../../../types/productNavigator';
import {IUserProfileItem} from '../../../types/user';
import { IState } from '../../../store';
import {IProductDetail, IProductProperty} from '../../../types/product';

import {
    TEXT,
} from '../../../constants';
import {ProductNavigatorRoutes} from '../../../enums';

type ScreenNavigationProp = StackNavigationProp<IProductNavigatorParamList, ProductNavigatorRoutes.PRODUCT_PROFILE_SCREEN>;

const product: IProductDetail = {
    title: 'Сапоги Red. Раскрасим зиму яркими красками?!',
    text: 'Фирменая модель от Az-ART красивая необычная обувь для девушек! Удобная колодка со шнурками, которые можно не расшнуривать!',
    price: 3000,
    oldPrice: 3500,
    rating: '5,0',
    boughtNumber: 45,
    savedNumber: 123,
    img: require('../../../../assets/images/sneakers1.jpg'),
    tags: ['#azart', '#обувь', '#сапоги', '#осень'],
    sizes: [
        {value: '36', isAvailable: false},
        {value: '37', isAvailable: true},
        {value: '38', isAvailable: true},
        {value: '39', isAvailable: true},
        {value: '40', isAvailable: true},
        {value: '41', isAvailable: true},
        {value: '42', isAvailable: true},
    ],
    colors: [
        {value: 'red', isAvailable: true},
        {value: 'blue', isAvailable: true},
        {value: 'green', isAvailable: true},
    ],
    shop: {
        id: 'shopId1',
        name: 'AzART',
        rating: '4,8',
        img: require('../../../../assets/images/bag.png'),
    },
    delivery: {
        price: 0,
        time: '2 – 5 дней',
    },
    descriptionList: [
        {
            title: 'Тип товара',
            value: 'сапоги женские',
        },
        {
            title: 'Материал',
            value: 'кожа',
        },
        {
            title: 'Материал подошвы',
            value: 'резина',
        },
    ],
}

interface IProps {
    navigation: ScreenNavigationProp;
}

const ProductProfile = memo((props: IProps) => {
    const {navigation} = props;
    const [productSize, setProductSize] = useState<string>('');
    const [productColor, setProductColor] = useState<string>('');

    const onDescriptionPress = () => {
        navigation.navigate(ProductNavigatorRoutes.DESCRIPTION_SCREEN, {descriptionList: product.descriptionList});
    };

    const onGuaranteePress = () => {
        navigation.navigate(ProductNavigatorRoutes.GUARANTEE_SCREEN);
    };

    return (
        <Fragment>
            <View style={styles.container}>
                <ScrollView>
                    <MainProductSection
                        product={product}
                    />

                    <TagListSection
                        tagList={product.tags}
                    />

                    <ProductPropertyPicker
                        colorList={product.colors}
                        selectedColor={productColor}
                        setSelectedColor={setProductColor}
                        sizeList={product.sizes}
                        selectedSize={productSize}
                        setSelectedSize={setProductSize}
                        descriptionList={product.descriptionList}
                        onDescriptionPress={onDescriptionPress}
                    />

                    <ShopSection
                        shop={product.shop}
                    />

                    <DeliveryAndGuaranteeSection
                        price={product.delivery.price}
                        time={product.delivery.time}
                        onGuaranteePress={onGuaranteePress}
                    />

                </ScrollView>
            </View>

            <View style={styles.buttonContainer}>
                <ColoredButton
                    text={`${TEXT.buyFor}${product.price} ${TEXT.rubleSign}`}
                    onPress={()=>{}}
                    buttonStyle={styles.button}
                />
            </View>
        </Fragment>
    );
});

export default ProductProfile;
