import React from 'react';
import {memo, useState, useEffect, Fragment} from 'react';
import {
    View,
    ScrollView,
    SafeAreaView,
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import {StackNavigationProp} from '@react-navigation/stack/lib/typescript/src/types';
import {RouteProp} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';

import {styles} from './style';

import MainProductSection from './MainProductSection';
import TagListSection from './TagListSection';
import ProductPropertyPicker from './ProductPropertyPicker';
import ShopSection from './ShopSection';
import DeliveryAndGuaranteeSection from './DeliveryAndGuaranteeSection';
import {ColoredButton, ModalInfoWindow} from '../../../elements';

import {getDetailProduct} from '../../../store/products/thunks/getProductDetail';
import {getShop} from '../../../store/shop/thunks/getShop';
import {putProductToBasket} from '../../../store/basket/thunks/putProductToBasket';

import {IProductNavigatorParamList} from '../../../types/productNavigator';
import {IState} from '../../../store';
import {IDetailProduct, IProductProperty} from '../../../types/product';
import {IShop} from '../../../types/shop';

import {TEXT} from '../../../constants';
import {ProductNavigatorRoutes, RootNavigatorRoutes} from '../../../enums';

import {formatProductPrice} from '../../../utils';

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
    const [isProductAddedInBusketWindowShown, setIsProductAddedInBusketShown] = useState<boolean>(false);
    const [isNotSizeOrColorSelectedWindowShown, setIsNotSizeOrColorSelectedWindowShown] = useState<boolean>(false);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!shop) {
            dispatch(getShop(shopId));
        }

        if (!product) {
            dispatch(getDetailProduct(shopId, productId));
        }
    }, []);

    const onAddProductWindowPress = () => {
        setIsProductAddedInBusketShown(false);
    };

    const onIsNotSizeOrColorWindowPress = () => {
        setIsNotSizeOrColorSelectedWindowShown(false);
    };

    const onDescriptionPress = () => {
        if (!product) return;

        navigation.navigate(ProductNavigatorRoutes.DESCRIPTION_SCREEN, {characteristic: product.characteristic});
    };

    const onGuaranteePress = () => {
        navigation.navigate(ProductNavigatorRoutes.GUARANTEE_SCREEN);
    };

    const onBuyPress = () => {
        if (!product) return;

        const {
            colorList,
            sizeList,
        } = product;

        if ((!!colorList && colorList.length !== 0 && !productColor)
            || (!!sizeList && sizeList.length !== 0 && !productSize)) {
            setIsNotSizeOrColorSelectedWindowShown(true);
            return;
        }

        dispatch(putProductToBasket(
            product.id,
            productColor?.value,
            productSize?.value,
            () => setIsProductAddedInBusketShown(true),
        ));
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
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <MainProductSection
                            product={product}
                        />

                        {tagList && <TagListSection tagList={tagList} />}

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
                        text={`${TEXT.buyFor}${formatProductPrice(product.price)}`}
                        onPress={onBuyPress}
                    />
                </View>
            </Fragment>
        );
    };

    return (
        <Fragment>
            <SafeAreaView style={styles.safeTop}>
                <Spinner visible={isProductLoading || isShopLoading} />

                {renderProduct()}

                <ModalInfoWindow
                    isWindowVisible={isProductAddedInBusketWindowShown}
                    text={TEXT.productAdded}
                    onPress={onAddProductWindowPress}
                />

                <ModalInfoWindow
                    isWindowVisible={isNotSizeOrColorSelectedWindowShown}
                    text={productColor ? TEXT.selectSize : TEXT.selectColor}
                    onPress={onIsNotSizeOrColorWindowPress}
                />
            </SafeAreaView>

            <SafeAreaView style={styles.safe} />
        </Fragment>
    );
});

export default ProductProfile;
