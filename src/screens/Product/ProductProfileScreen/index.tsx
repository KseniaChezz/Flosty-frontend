import React from 'react';
import {memo, useState, useEffect, Fragment} from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';

import {styles} from './style';

import MainProductSection from './MainProductSection';
import TagListSection from './TagListSection';
import ProductPropertyPicker from './ProductPropertyPicker';
import ShopSection from './ShopSection';
import DeliveryAndGuaranteeSection from './DeliveryAndGuaranteeSection';
import {ColoredButton} from '../../../elements';

import {getDetailProduct} from '../../../store/products/thunks/getProductDetail';
import {getShop} from '../../../store/shop/thunks/getShop';

import {IProductNavigatorParamList} from '../../../types/productNavigator';
import {IState} from '../../../store';
import {IDetailProduct, IProductProperty} from '../../../types/product';
import {IShop} from '../../../types/shop';

import {TEXT} from '../../../constants';
import {ProductNavigatorRoutes, RootNavigatorRoutes} from '../../../enums';

type ScreenNavigationProp = StackNavigationProp<IProductNavigatorParamList, ProductNavigatorRoutes.PRODUCT_PROFILE_SCREEN>;
type ScreenRouteProp = RouteProp<IProductNavigatorParamList, ProductNavigatorRoutes.PRODUCT_PROFILE_SCREEN>;

interface IProps {
    navigation: ScreenNavigationProp;
    route: ScreenRouteProp;
}

const ProductProfile = memo((props: IProps) => {
    const {
        navigation,
        route: {
            params: {
                shopId,
                productId,
            },
        },
    } = props;
    const [productSize, setProductSize] = useState<IProductProperty | undefined>();
    const [productColor, setProductColor] = useState<IProductProperty | undefined>();
    const product: IDetailProduct | undefined = useSelector((stor: IState) => stor.products.productMap[productId]);
    const shop: IShop | undefined = useSelector((stor: IState) => stor.shop.map[shopId]);
    const isProductLoading: boolean = useSelector((stor: IState) => stor.products.isLoading);
    const isShopLoading: boolean = useSelector((stor: IState) => stor.shop.isLoading);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!shop) {
            dispatch(getShop(shopId));
        }

        if (!product) {
            dispatch(getDetailProduct(shopId, productId));
        }
    }, [])

    const onDescriptionPress = () => {
        if (!product) return;

        navigation.navigate(ProductNavigatorRoutes.DESCRIPTION_SCREEN, {characteristic: product.characteristic});
    };

    const onGuaranteePress = () => {
        navigation.navigate(ProductNavigatorRoutes.GUARANTEE_SCREEN);
    };

    const renderProduct = () => {
        if (!product) return null;

        const {
            tagList,
            colorList,
            sizeList,
            characteristic,
        } = product;

        return (
            <Fragment>
                <View style={styles.container}>
                    <ScrollView>
                        <MainProductSection
                            product={product}
                        />

                        <TagListSection
                            tagList={tagList}
                        />

                        <ProductPropertyPicker
                            colorList={colorList}
                            selectedColor={productColor}
                            setSelectedColor={setProductColor}
                            sizeList={sizeList}
                            selectedSize={productSize}
                            setSelectedSize={setProductSize}
                            characteristic={characteristic}
                            onDescriptionPress={onDescriptionPress}
                        />

                        {!!shop && <ShopSection shop={shop} />}

                        <DeliveryAndGuaranteeSection
                            // price={product.delivery.price}
                            // time={product.delivery.time}
                            onGuaranteePress={onGuaranteePress}
                        />

                    </ScrollView>
                </View>

                <View style={styles.buttonContainer}>
                    <ColoredButton
                        text={`${TEXT.buyFor}${product.price} ${TEXT.rubleSign}`}
                        onPress={()=>{}}
                        buttonStyle={styles.button}
                    />
                </View>
            </Fragment>
        );
    };

    return (
        <Fragment>
            <Spinner visible={isProductLoading || isShopLoading} />
            {renderProduct()}
        </Fragment>
    );
});

export default ProductProfile;
