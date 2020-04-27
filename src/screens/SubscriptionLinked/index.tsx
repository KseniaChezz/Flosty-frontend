import React, {memo, useState, useEffect} from 'react';
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import {useSelector, useDispatch} from 'react-redux';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';

import {ScreenWrapperWithBackButton,} from '../../elements';
import AdjustedSubscriptionCard from '../Subscriptions/AdjustedSubscriptionCard';

import {deleteSubscriptionFromList} from '../../store/subscriptionList/thunks/deleteSubscription';

import {IRootNavigatorParamList} from '../../types/rootNavigator';
import {ISubscription} from '../../types/subscription';
import {IState} from '../../store';

import {TEXT, COLORS} from '../../constants';
import {RootNavigatorRoutes, ShowShopProductListMode, SubscriptionType} from '../../enums';

import {getTagBindedSubscriptions, navigate} from '../../utils';

type ScreenNavigationProp = StackNavigationProp<IRootNavigatorParamList, RootNavigatorRoutes.SUBSCRIPTION_LINKED>;
type ScreenRouteProp = RouteProp<IRootNavigatorParamList, RootNavigatorRoutes.SUBSCRIPTION_LINKED>;

interface IProps {
    navigation: ScreenNavigationProp;
    route: ScreenRouteProp;
}

const SubscsriptionLinked = memo((props:IProps) => {
    const {
        navigation,
        route: {
            params: {
                subscriptionId,
            },
        },
    } = props;
    const subscriptionList: ISubscription[] = useSelector((store: IState) => store.subscriptionList.list);
    const isSubscriptionDataProcessing: boolean = useSelector(
        (store: IState) => store.subscriptionList.dataIsProcessing);
    const [linkedSubscriptionList, setLinkedSubscriptionList] = useState<ISubscription[]>(
        getTagBindedSubscriptions(subscriptionId, subscriptionList));
    const dispatch = useDispatch();

    useEffect(() => {
        setLinkedSubscriptionList(getTagBindedSubscriptions(subscriptionId, subscriptionList));
    }, [subscriptionList])

    const onBackPress = () => {
        navigation.goBack();
    };

    const onUnSubscribePress = (id: number) => {
        return () => dispatch(deleteSubscriptionFromList(id));
    };

    const onEditAdjustableSubscriptionPress = (subscription: ISubscription) => {
        return () => {
            const {
                id: subscriptionId,
                shops,
                tags,
            } = subscription;

            navigate(
                RootNavigatorRoutes.SUBSCRIPTION_DETAIL,
                {
                    subscriptionId,
                    selectedTags: shops[0] ? [{name: shops[0].name, id: `${shops[0].id}`}, ...tags] : [...tags],
                },
            );
        }
    };

    return (
        <ScreenWrapperWithBackButton
            text={TEXT.linkedSubscription}
            onBackPress={onBackPress}
            style={styles.container}
        >
            <Spinner
                visible={isSubscriptionDataProcessing}
            />

            <ScrollView>
                {linkedSubscriptionList.map((item: ISubscription) => {
                    const {id} = item;
                    return (
                        <AdjustedSubscriptionCard
                            key={id}
                            subscription={item}
                            onEditPress={onEditAdjustableSubscriptionPress(item)}
                            onUnSubscribePress={onUnSubscribePress(id)}
                        />
                    )
                })}
            </ScrollView>

        </ScreenWrapperWithBackButton>
    );
});

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 8,
        paddingTop: 10,
    },
});

export default SubscsriptionLinked;
