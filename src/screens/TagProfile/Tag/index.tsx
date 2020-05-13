import React, {memo, useState, Fragment, useEffect} from 'react';
import {
    ScrollView,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';

import TagInfoCard from '../TagInfoCard';
import {
    SearchInput,
    ProductList,
    TagList,
    ButtonsBlock,
} from '../../../elements';

import {postSubscription} from '../../../store/subscriptionList/thunks/addSubscription';
import {deleteSubscriptionFromList} from '../../../store/subscriptionList/thunks/deleteSubscription';

import {IState} from '../../../store';
import {ISubscriptionTag, ISubscription} from '../../../types/subscription';
import {IShopProduct} from '../../../types/product';
import {ITag} from '../../../types/shop';

import {RootNavigatorRoutes, SubscriptionType} from '../../../enums';

import {
    isTagSubscribed,
    navigate,
    getTagBindedSubscriptions,
    getFilteredProductListByTagAndTagId,
    getShopOrTagSubscriptionId,
} from '../../../utils';

interface IProps {
    tagId: number;
}

const Tag = memo((props:IProps) => {
    const {tagId} = props;
    const productList: IShopProduct[] | undefined = useSelector(
        (stor: IState) => stor.products.tagMap[tagId]?.productList);
    const popularTagList: ITag[] | undefined = useSelector(
        (stor: IState) => stor.products.tagMap[tagId]?.popularTagList);
    const tagName: string | undefined = useSelector((stor: IState) => stor.products.tagMap[tagId]?.name);
    const tagLogo: string | undefined = useSelector((stor: IState) => stor.products.tagMap[tagId]?.logo);
    const tagSubscribers: number | undefined = useSelector(
        (stor: IState) => stor.products.tagMap[tagId]?.subscribers);
    const subscriptionList: ISubscription[] = useSelector((store: IState) => store.subscriptionList.list);
    const [productListToRender, setProductListToRender] = useState<IShopProduct[] | undefined>(productList);
    const [isSubscribed, setIsSubscribed] = useState<boolean>(isTagSubscribed(tagId));
    const [subscriptionId, setSubscriptionId] =
        useState<number | undefined>(getShopOrTagSubscriptionId(tagId, SubscriptionType.TAG));
    const [searchText, setSearchText] = useState<string>('');
    const dispatch = useDispatch();

    useEffect(() => {
        if (!productList) return;

        const {list} = getFilteredProductListByTagAndTagId(searchText, productList);
        setProductListToRender(list);
    }, [productList, searchText]);

    const onSubscribeSuccessCallback = (id: number) => {
        setIsSubscribed(true);
        setSubscriptionId(id);
    };

    const onUnsubscribeSuccessCallback = () => {
        setIsSubscribed(false);
        setSubscriptionId(undefined);
    };

    const onSubscribePress = () => {
        dispatch(postSubscription([tagId], [], onSubscribeSuccessCallback));
    };

    const onUnsubscribePress = () => {
        if (!subscriptionId) return;

        dispatch(deleteSubscriptionFromList(subscriptionId, onUnsubscribeSuccessCallback));
    };

    const onAdjustSubscriptionPress = () => {
        navigate(
            RootNavigatorRoutes.SUBSCRIPTION_DETAIL,
            {
                subscription: subscriptionList.find((item: ISubscription) => item.id === subscriptionId),
            },
        );
    };

    const onTagPress = (tag: ITag) => {
        return () => {
            const {list} = getFilteredProductListByTagAndTagId(searchText, productList);
            setSearchText(`#${tag.name}`);
            setProductListToRender(list);
        }
    };

    const onBindedSubscriptionsPress = () => {
        navigate(
            RootNavigatorRoutes.SUBSCRIPTION_LINKED,
            {
                subscriptionId: tagId,
            },
        );
    };

    const onSearchPress = () => {
        const {list} = getFilteredProductListByTagAndTagId(searchText, productList);
        setProductListToRender(list);
    };

    const renderProducts = () => {
        return (
            <Fragment>
                <SearchInput
                    text={searchText}
                    onTextChange={setSearchText}
                    onPress={onSearchPress}
                />

                {!!popularTagList && popularTagList.length !==0 &&
                    <TagList
                        tagList={popularTagList}
                        onItemPress={onTagPress}
                    />
                }

                {!!productListToRender && <ProductList productList={productListToRender}/>}
            </Fragment>
        )
    };

    return (
        <ScrollView>
            <TagInfoCard
                tag={{
                    id: tagId,
                    name: tagName,
                    subscribers: tagSubscribers || 0,
                    image: tagLogo,
                }}
            />

            <ButtonsBlock
                isSubscribed={isSubscribed}
                onUnsubscribePress={onUnsubscribePress}
                onSubscribePress={onSubscribePress}
                onAdjustSubscriptionPress={onAdjustSubscriptionPress}
                hasBindedSubscriptions={getTagBindedSubscriptions(tagId, subscriptionList).length !== 0}
                onBindedSubscriptionsPress={onBindedSubscriptionsPress}
            />

            {renderProducts()}
        </ScrollView>
    );
});

export default Tag;
