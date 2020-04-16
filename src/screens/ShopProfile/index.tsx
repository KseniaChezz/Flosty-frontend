import React, {memo, useState} from 'react';
import {ScrollView} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';

import {styles} from './style';

import ShopInfoCard from './ShopInfoCard';
import {
    CommonScreenWrapper,
    ColoredButton,
    SearchInput,
    TagList,
    ProductList,
} from '../../elements';

import {IRootNavigatorParamList} from '../../types/rootNavigator';

import {TEXT, COLORS} from '../../constants';

import {RootNavigatorRoutes, ShowShopProductListMode} from '../../enums';
import {productList} from '../../constants/product_temp';

import {getSubscribersValueText} from '../../utils';

type ScreenNavigationProp = StackNavigationProp<IRootNavigatorParamList, RootNavigatorRoutes.SHOP_PROFILE>;

interface IProps {
    navigation: ScreenNavigationProp;
}

const tagList: string[] = ['сапоги', 'туфли', 'балетки', 'зима', 'осень', 'весна', 'лето'];

const ShopProfile = memo((props:IProps) => {
    const {navigation} = props;
    const [searchText, setSearchText] = useState<string>('');

    return (
        <CommonScreenWrapper style={styles.container}>
            <ScrollView>
                <ShopInfoCard
                    name={'AzART'}
                    logo={''}
                    description={'Дизайнерская обувь / одежда. Этичный бренд. Пошив на заказ'}
                    address={'Нижний Сусальный пер., 5 стр. 19'}
                    phoneNumber={'8 (499) 101-01-00'}
                    email={'info@az-art.me'}
                    rating={'4,8'}
                    followers={getSubscribersValueText(70000)}
                />

                <ColoredButton
                    text={TEXT.subscribe}
                    onPress={()=>{}}
                    buttonStyle={styles.subscribeButton}
                    textStyle={styles.subscribeText}
                />

                <ColoredButton
                    text={TEXT.writeToVendor}
                    onPress={()=>{}}
                    buttonStyle={styles.writeButton}
                    textStyle={styles.writeText}
                />

                <SearchInput
                    text={searchText}
                    onTextChange={setSearchText}
                />

                <TagList
                    tagList={tagList}
                />

                <ProductList
                    productList={productList}
                />

            </ScrollView>

        </CommonScreenWrapper>
    );
});

export default ShopProfile;
