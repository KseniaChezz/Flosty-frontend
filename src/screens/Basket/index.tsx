import React, {memo, useEffect, useState, Fragment} from 'react';
import Spinner from 'react-native-loading-spinner-overlay';
import {useDispatch, useSelector} from 'react-redux';

import {CommonScreenWrapper} from '../../elements';
import EmptyList from './EmptyList';
import BuyOrSelectButton from './BuyOrSelectButton';
import SelectAll from './SelectAll';
import ProductList from './ProductList';
import OrderWindow from './OrderWindow';

import {getBasketProducts} from '../../store/basket/thunks/getBasketProducts';

import {IState} from '../../store';
import {IShopInfoAndBasketProduct} from '../../store/basket/types/state';

import {getSelectedBasketProductsPrice} from '../../utils';

interface IProps {}

const Basket = memo((props:IProps) => {
    const basketProductList: IShopInfoAndBasketProduct[] = useSelector((store: IState) => store.basket.list);
    const isLoading: boolean = useSelector((store: IState) => store.basket.isListLoading);
    const [selectedProductIdListMap, setSelectedProductIdListMap] = useState<Record<number, number[]>>({});
    const [isOrderWindowVisible, setIsOrderWindowVisible] = useState<boolean>(false);
    const selectedProductsPrice: number = getSelectedBasketProductsPrice(selectedProductIdListMap, basketProductList);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getBasketProducts());
    }, []);

    const onBuyPress = () => {
        setIsOrderWindowVisible(true);
    };

    const hide = () => {
        setIsOrderWindowVisible(false);
    };

    const renderEmptyList = () => {
        return (
            <EmptyList />
        );
    };

    const renderProductList = () => {
        return (
            <Fragment>
                <SelectAll
                    selectedProductIdListMap={selectedProductIdListMap}
                    setSelectedProductIdListMap={setSelectedProductIdListMap}
                />

                <ProductList
                    selectedProductIdListMap={selectedProductIdListMap}
                    setSelectedProductIdListMap={setSelectedProductIdListMap}
                />

                <BuyOrSelectButton
                    selectedProductIdListMap={selectedProductIdListMap}
                    onPress={onBuyPress}
                />

                <OrderWindow
                    isWindowVisible={isOrderWindowVisible}
                    selectedProductsPrice={selectedProductsPrice}
                    selectedProductIdListMap={selectedProductIdListMap}
                    hide={hide}
                />
            </Fragment>
        );
    };

    return (
        <CommonScreenWrapper>
            <Spinner visible={isLoading} />

            {basketProductList.length === 0 ? renderEmptyList() : renderProductList()}
        </CommonScreenWrapper>
    )
});

export default Basket;
