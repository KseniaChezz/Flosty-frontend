import React, {memo, useState, Fragment, useEffect} from 'react';
import {
    View,
    TouchableOpacity,
    Image,
    ScrollView,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';

import ShopInfoCard from '../ShopInfoCard';
import {
    SearchInput,
    TagList,
    ProductList,
    ButtonsBlock,
} from '../../../elements';

import {postSubscription} from '../../../store/subscriptionList/thunks/addSubscription';
import {deleteSubscriptionFromList} from '../../../store/subscriptionList/thunks/deleteSubscription';

import {IState} from '../../../store';
import {IShop, ITag} from '../../../types/shop';
import {IShopProduct} from '../../../types/product';
import {ISubscription} from '../../../types/subscription';

import {RootNavigatorRoutes} from '../../../enums';

import {
    getSubscribersValueText,
    isShopSubscribed,
    navigate,
    getShopBindedSubscriptions,
    filterProductListByNameAndTag,
} from '../../../utils';

interface IProps {
    shop: IShop;
}

const Shop = memo((props:IProps) => {
    const {shop} = props;
    const {
        id,
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
    const [searchText, setSearchText] = useState<string>('');
    const [isSubscribed, setIsSubscribed] = useState<boolean>(isShopSubscribed(id));
    const [subscriptionId, setSubscriptionId] = useState<number | undefined>();
    const productList: IShopProduct[] = useSelector((stor: IState) => stor.products.shopMap[id]);
    const [productListToRender, setProductListToRender] = useState<IShopProduct[]>(productList);
    const subscriptionList: ISubscription[] = useSelector((store: IState) => store.subscriptionList.list);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!productList) return;

        setProductListToRender(filterProductListByNameAndTag(searchText, productList));
    }, [productList, searchText]);

    const onAdjustSubscriptionPress = () => {
        navigate(
            RootNavigatorRoutes.SUBSCRIPTION_DETAIL,
            {
                productList,
                selectedTags: [{name, id: `${id}`}],
                popularTags: tagList,
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
        return () => {
            setSearchText(`#${tag.name}`);
            setProductListToRender(filterProductListByNameAndTag(tag.name, productList));
        }
    };

    const onSearchPress = () => {
        setProductListToRender(filterProductListByNameAndTag(searchText, productList));
    };

    const onBindedSubscriptionsPress = () => {
        navigate(
            RootNavigatorRoutes.SUBSCRIPTION_LINKED,
            {
                subscriptionId,
            },
        );
    };

    const renderProducts = () => {
        return (
            <Fragment>
                <SearchInput
                    text={searchText}
                    onTextChange={setSearchText}
                    onPress={onSearchPress}
                />

                {tagList &&
                    <TagList
                        tagList={tagList}
                        onItemPress={onTagPress}
                    />
                }

                {!!productListToRender && <ProductList productList={productListToRender}/>}
            </Fragment>
        )
    };

    return (
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

            <ButtonsBlock
                isSubscribed={isSubscribed}
                onUnsubscribePress={onUnsubscribePress}
                onSubscribePress={onSubscribePress}
                onAdjustSubscriptionPress={onAdjustSubscriptionPress}
                hasBindedSubscriptions={getShopBindedSubscriptions(id, subscriptionList).length !== 0}
                onBindedSubscriptionsPress={onBindedSubscriptionsPress}
                isWriteButtonShown={true}
            />

            {renderProducts()}

        </ScrollView>
    );
});

export default Shop;
