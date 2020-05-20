import React, {memo, Fragment, useState, SetStateAction, Dispatch} from 'react';
import {
    Text,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';

import {RowWithCheckbox} from '../../elements';

import {deleteAllProducts, deleteProducts} from '../../store/basket/thunks/deleteProducts';

import {IShopInfoAndBasketProduct} from '../../store/basket/types/state';
import {IState} from '../../store';

import {TEXT, COLORS} from '../../constants';

import {getTotalBasketProductsCount, getSelectedBasketProductsCount, selectAllBasketProducts} from '../../utils';

interface IProps {
    selectedProductIdListMap: Record<number, number[]>;
    setSelectedProductIdListMap: Dispatch<SetStateAction<Record<number, number[]>>>;
}

const SelectAll = memo((props: IProps) => {
    const {selectedProductIdListMap, setSelectedProductIdListMap} = props;
    const basketProductList: IShopInfoAndBasketProduct[] = useSelector((stor: IState) => stor.basket.list);
    const [isAllSelected, setIsAllSelected] = useState<boolean>(false);
    const dispatch = useDispatch();

    const onUnselectAllProductsPress = () => {
        setSelectedProductIdListMap({});
        setIsAllSelected(false);
    };

    const onSelectAllProductsPress = () => {
        selectAllBasketProducts(basketProductList, setSelectedProductIdListMap);
        setIsAllSelected(true);
    };

    const onDeleteSelectedPress = () => {
        if (isAllSelected) {
            dispatch(deleteAllProducts());
        } else {
            dispatch(deleteProducts(selectedProductIdListMap));
        }
    };

    const renderDeleteSelected = () => {
        const count: number = getSelectedBasketProductsCount(selectedProductIdListMap);

        if (!count) return null;

        return (
            <TouchableOpacity
                style={styles.rightContainer}
                onPress={onDeleteSelectedPress}
            >
                <Text style={[styles.text, styles.redText]}>
                    {TEXT.deleteSelected} ( {count} )
                </Text>
            </TouchableOpacity>
        )
    };

    const renderText = () => {
        return (
            <Text style={[styles.text, styles.count]}>{TEXT.selectAll}</Text>
        );
    };

    return (
        <Fragment>
            <Text style={[styles.text, styles.basketTitle]}>
                {TEXT.basket} <Text style={styles.count}> {getTotalBasketProductsCount(basketProductList)}</Text>
            </Text>

            <RowWithCheckbox
                leftContent={renderText}
                isSelected={isAllSelected}
                onCheckboxPress={isAllSelected ? onUnselectAllProductsPress : onSelectAllProductsPress}
                rightContent={renderDeleteSelected}
            />
        </Fragment>
    );
});

const styles = StyleSheet.create({
    rightContainer: {
        flexDirection: 'row',
        height: 44,
        alignItems: 'center',
    },
    text: {
        fontFamily: 'Montserrat',
        color: COLORS.DarkGrey,
    },
    basketTitle: {
        fontSize: 18,
        lineHeight: 60,
        fontWeight: '600',
        paddingLeft: 12,
    },
    count: {
        fontSize: 14,
        lineHeight: 18,
        fontWeight: '400',
    },
    redText: {
        color: COLORS.Red,
    },
});

export default SelectAll;
