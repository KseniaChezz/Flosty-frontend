import React, {memo, useState, Fragment} from 'react';
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

import {RootNavigatorRoutes} from '../../../enums';

import {
    getSubscribersValueText,
    isShopSubscribed,
    navigate,
    getShopBindedSubscriptions,
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
    const dispatch = useDispatch();

    const onAdjustSubscriptionPress = () => {
        navigate(
            RootNavigatorRoutes.SUBSCRIPTION_DETAIL,
            {
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
        return () => setSearchText(`#${tag.name}`)
    };

    const renderProducts = () => {
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

                {productList && <ProductList productList={productList}/>}
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
                hasBindedSubscriptions={getShopBindedSubscriptions(id).length !== 0}
                onBindedSubscriptionsPress={()=>{}}
                isWriteButtonShown={true}
            />

            {renderProducts()}

        </ScrollView>
    );
});

export default Shop;
