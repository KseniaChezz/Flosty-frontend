import React, {memo, useState} from 'react';
import {View, Text, Image, ScrollView} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';

import {styles} from './style';

import {
    CommonScreenWrapper,
    SearchInput,
} from '../../../elements';
import SearchCardList from './SearchCardList';
import TwoProductsInRowList from '../../../elements/ProductList/TwoProductsInRowList';

import {ISearchNavigatorParamList} from '../../../types/searchNavigator';
import {ISearchCard} from '../../../types/search';

import {SearchNavigatorRoutes} from '../../../enums';
import {productList} from '../../../constants/product_temp';

type ScreenNavigationProp = StackNavigationProp<ISearchNavigatorParamList, SearchNavigatorRoutes.SEARCH_ROOT_SCREEN>;

interface IProps {
    navigation: ScreenNavigationProp;
}

const SearchRootScreen = memo((props:IProps) => {
    const {navigation} = props;
    const [searchText, setSearchText] = useState<string>('');

    const onCardPress = (card: ISearchCard) => {
        const {title, additionalMenu} = card;

        if (additionalMenu) {
            return () => {
                navigation.navigate(
                    SearchNavigatorRoutes.SEARCH_MENU_SCREEN,
                    {title, setSearchText, menuList: additionalMenu},
                );
            }
        }

        return () => {
            setSearchText(title);
        };
    };

    return (
        <CommonScreenWrapper style={styles.container}>
            <ScrollView>
                <SearchInput
                    text={searchText}
                    onTextChange={setSearchText}
                    style={styles.marginTop15}
                />

                <SearchCardList
                    onCardPress={onCardPress}
                />

                <TwoProductsInRowList
                    productList={productList}
                />
            </ScrollView>
        </CommonScreenWrapper>
    );
});

export default SearchRootScreen;
