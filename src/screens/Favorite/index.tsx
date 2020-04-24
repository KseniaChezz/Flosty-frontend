import React, {memo, useState} from 'react';
import {View, Text, ScrollView, StyleSheet} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';

import {
    CommonScreenWrapper,
} from '../../elements';
import TwoProductsInRowList from '../../elements/ProductList/TwoProductsInRowList';

import {IRootNavigatorParamList} from '../../types/rootNavigator';
import {IShopProduct} from '../../types/product';

import {RootNavigatorRoutes} from '../../enums';
import {TEXT, COLORS} from '../../constants';

type ScreenNavigationProp = StackNavigationProp<IRootNavigatorParamList, RootNavigatorRoutes.FAVORITE>;

interface IProps {
    navigation: ScreenNavigationProp;
}

const Favorite = memo((props:IProps) => {
    const {navigation} = props;
    const productList: IShopProduct[] = [];
    const productListLength: number = productList.length;

    const renderEmptyList = () => {
        return (
            <View style={styles.emptyContainer}>
                <Text style={[styles.text, styles.greyText, styles.textCenter]}>
                    {TEXT.emptyFavoriteList}
                </Text>
            </View>
        );
    };

    const renderProductList = () => {
        return (
            <ScrollView>
                <View style={styles.textContainer}>
                    <Text style={[styles.text, styles.titleText]}>
                        {TEXT.favorite}
                    </Text>

                    <Text style={[styles.text, styles.greyText, styles.marginLeft15]}>
                        {productListLength}
                    </Text>
                </View>

                <TwoProductsInRowList
                    productList={productList}
                />
            </ScrollView>
        );
    };

    return (
        <CommonScreenWrapper>
            {productListLength === 0 ? renderEmptyList() : renderProductList()}
        </CommonScreenWrapper>
    );
});

const styles = StyleSheet.create({
    textContainer: {
        flexDirection: 'row',
        marginTop: 18,
        marginBottom: 10,
        marginLeft: 12,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 30,
        paddingBottom: 50,
    },
    titleText: {
        color: COLORS.DarkGrey,
        fontSize: 18,
        fontWeight: '600',
    },
    text: {
        fontFamily: 'Montserrat',
        lineHeight: 22,
    },
    greyText: {
        color: COLORS.LightGrey,
        fontSize: 14,
        fontWeight: '400',
    },
    marginLeft15: {
        marginLeft: 15,
    },
    textCenter: {
        textAlign: 'center',
    },
});

export default Favorite;
