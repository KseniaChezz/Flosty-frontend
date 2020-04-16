import React, {useState, memo} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    StyleSheet,
} from 'react-native';
import PriceInput from '../../../elements/PriceInput';

import {
    setProductFilterMinPrice,
    setProductFilterMaxPrice,
} from '../../../store/shop/actions';

import {TEXT, COLORS, rootFilter} from '../../../constants';
import {IFilterItem, IFilterCheckBoxItem, IProductFilter, IProductFilterKey} from '../../../types/filter';
import {IState} from '../../../store';
import { isStringWithNumbers } from '../../../utils';

interface IProps {}

const PriceFilterItem = memo((props: IProps) => {
    const filter: IProductFilter = useSelector((state: IState) => state.shop.filter);
    const {
        maxPrice,
        minPrice,
    } = filter;
    const dispatch = useDispatch();

    const onMinPriceValueChange = (value: string) => {
        if (isStringWithNumbers(value)) {
            dispatch(setProductFilterMinPrice(value));
        }

    };

    const onMaxPriceValueChange = (value: string) => {
        if (isStringWithNumbers(value)) {
            dispatch(setProductFilterMaxPrice(value));
        }
    };

    return (
        <View style={styles.itemContainer}>
            <View style={styles.itemInnerContainer}>

                <Text style={[styles.text, styles.titleText]}>
                    {TEXT.price}
                </Text>

                <View style={styles.inputContainer}>
                    <PriceInput
                        text={TEXT.from}
                        value={minPrice}
                        onChangeValue={onMinPriceValueChange}
                        style={styles.marginRight10}
                    />

                    <PriceInput
                        text={TEXT.till}
                        value={maxPrice}
                        onChangeValue={onMaxPriceValueChange}
                    />
                </View>

            </View>
        </View>
    );
});

const styles = StyleSheet.create({
    itemContainer: {
        paddingHorizontal: 8,
    },
    itemInnerContainer: {
        borderBottomColor: COLORS.Border,
        borderBottomWidth: 1,
        paddingVertical: 11,
        paddingHorizontal: 4,
    },
    text: {
        fontFamily: 'Montserrat',
    },
    titleText: {
        color: COLORS.DarkGrey,
        fontSize: 14,
        lineHeight: 18,
        marginBottom: 11,
    },
    inputContainer: {
        flexDirection: 'row',
    },
    marginRight10: {
        marginRight: 10,
    },
});

export default PriceFilterItem;
