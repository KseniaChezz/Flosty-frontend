import React from 'react';
import {memo, useState, useEffect} from 'react';
import {
    View,
    StyleSheet,
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import {useDispatch, useSelector} from 'react-redux';

import {CommonScreenWrapper} from '../../elements';
import ShopSubscribeCardList from './ShopSubscribeCardList';
import SubscriptionFeed from './SubscriptionFeed';

import {getSubscriptionList} from '../../store/subscriptionList/thunks/getSubscriptionList';
import {getShopList} from '../../store/shop/thunks/getShopList';
import {getFeedList} from '../../store/feed/thunks/getFeedList';
import {getFavoriteList} from '../../store/favorite/thunks/getFavoriteList';

import {IState} from '../../store';

import {SubscriptionViewMode} from '../../enums';

interface IProps {}

const Subscriptions = memo((props: IProps) => {
    const subscriptionListLength: number = useSelector((store: IState) => store.subscriptionList.list.length);
    const subscriptionListIsLoading: boolean = useSelector(
        (store: IState) => store.subscriptionList.listIsLoading);
    const feedListLength: number = useSelector((store: IState) => store.feed.list.length);
    const feedListIsLoading: boolean = useSelector((store: IState) => store.feed.isLoading);
    const shopListIsLoading: boolean = useSelector((store: IState) => store.shop.isLoading);
    const [subscriptionViewMode, setSubscriptionViewMode] = useState<SubscriptionViewMode>(SubscriptionViewMode.INITIAL);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getSubscriptionList());
        dispatch(getShopList());
        dispatch(getFeedList());
        dispatch(getFavoriteList());
    }, []);

    useEffect(() => {
        if (feedListLength !== 0 && subscriptionListLength !== 0) {
            setSubscriptionViewMode(SubscriptionViewMode.FEED);
        } else {
            setSubscriptionViewMode(SubscriptionViewMode.INITIAL);
        }
    }, [feedListLength, subscriptionListLength]);

    const renderContent = () => {
        if (subscriptionListIsLoading || feedListIsLoading || shopListIsLoading) {
            return (
                <View style={styles.activityIndacitorContainer}>
                    <Spinner
                        visible={true}
                    />
                </View>
            );
        }

        if (subscriptionViewMode === SubscriptionViewMode.INITIAL) {
            return (
                <ShopSubscribeCardList
                    setSubscriptionViewMode={setSubscriptionViewMode}
                />
            );
        }

        if (subscriptionViewMode === SubscriptionViewMode.FEED) {
            return (
                <SubscriptionFeed/>
            );
        }

        return null;
    }

    return (
        <CommonScreenWrapper>
            {renderContent()}
        </CommonScreenWrapper>
    );
});

const styles = StyleSheet.create({
    activityIndacitorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default Subscriptions;
