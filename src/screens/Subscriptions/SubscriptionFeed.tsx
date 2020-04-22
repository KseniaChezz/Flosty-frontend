import React, {RefObject, Fragment} from 'react';
import {memo, useState} from 'react';
import {View, Text, ListRenderItemInfo, ActivityIndicator, TouchableOpacity, FlatList, RefreshControl, ScrollView} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import {styles} from './style';

import {Tab} from '../../elements';
import FeedList from './FeedList';
import HistoryList from './HistoryList';

import {getFeedList} from '../../store/feed/thunks/getFeedList';

import {TEXT, COLORS} from '../../constants';
import {RootNavigatorRoutes} from '../../enums';

import {navigate} from '../../utils';

import {IState} from '../../store';
import {IFeedProduct} from '../../types/product';

interface ITab {
    title: string;
}

const tabList: ITab[] = [
    {title: TEXT.feed},
    {title: TEXT.history},
];

interface IProps {}

const SubscriptionFeed = memo((props: IProps) => {
    const feedList: IFeedProduct[] = useSelector((store: IState) => store.feed.list);
    const isLoading: boolean = useSelector((store: IState) => store.feed.isLoading);
    const subscriptionList: any[] | undefined = useSelector((store: IState) => store.subscriptionList.list);
    const [activeTab, setActiveTab] = useState<string>(tabList[0].title);
    const dispatch = useDispatch();

    const onTabPress = (title: string) => {
        return () => setActiveTab(title);
    };

    const loadFeedList = () => {
        dispatch(getFeedList());
    };


    const renderFeedList = () => {
        return (
            <FeedList
                list={feedList}
                onRefresh={loadFeedList}
                isRefreshing={isLoading}
            />
        )
    };

    const renderHistory = () => {
        return (
            <HistoryList/>
        );
    };

    return (
        <Fragment>
            <View style={styles.subscriptionTitleContainer}>
                <Text style={[styles.text, styles.subscriptionTitle]}>
                    {TEXT.subscriptions}
                </Text>

                <Text style={[styles.text, styles.subscriptionNumber]}>
                    {subscriptionList.length}
                </Text>
            </View>

            <View style={styles.tabRow}>
                {tabList.map((tab: ITab) => {
                    const {title} = tab;

                    return (
                        <Tab
                            key={title}
                            title={title}
                            isSelected={title === activeTab}
                            onPress={onTabPress(title)}
                        />
                    )
                })}
            </View>

            <View style={styles.mainContent}>
                {activeTab === TEXT.feed ? renderFeedList() : renderHistory()}
            </View>
        </Fragment>
    );
});

export default SubscriptionFeed;
