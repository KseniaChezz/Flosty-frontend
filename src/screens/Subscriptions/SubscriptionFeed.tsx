import React, {RefObject, Fragment} from 'react';
import {memo, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import {Tab} from '../../elements';
import FeedList from './FeedList';
import HistoryList from './HistoryList';

import {getFeedList} from '../../store/feed/thunks/getFeedList';

import {TEXT, COLORS, subscriptionTabList} from '../../constants';

import {IState} from '../../store';
import {IFeedProduct} from '../../types/product';
import {ISubscriptionTab} from '../../types/subscription';

interface IProps {}

const SubscriptionFeed = memo((props: IProps) => {
    const feedList: IFeedProduct[] = useSelector((store: IState) => store.feed.list);
    const isLoading: boolean = useSelector((store: IState) => store.feed.isLoading);
    const subscriptionList: any[] | undefined = useSelector((store: IState) => store.subscriptionList.list);
    const [activeTab, setActiveTab] = useState<string>(subscriptionTabList[0].title);
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
                {subscriptionTabList.map((tab: ISubscriptionTab) => {
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

export const styles = StyleSheet.create({
    subscriptionTitleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 10,
        marginTop: 17,
        marginBottom: 19,
    },
    subscriptionTitle: {
        fontSize: 18,
        lineHeight: 22,
        fontWeight: '600',
        marginRight: 10,
    },
    subscriptionNumber: {
        fontSize: 14,
        lineHeight: 22,
    },
    tabRow: {
        flexDirection: 'row',
        height: 44,
        marginBottom: 10,
    },
    mainContent: {
        flex: 1,
        position: 'relative',
    },
    text: {
        fontFamily: 'Montserrat',
        color: COLORS.DarkGrey,
    },
});

export default SubscriptionFeed;
