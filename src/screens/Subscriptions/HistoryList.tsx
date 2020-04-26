import React, {Fragment, memo, useEffect, useState} from 'react';
import {ScrollView, StyleSheet, View,} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import {useDispatch, useSelector} from 'react-redux';

import {RoundTab, SearchInput} from '../../elements';
import PlainSubscriptionCard from './PlainSubscriptionCard';
import AdjustedSubscriptionCard from './AdjustedSubscriptionCard';

import {subscriptionFilterList} from '../../constants';
import {SubscriptionType, RootNavigatorRoutes} from '../../enums';

import {IState} from '../../store';
import {ISubscription, ISubscriptionFilter} from '../../types/subscription';

import {deleteSubscriptionFromList} from '../../store/subscriptionList/thunks/deleteSubscription';
import {filterSubscriptionList} from '../../utils/subscribe';
import { navigate } from '../../utils';

interface IProps {}

const HistoryList = memo((props: IProps) => {
    const subscriptionList: ISubscription[] = useSelector((store: IState) => store.subscriptionList.list);
    const isSubscriptionDataProcessing: boolean = useSelector(
        (store: IState) => store.subscriptionList.dataIsProcessing);
    const [searchText, setSearchText] = useState<string>('');
    const [filter, setFilter] = useState<string>(subscriptionFilterList[0].title);
    const [filteredList, setFilteredList] = useState<ISubscription[]>(subscriptionList);
    const dispatch = useDispatch();

    useEffect(() => {
        setFilteredList(filterSubscriptionList(subscriptionList, filter, searchText));
    }, [subscriptionList]);

    const onFilterPress = (title: string) => {
        return () => {
            setFilter(title);
            setFilteredList(filterSubscriptionList(subscriptionList, title, searchText));
        }
    };

    const onSearchTextChange = (text: string) => {
        setSearchText(text);
        setFilteredList(filterSubscriptionList(subscriptionList, filter, text));
    };

    const onSearchPress = () => {
        setFilteredList(filterSubscriptionList(subscriptionList, filter, searchText));
    };

    const onUnSubscribePress = (id: number) => {
        return () => dispatch(deleteSubscriptionFromList(id));
    };

    const onCardPress = (subscription: ISubscription) => {
        return () => {
            const {type, shops, tags} = subscription;

            if (type === SubscriptionType.SHOP) {
                navigate(RootNavigatorRoutes.SHOP_PROFILE, {id: shops[0].id});
            }

            if (type === SubscriptionType.TAG) {
                navigate(RootNavigatorRoutes.TAG_PROFILE, {tag: tags[0]});
            }
        }
    };

    const onEditAdjustableSubscriptionPress = (subscription: ISubscription) => {
        return () => {
            const {
                id: subscriptionId,
                shops,
                tags,
            } = subscription;
            const {name, id} = shops[0];

            navigate(
                RootNavigatorRoutes.SUBSCRIPTION_DETAIL,
                {
                    subscriptionId,
                    selectedTags: [{name, id: `${id}`}, ...tags],
                },
            );
        }
    }

    return (
        <Fragment>
            <Spinner
                visible={isSubscriptionDataProcessing}
            />

            <View style={styles.filterAndSearchContainer}>
                <SearchInput
                    text={searchText}
                    onTextChange={onSearchTextChange}
                    onPress={onSearchPress}
                />

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
            </View>

            <ScrollView>
                <View style={styles.historyContainer}>

                    <View style={styles.subscriptionListContainer}>
                        {filteredList.map((subscription: ISubscription) => {
                            const {id, type} = subscription;

                            if (type === SubscriptionType.ADJUSTED) {
                                return (
                                    <AdjustedSubscriptionCard
                                        key={id}
                                        subscription={subscription}
                                        onEditPress={onEditAdjustableSubscriptionPress(subscription)}
                                        onUnSubscribePress={onUnSubscribePress(id)}
                                    />
                                );
                            }

                            return (
                                <PlainSubscriptionCard
                                    key={id}
                                    subscription={subscription}
                                    onUnSubscribePress={onUnSubscribePress(id)}
                                    onCardPress={onCardPress(subscription)}
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
    filterAndSearchContainer: {
        paddingHorizontal: 8,
    },
    filterRow: {
        flexDirection: 'row',
        height: 44,
        justifyContent: 'space-between',
        marginBottom: 15,
    },
    subscriptionListContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    }
});

export default HistoryList;
