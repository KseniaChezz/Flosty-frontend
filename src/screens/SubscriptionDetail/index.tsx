import React, {memo, useState, useEffect, Fragment} from 'react';
import {View, Text, ScrollView, ActivityIndicator} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';

import {styles} from './style';

import {
    ScreenWrapperWithBackButton,
} from '../../elements';
import SubscriptionDetalCard from './SubscriptionDetailCard';

import {updateSubscriptionInList} from '../../store/subscriptionList/thunks/updateSubscription';

import {IRootNavigatorParamList} from '../../types/rootNavigator';
import {IState} from '../../store';
import {ITag} from '../../types/shop';

import {TEXT, COLORS} from '../../constants';
import {RootNavigatorRoutes, ShowShopProductListMode, SubscriptionType} from '../../enums';

type ScreenNavigationProp = StackNavigationProp<IRootNavigatorParamList, RootNavigatorRoutes.SUBSCRIPTION_DETAIL>;
type ScreenRouteProp = RouteProp<IRootNavigatorParamList, RootNavigatorRoutes.SUBSCRIPTION_DETAIL>;

interface IProps {
    navigation: ScreenNavigationProp;
    route: ScreenRouteProp;
}

const SubscsriptionDetail = memo((props:IProps) => {
    const {
        navigation,
        route: {
            params: {
                subscriptionId,
                selectedTags,
                shopTagList,
            },
        },
    } = props;
    const [searchText, setSearchText] = useState<string>('');
    const [selectedTagList, setSelectedTagList] = useState<ITag[]>(selectedTags);
    const isSubscriptionDataProcessing: boolean = useSelector(
        (store: IState) => store.subscriptionList.dataIsProcessing);
    const dispatch = useDispatch();

    const onBackPress = () => {
        if (isSubscriptionDataProcessing) return;

        navigation.goBack();
    };

    const onShopTagPress = (item: ITag) => {
        return () => setSelectedTagList([...selectedTagList, item]);
    };

    const onSelectedTagPress = (item: ITag) => {
        return () => setSelectedTagList((prevList: ITag[]) => {
            return prevList.filter((listItem: ITag) => listItem.id !== item.id);
        });
    };

    const onSavePress = () => {
        const tags: number[] = [];
        const shops: number[] = [];

        selectedTagList.forEach((item: ITag) => {
            const {id} = item;
            if (typeof id === 'string') {
                shops.push(+id);
            } else {
                tags.push(id);
            }
        });

        dispatch(updateSubscriptionInList(subscriptionId, tags, shops))
    }

    return (
        <ScreenWrapperWithBackButton
            text={TEXT.subscription}
            onBackPress={onBackPress}
        >
            <ScrollView>
                <SubscriptionDetalCard
                    shopTagList={shopTagList}
                    onShopTagPress={onShopTagPress}
                    selectedTagList={selectedTagList}
                    onSelectedTagPress={onSelectedTagPress}
                    searchText={searchText}
                    setSearchText={setSearchText}
                    isSubscriptionDataProcessing={isSubscriptionDataProcessing}
                    onSavePress={onSavePress}
                />

                <View style={styles.productListContainer}>

                </View>

            </ScrollView>
        </ScreenWrapperWithBackButton>
    );
});

export default SubscsriptionDetail;
