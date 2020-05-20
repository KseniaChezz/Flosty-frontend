import React, {memo, useState, useEffect} from 'react';
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import {useSelector, useDispatch} from 'react-redux';
import {StackNavigationProp} from '@react-navigation/stack/lib/typescript/src/types';
import {RouteProp} from '@react-navigation/native';

import {ScreenWrapperWithBackButton,} from '../../elements';
import AdjustedSubscriptionCard from '../Subscriptions/AdjustedSubscriptionCard';

import {deleteSubscriptionFromList} from '../../store/subscriptionList/thunks/deleteSubscription';

import {IRootNavigatorParamList} from '../../types/rootNavigator';
import {ISubscription} from '../../types/subscription';
import {IState} from '../../store';

import {TEXT, COLORS} from '../../constants';
import {RootNavigatorRoutes, ShowShopProductListMode, SubscriptionType} from '../../enums';

import {getBindedSubscriptions, navigate} from '../../utils';

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
                type,
            },
        },
    } = props;
    const subscriptionList: ISubscription[] = useSelector((store: IState) => store.subscriptionList.list);
    const isSubscriptionDataProcessing: boolean = useSelector(
        (store: IState) => store.subscriptionList.dataIsProcessing);
    const [linkedSubscriptionList, setLinkedSubscriptionList] = useState<ISubscription[]>(
        getBindedSubscriptions(subscriptionId, subscriptionList, type));
    const dispatch = useDispatch();

    useEffect(() => {
        setLinkedSubscriptionList(getBindedSubscriptions(subscriptionId, subscriptionList, type));
    }, [subscriptionList])

    const onBackPress = () => {
        navigation.goBack();
    };

    const onUnSubscribePress = (id: number) => {
        return () => dispatch(deleteSubscriptionFromList(id));
    };

    const onEditAdjustableSubscriptionPress = (subscription: ISubscription) => {
        return () => {
            navigate(RootNavigatorRoutes.SUBSCRIPTION_DETAIL, {subscription});
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
