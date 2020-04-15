import React, {memo, useState, useEffect, Fragment} from 'react';
import {View, StyleSheet} from 'react-native';

import ProductCardSmall from '../ProductCardSmall';

import {IProduct} from '../../types/product';

interface IProps {
    productList: IProduct[];
}

const ProductList = memo((props:IProps) => {
    const {productList} = props;
    const [leftRow, setLeftRow] = useState<IProduct[]>([])
    const [rightRow, setRightRow] = useState<IProduct[]>([])

    useEffect(() => {
        const leftRow: IProduct[] = [];
        const rightRow: IProduct[] = [];

        productList.forEach((product: IProduct, index: number) => {
            if (index % 2 === 0) {
                leftRow.push(product);
            } else {
                rightRow.push(product);
            }
        });

        setLeftRow(leftRow);
        setRightRow(rightRow);
    }, [productList]);

    return (
        <Fragment>
            <View style={styles.productContainer}>
                <View style={[styles.rowContainer, styles.marginRight10]}>
                    {leftRow.map((item: IProduct, index: number) => {
                        return (
                            <ProductCardSmall
                                key={index}
                                product={item}
                                onProductPress={() => {}}
                            />
                        )
                    })}
                </View>

                <View style={styles.rowContainer}>
                    {rightRow.map((item: IProduct, index: number) => {
                        return (
                            <ProductCardSmall
                                key={index}
                                product={item}
                                onProductPress={() => {}}
                            />
                        )
                    })}
                </View>
            </View>
        </Fragment>
    );
});

const styles = StyleSheet.create({
    productContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    rowContainer: {
        flex: 1,
    },
    marginRight10: {
        marginRight: 10,
    },
});

export default ProductList;
