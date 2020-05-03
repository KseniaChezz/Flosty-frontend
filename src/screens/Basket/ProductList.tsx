import React, {memo, SetStateAction, Dispatch} from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import {useSelector} from 'react-redux';

import {RowWithCheckbox} from '../../elements';
import Product from './Product';
import SendMessage from './SendMessage';

import {IState} from '../../store';
import {IShopInfoAndBasketProduct} from '../../store/basket/types/state';
import {IBasketProduct} from '../../types/basket';

import {
    isShopSelected,
    unSelectAllShopBasketProducts,
    selectAllShopBasketProducts,
    navigate,
} from '../../utils';

import {TEXT, COLORS} from '../../constants';
import {RootNavigatorRoutes} from '../../enums';

interface IProps {
    selectedProductIdListMap: Record<number, number[]>;
    setSelectedProductIdListMap: Dispatch<SetStateAction<Record<number, number[]>>>;
}

const ProductList = memo((props: IProps) => {
    const {selectedProductIdListMap, setSelectedProductIdListMap} = props;
    const basketProductList: IShopInfoAndBasketProduct[] = useSelector((stor: IState) => stor.basket.list);

    const onUnselectProductPress = (shopId: number) => {
        return () => {
            unSelectAllShopBasketProducts(shopId, setSelectedProductIdListMap);
        }
    };

    const onSelectProductPress = (shopId: number) => {
        return () => {
            selectAllShopBasketProducts(shopId, basketProductList, setSelectedProductIdListMap);
        }
    };

    const onShopNamePress = (shopId: number) => {
        return () => navigate(RootNavigatorRoutes.SHOP_PROFILE, {id: shopId});
    };

    const renderSendMessage = (shopId: number, shopName: string, shopLogo: string) => {
        return () => {
            return (
                <SendMessage
                    shopId={shopId}
                    shopName={shopName}
                    shopLogo={shopLogo}
                />
            )
        }
    };

    const renderShopName = (shopId: number, shopName: string) => {
        return () => {
            return (
                <TouchableOpacity onPress={onShopNamePress(shopId)}>
                    <Text style={[styles.text, styles.shopText]}>{shopName}</Text>
                </TouchableOpacity>
            )
        }
    };

    return (
        <View style={styles.productList}>
            <ScrollView>
                {basketProductList.map((item: IShopInfoAndBasketProduct) => {
                    const {id, shopName, shopLogo, productList} = item;
                    const isSelected: boolean = isShopSelected(id, selectedProductIdListMap, basketProductList);
                    const onProductPress = isSelected ? onUnselectProductPress(id) : onSelectProductPress(id);

                    return (
                        <View key={id} style={styles.container}>
                            <RowWithCheckbox
                                leftContent={renderShopName(id, shopName)}
                                isSelected={isSelected}
                                isBorder={true}
                                onCheckboxPress={onProductPress}
                                rightContent={renderSendMessage(id, shopName, shopLogo)}
                            />

                            {productList.map((product: IBasketProduct) => {
                                return (
                                    <Product
                                        product={product}
                                        shopId={id}
                                        selectedProductIdListMap={selectedProductIdListMap}
                                        setSelectedProductIdListMap={setSelectedProductIdListMap}
                                    />
                                );
                            })}
                        </View>
                    )
                })}
            </ScrollView>
        </View>
    );
});

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.White,
        marginBottom: 10,
    },
    productList: {
        flex: 1,
    },
    shopText: {
        color: COLORS.BrightBlue,
        fontWeight: '600',
        fontSize: 14,
        lineHeight: 18,
    },
    text: {
        fontFamily: 'Montserrat',
        color: COLORS.DarkGrey,
    },
});

export default ProductList;
