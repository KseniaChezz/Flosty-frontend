import React, {memo, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import {useSelector, useDispatch} from 'react-redux';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';

import Shop from './Shop';
import {ScreenWrapperWithBackButton} from '../../elements';

import {getShop} from '../../store/shop/thunks/getShop';
import {getShopProducts} from '../../store/products/thunks/getShopProducts';
import {resetProductFilters} from '../../store/products/actions';

import {IRootNavigatorParamList} from '../../types/rootNavigator';
import {IState} from '../../store';
import {IShop} from '../../types/shop';

import {TEXT} from '../../constants';
import {RootNavigatorRoutes} from '../../enums';

type ScreenNavigationProp = StackNavigationProp<IRootNavigatorParamList, RootNavigatorRoutes.SHOP_PROFILE>;
type ScreenRouteProp = RouteProp<IRootNavigatorParamList, RootNavigatorRoutes.SHOP_PROFILE>;

interface IProps {
    navigation: ScreenNavigationProp;
    route: ScreenRouteProp;
}

const ShopProfile = memo((props:IProps) => {
    const {
        navigation,
        route: {
            params: {
                id,
            },
        },
    } = props;
    const shop: IShop | undefined = useSelector((stor: IState) => stor.shop.map[id]);
    const isShopLoading: boolean = useSelector((stor: IState) => stor.shop.isLoading);
    const isProductListLoading: boolean = useSelector((stor: IState) => stor.products.isLoading);
    const isSubscriptionDataProcessing: boolean = useSelector(
        (stor: IState) => stor.subscriptionList.dataIsProcessing);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!shop) {
            dispatch(getShop(id));
        }

        dispatch(getShopProducts(id));
    }, []);

    const onBackPress = () => {
        navigation.goBack();
        dispatch(resetProductFilters());
    };

    const renderShop = () => {
        if (!shop) return null;

        return (
            <Shop shop={shop} />
        );
    }

    return (
        <ScreenWrapperWithBackButton
            text={TEXT.shopWithCapital}
            onBackPress={onBackPress}
            style={styles.container}
        >
            <Spinner visible={isProductListLoading || isShopLoading || isSubscriptionDataProcessing} />

            {renderShop()}
        </ScreenWrapperWithBackButton>
    );
});

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 8,
    },
});

export default ShopProfile;
