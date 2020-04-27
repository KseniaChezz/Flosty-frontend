import React, {memo, useState, useEffect, Fragment} from 'react';
import {View, Text, ScrollView} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import {useSelector, useDispatch} from 'react-redux';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';

import {styles} from './style';

import {ScreenWrapperWithBackButton,} from '../../elements';
import SubscriptionDetalCard from './SubscriptionDetailCard';
import TwoProductsInRowList from '../../elements/ProductList/TwoProductsInRowList';

import {updateSubscriptionInList} from '../../store/subscriptionList/thunks/updateSubscription';
import {postSubscription} from '../../store/subscriptionList/thunks/addSubscription';

import {IRootNavigatorParamList} from '../../types/rootNavigator';
import {IState} from '../../store';
import {ITag} from '../../types/shop';
import {IShopProduct} from '../../types/product';

import {TEXT, COLORS} from '../../constants';
import {RootNavigatorRoutes, ShowShopProductListMode, SubscriptionType} from '../../enums';

import {filterProductListByNameAndTag} from '../../utils';

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
                popularTags,
                productList,
            },
        },
    } = props;
    const [searchText, setSearchText] = useState<string>('');
    const [selectedTagList, setSelectedTagList] = useState<ITag[]>(selectedTags);
    const [productListToRender, setProductListToRender] = useState<IShopProduct[] | undefined>(productList);
    const isSubscriptionDataProcessing: boolean = useSelector(
        (store: IState) => store.subscriptionList.dataIsProcessing);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!productList) return;

        setProductListToRender(filterProductListByNameAndTag(searchText, productList));
    }, [searchText]);

    const onBackPress = () => {
        navigation.goBack();
    };

    const onPopularTagPress = (item: ITag) => {
        return () => {
            setSelectedTagList([...selectedTagList, item]);
            setSearchText(`#${item.name}`);
        }
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

        if (subscriptionId) {
            dispatch(updateSubscriptionInList(subscriptionId, tags, shops));
        } else {
            dispatch(postSubscription(tags, shops));
        }
    }

    return (
        <ScreenWrapperWithBackButton
            text={subscriptionId ? TEXT.editSubscription : TEXT.subscription}
            onBackPress={onBackPress}
        >
            <Spinner visible={isSubscriptionDataProcessing} />

            <ScrollView>
                <SubscriptionDetalCard
                    popularTagList={popularTags}
                    onPopularTagPress={onPopularTagPress}
                    selectedTagList={selectedTagList}
                    onSelectedTagPress={onSelectedTagPress}
                    searchText={searchText}
                    setSearchText={setSearchText}
                    onSavePress={onSavePress}
                />

                <View style={styles.productListContainer}>
                    {!!productListToRender &&
                        <TwoProductsInRowList
                            productList={productListToRender}
                        />
                    }
                </View>

            </ScrollView>
        </ScreenWrapperWithBackButton>
    );
});

export default SubscsriptionDetail;
