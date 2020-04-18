import React from 'react';
import {memo, useState} from 'react';
import {View, Text, Image, TouchableOpacity, ScrollView} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useSelector} from 'react-redux';

import {styles} from './style';

import MainProductSection from './MainProductSection';
import TagListSection from './TagListSection';
import ProductPropertyPicker from './ProductPropertyPicker';
import ShopSection from './ShopSection';

import {IRootNavigatorParamList} from '../../../types/rootNavigator';
import {IUserProfileItem} from '../../../types/user';
import { IState } from '../../../store';
import {IProductDetail, IProductProperty} from '../../../types/product';

import {
    TEXT,
} from '../../../constants';
import {RootNavigatorRoutes} from '../../../enums';

type ScreenNavigationProp = StackNavigationProp<IRootNavigatorParamList, RootNavigatorRoutes.PRODUCT_PROFILE>;

const product: IProductDetail = {
    title: 'Сапоги Red. Раскрасим зиму яркими красками?!',
    description: 'Фирменая модель от Az-ART красивая необычная обувь для девушек! Удобная колодка со шнурками, которые можно не расшнуривать!',
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
}

interface IProps {
    navigation: ScreenNavigationProp;
}

const ProductProfile = memo((props: IProps) => {
    const {navigation} = props;
    const [productSize, setProductSize] = useState<string>('');
    const [productColor, setProductColor] = useState<string>('');

    return (
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
            />

            <ShopSection
                shop={product.shop}
            />
        </ScrollView>

    );
});

export default ProductProfile;
