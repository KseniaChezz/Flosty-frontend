import React, {memo, useState, useEffect, Fragment} from 'react';
import {View, ScrollView, ActivityIndicator} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';

import {styles} from './style';

import ShopInfoCard from './ShopInfoCard';
import {
    ScreenWrapperWithBackButton,
    ColoredButton,
    SearchInput,
    TagList,
    ProductList,
} from '../../elements';

import {getShopProducts} from '../../store/products/thunks/getShopProducts';
import {postSubscription} from '../../store/subscriptionList/thunks/addSubscription';
import {deleteSubscriptionFromList} from '../../store/subscriptionList/thunks/deleteSubscription';

import {IRootNavigatorParamList} from '../../types/rootNavigator';
import {IState} from '../../store';
import {IShop, ITag} from '../../types/shop';
import {IShopProduct} from '../../types/product';

import {TEXT, COLORS} from '../../constants';
import {RootNavigatorRoutes, ShowShopProductListMode, SubscriptionType} from '../../enums';

import {getSubscribersValueText} from '../../utils';

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
    const [searchText, setSearchText] = useState<string>('');
    const [isSubscribed, setIsSubscribed] = useState<boolean>(false);
    const [subscriptionId, setSubscriptionId] = useState<number | undefined>();
    const shop: IShop | undefined = useSelector((stor: IState) => stor.shop.map[id]);
    const isProductListLoading: boolean = useSelector((stor: IState) => stor.products.isLoading);
    const productList: IShopProduct[] = useSelector((stor: IState) => stor.products.shopMap[id]);
    const isSubscriptionDataProcessing: boolean = useSelector(
        (stor: IState) => stor.subscriptionList.dataIsProcessing);
    const {
        name,
        logo,
        rating,
        address,
        phoneNumber,
        email,
        subscribers,
        description,
        tagList,
    } = shop;
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getShopProducts(id));
    }, []);

    const onBackPress = () => {
        navigation.goBack();
    };

    const onAdjustSubscriptionPress = () => {
        if (!subscriptionId) return ;

        navigation.navigate(
            RootNavigatorRoutes.SUBSCRIPTION_DETAIL,
            {
                subscriptionId,
                selectedTags: [{name, id: `${id}`}],
                shopTagList: tagList,
            },
        );
    };

    const onSubscribeSuccessCallback = (id: number) => {
        setIsSubscribed(true);
        setSubscriptionId(id);
    };

    const onUnsubscribeSuccessCallback = () => {
        setIsSubscribed(false);
        setSubscriptionId(undefined);
    };

    const onSubscribePress = () => {
        dispatch(postSubscription([], [id], onSubscribeSuccessCallback));
    };

    const onUnsubscribePress = () => {
        if (!subscriptionId) return;

        dispatch(deleteSubscriptionFromList(subscriptionId, onUnsubscribeSuccessCallback));
    };

    const onTagPress = (tag: ITag) => {
        return () => setSearchText(`#${tag.name}`)
    };

    const renderProducts = () => {
        if (isProductListLoading) {
            return (
                <ActivityIndicator
                    size="large"
                    color={COLORS.LightGrey}
                    style={styles.activityIndacitor}
                />
            );
        }

        return (
            <Fragment>
                <SearchInput
                    text={searchText}
                    onTextChange={setSearchText}
                    onPress={()=>{}}
                />

                {tagList &&
                    <TagList
                        tagList={tagList}
                        onItemPress={onTagPress}
                    />
                }

                {productList &&
                    <ProductList
                        productList={productList}
                    />
                }
            </Fragment>
        )
    }

    return (
        <ScreenWrapperWithBackButton
            text={TEXT.shopWithCapital}
            onBackPress={onBackPress}
            style={styles.container}
        >
            <ScrollView>
                <ShopInfoCard
                    name={name}
                    logo={logo}
                    description={description}
                    address={address}
                    phoneNumber={phoneNumber}
                    email={email}
                    rating={rating}
                    followers={getSubscribersValueText(subscribers)}
                />

                <ColoredButton
                    text={isSubscribed ? TEXT.unsubscribe : TEXT.subscribe}
                    onPress={isSubscribed ? onUnsubscribePress : onSubscribePress}
                    buttonStyle={isSubscribed ? styles.unsubscribeButton : styles.subscribeButton}
                    textStyle={styles.subscribeText}
                />

                {isSubscribed &&
                    <ColoredButton
                        text={TEXT.adjustSubscription}
                        onPress={onAdjustSubscriptionPress}
                        buttonStyle={styles.adjustButton}
                        textStyle={styles.writeAndAdjustText}
                    />
                }

                <ColoredButton
                    text={TEXT.writeToVendor}
                    onPress={()=>{}}
                    buttonStyle={styles.writeButton}
                    textStyle={styles.writeAndAdjustText}
                />

                {renderProducts()}

            </ScrollView>
        </ScreenWrapperWithBackButton>
    );
});

export default ShopProfile;
