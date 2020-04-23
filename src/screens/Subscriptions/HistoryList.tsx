import React, {Fragment} from 'react';
import {memo, useState} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    ActivityIndicator,
    StyleSheet,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import {RoundTab} from '../../elements';
import PlainSubscriptionCard from './PlainSubscriptionCard';
import AdjustedSubscriptionCard from './AdjustedSubscriptionCard';

import {TEXT, COLORS, subscriptionFilterList} from '../../constants';
import {SubscriptionType} from '../../enums';

import {IState} from '../../store';
import {ISubscription, ISubscriptionFilter} from '../../types/subscription';

import {deleteSubscriptionFromList} from '../../store/subscriptionList/thunks/deleteSubscription';

interface IProps {}

const HistoryList = memo((props: IProps) => {
    const subscriptionList: ISubscription[] = useSelector((store: IState) => store.subscriptionList.list);
    const isSubscriptionDataProcessing: boolean = useSelector(
        (store: IState) => store.subscriptionList.dataIsProcessing);
    const [filter, setFilter] = useState<string>(subscriptionFilterList[0].title);
    const dispatch = useDispatch();

    const onFilterPress = (title: string) => {
        return () => setFilter(title);
    };

    const onUnSubscribePress = (id: number) => {
        return () => dispatch(deleteSubscriptionFromList(id));
    }

    return (
        <Fragment>
            {isSubscriptionDataProcessing &&
                <View style={styles.activityIndicatorContainer}>
                    <ActivityIndicator
                        size="large"
                        color={COLORS.DarkGrey}
                    />
                </View>
            }

            <ScrollView>
                <View style={styles.historyContainer}>
                    <View style={styles.filterRow}>
                        {subscriptionFilterList.map((item: ISubscriptionFilter) => {
                            const {title} = item;

                            return (
                                <RoundTab
                                    key={title}
                                    title={title}
                                    isSelected={filter === title}
                                    onPress={onFilterPress(title)}
                                />
                            );
                        })}
                    </View>

                    <View>
                        {subscriptionList.map((subscription: ISubscription) => {
                            const {id, type} = subscription;

                            if (type === SubscriptionType.ADJUSTED) {
                                return (
                                    <AdjustedSubscriptionCard
                                        key={id}
                                        subscription={subscription}
                                        onEditPress={()=>{}}
                                        onUnSubscribePress={onUnSubscribePress(id)}
                                    />
                                );
                            }

                            return (
                                <PlainSubscriptionCard
                                    key={id}
                                    subscription={subscription}
                                    onUnSubscribePress={onUnSubscribePress(id)}
                                />
                            )
                        })}
                    </View>
                </View>
            </ScrollView>
        </Fragment>
    );
});

const styles = StyleSheet.create({
    historyContainer: {
        paddingHorizontal: 10,
    },
    filterRow: {
        flexDirection: 'row',
        height: 44,
        justifyContent: 'space-between',
        marginBottom: 15,
    },
    activityIndicatorContainer: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default HistoryList;
