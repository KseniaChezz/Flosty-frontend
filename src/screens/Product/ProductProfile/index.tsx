import React from 'react';
import {memo, useState} from 'react';
import {View, Text, Image, TouchableOpacity, ScrollView} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useSelector} from 'react-redux';

import {styles} from './style';

import MainProductSection from './MainProductSection';
import TagListSection from './TagListSection';
import {

} from '../../../elements';

import {IRootNavigatorParamList} from '../../../types/rootNavigator';
import {IUserProfileItem} from '../../../types/user';
import { IState } from '../../../store';
import {IProductDetail} from '../../../types/product';

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
}

interface IProps {
    navigation: ScreenNavigationProp;
}

const ProductProfile = memo((props: IProps) => {
    const {navigation} = props;

    return (
        <ScrollView>
            <MainProductSection
                product={product}
            />

            <TagListSection
                tagList={product.tags}
            />


        </ScrollView>

    );
});

export default ProductProfile;
