import React, {memo} from 'react';
import {
    View,
    StyleSheet,
} from 'react-native';
import {useSelector} from 'react-redux';

import {ColoredButton} from '../../elements';

import {TEXT, COLORS} from '../../constants';

import {getSelectedBasketProductsCount, getSelectedBasketProductsPrice, formatProductPrice} from '../../utils';

import {IState} from '../../store';
import {IShopInfoAndBasketProduct} from '../../store/basket/types/state';

interface IProps {
    selectedProductIdListMap: Record<number, number[]>;
}

const BuyOrSelectButton = memo((props: IProps) => {
    const {selectedProductIdListMap} = props;
    const basketProductList: IShopInfoAndBasketProduct[] = useSelector((stor: IState) => stor.basket.list);
    const isProductSelected: boolean = !!getSelectedBasketProductsCount(selectedProductIdListMap);
    const selectedProductsPrice: number = getSelectedBasketProductsPrice(selectedProductIdListMap, basketProductList);

    return (
        <View style={styles.buttonContainer}>
            <ColoredButton
                text={isProductSelected ? formatProductPrice(selectedProductsPrice) : TEXT.selectProduct}
                onPress={()=>{}}
                buttonStyle={isProductSelected ? styles.buttonSelected : styles.button}
                isDisabled={!isProductSelected}
            />
        </View>
    );
});

const styles = StyleSheet.create({
    buttonContainer: {
        height: 94,
        backgroundColor: COLORS.White,
        padding: 10,
    },
    buttonSelected: {
        marginBottom: 30,
    },
    button: {
        marginBottom: 30,
        backgroundColor: COLORS.Border,
    }
});

export default BuyOrSelectButton;
