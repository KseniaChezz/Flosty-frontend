import React, {memo, useState, useEffect, Fragment} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';

import {resetProductFilters} from '../store/products/actions';

import {TEXT, COLORS} from '../constants';

import {IProductFilter} from '../types/filter';
import {IState} from '../store';

interface IProps {
    isSelectedOneItem: boolean;
    onFilterPress: () => void;
    onOneItemPress: () => void;
    onTwoItemPress: () => void;
}

const FilterListRow = memo((props:IProps) => {
    const {
        isSelectedOneItem,
        onFilterPress,
        onOneItemPress,
        onTwoItemPress,
    } = props;
    const [filterCount, setFilterCount] = useState<number>(0);
    const filter: IProductFilter = useSelector((state: IState) => state.products.filter);
    const {
        sorting,
        category,
        season,
        maxPrice,
        minPrice,
    } = filter;
    const dispatch = useDispatch();

    useEffect(() => {
        let count: number = 0;

        if (maxPrice !== '' || minPrice !== '') count++;

        if (sorting !== TEXT.default) count++;

        if (category !== TEXT.allCategories) count++;

        if (season !== TEXT.allSeasons) count++;

        setFilterCount(count);
    }, [sorting, category, season, maxPrice, minPrice]);

    const onResetPress = () => {
        dispatch(resetProductFilters());
    };

    const renderFilterCountAndReset = () => {
        if (filterCount === 0) {
            return null;
        }

        return (
            <Fragment>
                <Text style={styles.filterCountText}>
                    {filterCount}
                </Text>

                <TouchableOpacity onPress={onResetPress}>
                    <Image
                        source={require('../../assets/images/cross_grey.png')}
                        style={styles.crossImg}
                    />
                </TouchableOpacity>
            </Fragment>
        );
    }

    const renderSortBottons = () => {
        const imgOneItem = isSelectedOneItem
            ? require('../../assets/images/sort1_select.png')
            : require('../../assets/images/sort1_default.png');
        const imgTwoItem = isSelectedOneItem
            ? require('../../assets/images/sort2_default.png')
            : require('../../assets/images/sort2_select.png');

        return (
            <Fragment>
                <TouchableOpacity onPress={onOneItemPress}>
                    <Image
                        source={imgOneItem}
                        style={styles.sortImg}
                    />
                </TouchableOpacity>

                <TouchableOpacity onPress={onTwoItemPress}>
                    <Image
                        source={imgTwoItem}
                        style={[styles.sortImg, styles.sortImg2]}
                    />
                </TouchableOpacity>
            </Fragment>
        );
    };

    return (
        <View style={styles.settingListContainer}>

            <View style={styles.filterContainer}>
                <TouchableOpacity
                    style={styles.filterContainer}
                    onPress={onFilterPress}
                >
                    <Text style={styles.filterText}>
                        {TEXT.filter}
                    </Text>
                    <Image
                        source={require('../../assets/images/filter.png')}
                        style={styles.filterImg}
                    />
                </TouchableOpacity>

                {renderFilterCountAndReset()}
            </View>

            <View style={styles.sortContainer}>

                {renderSortBottons()}

            </View>

        </View>
    );
});

export const styles = StyleSheet.create({
    settingListContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    filterContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    filterText: {
        fontFamily: 'Montserrat',
        fontSize: 14,
        lineHeight: 30,
        color: COLORS.DarkGrey,
        fontWeight: '500',
        marginRight: 10,
    },
    filterImg: {
        height: 35,
        width: 35,
    },
    sortImg: {
        height: 35,
        width: 35,
        marginHorizontal: 10,
    },
    sortImg2: {
        marginRight: 0,
    },
    crossImg: {
        height: 30,
        width: 30,
    },
    sortContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    filterCountText: {
        fontFamily: 'Montserrat',
        fontSize: 14,
        lineHeight: 30,
        color: COLORS.LightGrey,
        marginHorizontal: 10,
    }
});

export default FilterListRow;
