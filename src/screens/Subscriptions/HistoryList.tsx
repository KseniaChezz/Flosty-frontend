import React, {RefObject, Fragment} from 'react';
import {memo, useState} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import {RoundTab} from '../../elements';
import PlainSubscriptionCard from './PlainSubscriptionCard';
import AdjustedSubscriptionCard from './AdjustedSubscriptionCard';

import {TEXT, COLORS, subscriptionFilterList} from '../../constants';
import {SubscriptionType} from '../../enums';

import {IState} from '../../store';
import {ISubscription, IFilter} from '../../types/subscription';

interface IProps {}

const HistoryList = memo((props: IProps) => {
    const subscriptionList: ISubscription[] = useSelector((store: IState) => store.subscriptionList.list);
    const [filter, setFilter] = useState<string>(subscriptionFilterList[0].title);
    const dispatch = useDispatch();

    const onFilterPress = (title: string) => {
        return () => setFilter(title);
    };

    return (
        <ScrollView>
            <View style={styles.historyContainer}>
                <View style={styles.filterRow}>
                    {subscriptionFilterList.map((item: IFilter) => {
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
                                    onUnSubscribePress={()=>{}}
                                />
                            );
                        }

                        return (
                            <PlainSubscriptionCard
                                key={id}
                                subscription={subscription}
                                onUnSubscribePress={()=>{}}
                            />
                        )
                    })}
                </View>
            </View>
        </ScrollView>
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
});

export default HistoryList;
