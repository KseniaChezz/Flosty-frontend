import React, {memo, useState} from 'react';
import {View, Text, Image, ScrollView} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import {StackNavigationProp} from '@react-navigation/stack/lib/typescript/src/types';
import {useSelector, useDispatch} from 'react-redux';

import {styles} from './style';

import {
    CommonScreenWrapper,
    SearchInput,
} from '../../../elements';
import SearchCardList from './SearchCardList';
import TwoProductsInRowList from '../../../elements/ProductList/TwoProductsInRowList';

import {searchProducts} from '../../../store/products/thunks/searchProducts';

import {ISearchNavigatorParamList} from '../../../types/searchNavigator';
import {ISearchCard} from '../../../types/search';
import {IShopProduct} from '../../../types/product';
import {IState} from '../../../store';

import {SearchNavigatorRoutes} from '../../../enums';
import {TEXT} from '../../../constants';

type ScreenNavigationProp = StackNavigationProp<ISearchNavigatorParamList, SearchNavigatorRoutes.SEARCH_ROOT_SCREEN>;

interface IProps {
    navigation: ScreenNavigationProp;
}

const SearchRootScreen = memo((props:IProps) => {
    const {navigation} = props;
    const [searchText, setSearchText] = useState<string>('');
    const productList: IShopProduct[] = useSelector((store: IState) => store.products.popularProductList);
    const isLoading: boolean = useSelector((store: IState) => store.products.isLoading);
    const [productListToRender, setProductListToRender] = useState<IShopProduct[]>(productList);
    const dispatch = useDispatch();

    const onSearchPress = () => {
        if (!searchText) return;

        dispatch(searchProducts(searchText, setProductListToRender));
    };

    const search = (text: string) => {
        setSearchText(text);
        dispatch(searchProducts(text, setProductListToRender));
    };

    const onCleanPress = () => {
        setProductListToRender(productList);
    };

    const onCardPress = (card: ISearchCard) => {
        const {title, additionalMenu} = card;

        if (additionalMenu) {
            return () => {
                navigation.navigate(
                    SearchNavigatorRoutes.SEARCH_MENU_SCREEN,
                    {title, search, menuList: additionalMenu},
                );
            }
        }

        return () => {
            search(title);
        };
    };

    const renderEmptyList = () => {
        return (
            <View>
                <Text style={styles.emptyText}>
                    {TEXT.emptySearchList}
                </Text>
            </View>
        );
    };

    const renderProductList = () => {
        return (
            <View style={styles.productListContainer}>
                <TwoProductsInRowList
                    productList={productListToRender}
                />
            </View>
        );
    };

    return (
        <CommonScreenWrapper style={styles.container}>
            <SearchInput
                text={searchText}
                onPress={onSearchPress}
                onCleanPress={onCleanPress}
                onTextChange={setSearchText}
                style={styles.marginTop15}
            />

            <ScrollView showsVerticalScrollIndicator={false}>

                <SearchCardList
                    onCardPress={onCardPress}
                />

                {productListToRender.length === 0 ? renderEmptyList() : renderProductList()}
            </ScrollView>

            <Spinner visible={isLoading} />
        </CommonScreenWrapper>
    );
});

export default SearchRootScreen;
