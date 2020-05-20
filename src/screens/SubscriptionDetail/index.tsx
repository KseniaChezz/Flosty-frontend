import React, {memo, useState, useEffect} from 'react';
import {View, Text, ScrollView} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import {useSelector, useDispatch} from 'react-redux';
import {StackNavigationProp} from '@react-navigation/stack/lib/typescript/src/types';
import {RouteProp} from '@react-navigation/native';

import {styles} from './style';

import {ScreenWrapperWithBackButton,} from '../../elements';
import SubscriptionDetalCard from './SubscriptionDetailCard';
import TwoProductsInRowList from '../../elements/ProductList/TwoProductsInRowList';

import {updateSubscriptionInList} from '../../store/subscriptionList/thunks/updateSubscription';
import {resetProductFilters} from '../../store/products/actions';
import {getProductsByTagListAndShop} from '../../store/products/thunks/getProductsByTagListAndShop';

import {IRootNavigatorParamList} from '../../types/rootNavigator';
import {IState} from '../../store';
import {ITag} from '../../types/shop';
import {IShopProduct} from '../../types/product';
import {IShopTaglistInfo, IShopTagListMap} from '../../store/products/types/state';

import {TEXT, COLORS} from '../../constants';
import {RootNavigatorRoutes, ShowShopProductListMode, SubscriptionType} from '../../enums';

import {
    getFilteredProductListByTagAndTagId,
    isTagListSame,
    getTagListAndShopId,
    getTagListFromSubscription,
    getIdListFromTagList,
    getFilteredTagList,
} from '../../utils';

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
                subscription,
            },
        },
    } = props;
    const {
        id,
        shops,
        tags,
    } = subscription;
    const tagIdList: number[] = getIdListFromTagList(tags);
    const shopId: number[] | undefined = shops && shops[0] && [shops[0].id];
    const tagListAndShopId: string = getTagListAndShopId(tagIdList, shopId);
    const isSubscriptionDataProcessing: boolean = useSelector(
        (store: IState) => store.subscriptionList.dataIsProcessing);
    const isProductListLoading: boolean = useSelector((store: IState) => store.products.isLoading);
    const shopTagListMap: IShopTagListMap = useSelector((store: IState) => store.products.shopTagListMap);
    const [searchText, setSearchText] = useState<string>('');
    const [selectedTagList, setSelectedTagList] = useState<ITag[]>(getTagListFromSubscription(subscription));
    const [popularTags, setPopularTags] = useState<ITag[]>();
    const [productListToRender, setProductListToRender] = useState<IShopProduct[] | undefined>();
    const [tagIdFromSearch, setTagIdFromSearch] = useState<number | undefined>();
    const dispatch = useDispatch();

    useEffect(() => {
        if (!productListToRender) return;

        if (!searchText) {
            setTagIdFromSearch(undefined);
            return;
        }

        const {list, tagId} = getFilteredProductListByTagAndTagId(searchText, productListToRender);
        setProductListToRender(list);
        setTagIdFromSearch(tagId);
    }, [searchText]);

    useEffect(() => {
        const [firstElement, ...rest] = selectedTagList;
        const tagIdList = typeof firstElement.id === 'string' ? getIdListFromTagList(rest) : getIdListFromTagList(selectedTagList);
        const shopId = typeof firstElement.id === 'string' ? [+firstElement.id] : undefined;
        const tagListAndShopId: string = getTagListAndShopId(tagIdList, shopId);

        if (shopTagListMap[tagListAndShopId]) {
            setProductListToRender(shopTagListMap[tagListAndShopId].productList);
            setPopularTags(shopTagListMap[tagListAndShopId].popularTagList);
        } else {
            dispatch(getProductsByTagListAndShop(
                tagIdList,
                shopId,
                (productList: IShopProduct[], popularTagList: ITag[]) => {
                    setProductListToRender(productList);
                    setPopularTags(popularTagList);
            }));
        }
    }, [selectedTagList]);

    const onBackPress = () => {
        navigation.goBack();
        dispatch(resetProductFilters());
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

        if (tagIdFromSearch) {
            tags.push(tagIdFromSearch);
        }

        dispatch(updateSubscriptionInList(id, tags, shops));
    };

    return (
        <ScreenWrapperWithBackButton
            text={id ? TEXT.editSubscription : TEXT.subscription}
            onBackPress={onBackPress}
        >
            <Spinner visible={isSubscriptionDataProcessing || isProductListLoading} />

            <ScrollView>
                <SubscriptionDetalCard
                    popularTagList={popularTags}
                    onPopularTagPress={onPopularTagPress}
                    selectedTagList={selectedTagList}
                    onSelectedTagPress={onSelectedTagPress}
                    searchText={searchText}
                    setSearchText={setSearchText}
                    onSavePress={onSavePress}
                    isSelectedTagListSame={isTagListSame(getTagListFromSubscription(subscription), selectedTagList)}
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
