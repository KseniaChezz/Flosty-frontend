import React, {useState, memo} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    StyleSheet,
} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';

import Title from '../../Title';
import FilterItem from './FilterItem';
import PriceFilterItem from './PriceFilterItem';

import {
    setProductFilterCheckBox,
} from '../../../store/shop/actions';

import {TEXT, COLORS, rootFilter} from '../../../constants';
import {FilterNavigatorRoutes} from '../../../enums';

import {IFilterNavigatorParamList} from '../../../types/filterNavigator';
import {IFilterItem, IFilterCheckBoxItem, IProductFilter, IProductFilterKey} from '../../../types/filter';
import {IState} from '../../../store';

type ScreenNavigationProp = StackNavigationProp<IFilterNavigatorParamList, FilterNavigatorRoutes.ROOT_FILTER_SCREEN>;

interface IProps {
    navigation: ScreenNavigationProp;
}

const FilterWindow = memo((props: IProps) => {
    const {navigation} = props;
    const filter: IProductFilter = useSelector((state: IState) => state.shop.filter);
    const dispatch = useDispatch();

    const onItemPress = (filterItem: IFilterItem) => {
        const {value, additionalFilter, filterName} = filterItem;

        return () => navigation.navigate(
            FilterNavigatorRoutes.FILTER_ITEM_SCREEN,
            {title: value, filterCheckBoxItemList: additionalFilter, filterName},
        );
    };

    const onFilterCancelPress = (filterName: IProductFilterKey, value: string) => {
        return () => dispatch(setProductFilterCheckBox(filterName, value));
    };

    const renderFilterItem = (indexStart: number, itemsNumber: number) => {
        return rootFilter.slice(indexStart, indexStart + itemsNumber).map((item: IFilterItem) => {
            const {value, additionalFilter, filterName} = item;
            const checkBoxValue: string = filter[filterName];
            const isDefault: boolean = additionalFilter[0].value === filter[filterName];
            const onPress = isDefault
                ? onItemPress(item)
                : onFilterCancelPress(filterName, additionalFilter[0].value);

            return (
                <FilterItem
                    key={value}
                    title={value}
                    value={checkBoxValue}
                    isDefault={isDefault}
                    onPress={onPress}
                />
            )
        })
    };

    return (
        <View style={styles.container}>
            <Title
                text={TEXT.filters}
                textStyle={styles.title}
            />

            {renderFilterItem(0, 1)}

            <PriceFilterItem/>

            {renderFilterItem(1, 2)}

        </View>
    );
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.White,
    },
    title: {
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        fontSize: 18,
        lineHeight: 22,
        marginTop: 35,
        marginBottom: 15,
    },
});

export default FilterWindow;
