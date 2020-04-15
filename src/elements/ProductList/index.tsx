import React, {memo, useState, Fragment} from 'react';
import {View} from 'react-native';

import FilterListRow from '../FilterListRow';
import OneProductInRowList from './OneProductInRowList';
import TwoProductsInRowList from './TwoProductsInRowList';
import FilterWindow from './FilterWindow';

import {ShowShopProductListMode} from '../../enums';
import { TEXT } from '../../constants';

import {IProduct} from '../../types/product';

interface IProps {
    productList: IProduct[];
}

const ProductList = memo((props:IProps) => {
    const {productList} = props;
    const [productsInRowMode, setProductsInRowMode] = useState<ShowShopProductListMode>(ShowShopProductListMode.TWO_IN_ROW);
    const [isFilterWindowVisible, setIsFilterWindowVisible] = useState<boolean>(false);
    const [sortingFilter, setSortingFilter] = useState<string>(TEXT.default);

    const onOneItemPress = () => {
        setProductsInRowMode(ShowShopProductListMode.ONE_IN_ROW);
    };

    const onTwoItemPress = () => {
        setProductsInRowMode(ShowShopProductListMode.TWO_IN_ROW);
    };

    const onFilterPress = () => {
        setIsFilterWindowVisible(true);
    };

    const onShowPress = () => {
        setIsFilterWindowVisible(false);
    }

    const renderOneProductInRowList = (productList: IProduct[]) => {
        return (
            <OneProductInRowList
                productList={productList}
            />
        );
    };

    const renderTwoProductsInRowList = (productList: IProduct[]) => {
        return (
            <TwoProductsInRowList
                productList={productList}
            />
        );
    }

    return (
        <Fragment>
            <FilterListRow
                isSelectedOneItem={productsInRowMode === ShowShopProductListMode.ONE_IN_ROW}
                onFilterPress={onFilterPress}
                onOneItemPress={onOneItemPress}
                onTwoItemPress={onTwoItemPress}
            />

            <View>
                {
                    productsInRowMode === ShowShopProductListMode.ONE_IN_ROW
                        ? renderOneProductInRowList(productList)
                        : renderTwoProductsInRowList(productList)
                }
            </View>

            <FilterWindow
                isWindowVisible={isFilterWindowVisible}
                onShowPress={onShowPress}
                sortingFilterValue={sortingFilter}
                onSortingFilterChange={setSortingFilter}
            />
        </Fragment>
    );
});

export default ProductList;
