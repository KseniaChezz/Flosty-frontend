import React, {useState, memo} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
    View,
    StyleSheet,
} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';

import HeaderWithBackButton from '../../HeaderWithBackButton';
import FilterCheckBoxItem from './FilterCheckBoxItem';

import {setProductFilterCheckBox} from '../../../store/products/actions';

import {TEXT, COLORS, sortingFilter} from '../../../constants';
import {FilterNavigatorRoutes} from '../../../enums';

import {IFilterCheckBoxItem, IProductFilter, IProductFilterKey} from '../../../types/filter';
import {IFilterNavigatorParamList} from '../../../types/filterNavigator';
import {IState} from '../../../store/index';

type ScreenNavigationProp = StackNavigationProp<IFilterNavigatorParamList, FilterNavigatorRoutes.FILTER_ITEM_SCREEN>;
type ScreenRouteProp = RouteProp<IFilterNavigatorParamList, FilterNavigatorRoutes.FILTER_ITEM_SCREEN>;

interface IProps {
    navigation: ScreenNavigationProp;
    route: ScreenRouteProp;
}

const FilterItemScreen = memo((props: IProps) => {
    const {
        navigation,
        route: {
            params: {
                title,
                filterCheckBoxItemList,
                filterName,
            },
        },
    } = props;
    const filter: IProductFilter = useSelector((state: IState) => state.products.filter);
    const dispatch = useDispatch();

    const onCheckBoxPress = (value: string) => {
        return () => dispatch(setProductFilterCheckBox(filterName, value));
    };

    const onBackPress = () => {
        navigation.goBack();
    };

    const onFilterItemWithAdditionalfilterPress = (
        value: string,
        additionalFilter: IFilterCheckBoxItem[],
        filterName: IProductFilterKey,
     ) => {
        return () => {
            dispatch(setProductFilterCheckBox(filterName, additionalFilter[0].value));

            navigation.navigate(
                FilterNavigatorRoutes.DETAIL_FILTER_ITEM_SCREEN,
                {title: value, filterCheckBoxItemList: additionalFilter, filterName},
            );
        }
    }

    return (
        <View style={styles.container}>

            <HeaderWithBackButton
                text={title}
                noShadow={true}
                onBackPress={onBackPress}
                center={true}
            />

            {filterCheckBoxItemList.map((item: IFilterCheckBoxItem) => {
                const {value, additionalFilter} = item;
                const isSelected: boolean = value === filter[filterName];
                const onPress = additionalFilter
                    ? onFilterItemWithAdditionalfilterPress (value, additionalFilter, filterName)
                    : onCheckBoxPress(value);

                return (
                    <FilterCheckBoxItem
                        key={value}
                        text={value}
                        isSelected={isSelected}
                        hasAdditionalFilter={!!additionalFilter}
                        onPress={onPress}
                    />
                )
            })}

        </View>
    );
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.White,
    },
});

export default FilterItemScreen;
