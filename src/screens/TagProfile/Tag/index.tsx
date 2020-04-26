import React, {memo, useState, Fragment} from 'react';
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

import {IState} from '../../../store';
import {ISubscriptionTag} from '../../../types/subscription';

import {RootNavigatorRoutes} from '../../../enums';

import {isTagSubscribed, navigate, getTagBindedSubscriptions} from '../../../utils';
import { postSubscription } from '../../../store/subscriptionList/thunks/addSubscription';
import { deleteSubscriptionFromList } from '../../../store/subscriptionList/thunks/deleteSubscription';
import { IShopProduct } from '../../../types/product';

interface IProps {
    tag: ISubscriptionTag;
}

const Tag = memo((props:IProps) => {
    const {tag} = props;
    const {
        id,
        name,
    } = tag;
    const productList: IShopProduct[] = useSelector((stor: IState) => stor.products.tagMap[id]);
    const [isSubscribed, setIsSubscribed] = useState<boolean>(isTagSubscribed(id));
    const [subscriptionId, setSubscriptionId] = useState<number | undefined>();
    const [searchText, setSearchText] = useState<string>('');
    const dispatch = useDispatch();

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

    const onAdjustSubscriptionPress = () => {
        navigate(
            RootNavigatorRoutes.SUBSCRIPTION_DETAIL,
            {
                selectedTags: [{name, id}],
            },
        );
    };

    const renderProducts = () => {
        return (
            <Fragment>
                <SearchInput
                    text={searchText}
                    onTextChange={setSearchText}
                    onPress={()=>{}}
                />

                {/*{tagList &&*/}
                {/*    <TagList*/}
                {/*        tagList={tagList}*/}
                {/*        onItemPress={onTagPress}*/}
                {/*    />*/}
                {/*}*/}

                {productList && <ProductList productList={productList}/>}
            </Fragment>
        )
    };

    return (
        <ScrollView>
            <TagInfoCard
                tag={tag}
            />

            <ButtonsBlock
                isSubscribed={isSubscribed}
                onUnsubscribePress={onUnsubscribePress}
                onSubscribePress={onSubscribePress}
                onAdjustSubscriptionPress={onAdjustSubscriptionPress}
                hasBindedSubscriptions={getTagBindedSubscriptions(id).length !== 0}
                onBindedSubscriptionsPress={()=>{}}
            />

            {renderProducts()}
        </ScrollView>
    );
});

export default Tag;
