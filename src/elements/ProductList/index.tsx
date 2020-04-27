import React, {memo, useState, Fragment} from 'react';
import {View} from 'react-native';
import {useSelector} from 'react-redux';

import FilterListRow from '../FilterListRow';
import OneProductInRowList from './OneProductInRowList';
import TwoProductsInRowList from './TwoProductsInRowList';
import FilterWindow from './FilterWindow';

import {ShowShopProductListMode} from '../../enums';

import {IShopProduct} from '../../types/product';
import {IProductFilter} from '../../types/filter';
import {IState} from '../../store';
import { getFilteredProductList } from '../../utils';

interface IProps {
    productList: IShopProduct[];
}

const ProductList = memo((props:IProps) => {
    const {productList} = props;
    const filter: IProductFilter = useSelector((store: IState) => store.products.filter);
    const [productsInRowMode, setProductsInRowMode] = useState<ShowShopProductListMode>(ShowShopProductListMode.TWO_IN_ROW);
    const [isFilterWindowVisible, setIsFilterWindowVisible] = useState<boolean>(false);

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

    const renderOneProductInRowList = () => {
        return (
            <OneProductInRowList
                productList={getFilteredProductList(filter, productList)}
            />
        );
    };

    const renderTwoProductsInRowList = () => {
        return (
            <TwoProductsInRowList
                productList={getFilteredProductList(filter, productList)}
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
                        ? renderOneProductInRowList()
                        : renderTwoProductsInRowList()
                }
            </View>

            <FilterWindow
                isWindowVisible={isFilterWindowVisible}
                onShowPress={onShowPress}
            />
        </Fragment>
    );
});

export default ProductList;
