import React, {memo, useEffect} from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import {useSelector, useDispatch} from 'react-redux';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';

import {ScreenWrapperWithBackButton} from '../../elements';
import Tag from './Tag';

import {getTagProducts} from '../../store/products/thunks/getTagProducts';

import {IRootNavigatorParamList} from '../../types/rootNavigator';
import {IState} from '../../store';

import {TEXT, COLORS} from '../../constants';
import {RootNavigatorRoutes} from '../../enums';

type ScreenNavigationProp = StackNavigationProp<IRootNavigatorParamList, RootNavigatorRoutes.TAG_PROFILE>;
type ScreenRouteProp = RouteProp<IRootNavigatorParamList, RootNavigatorRoutes.TAG_PROFILE>;

interface IProps {
    navigation: ScreenNavigationProp;
    route: ScreenRouteProp;
}

// const tag = {
//     id: 1,
//     name: 'hg;owir',
//     image: 'flsj;l',
//     subscribers: 8,
// }

const TagProfile = memo((props:IProps) => {
    const {
        navigation,
        route: {
            params: {
                tag,
            },
        },
    } = props;
    const {
        id,
        name,
        image,
        subscribers,
    } = tag;
    const isProductListLoading: boolean = useSelector((stor: IState) => stor.products.isLoading);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getTagProducts(id));
    }, []);

    const onBackPress = () => {
        navigation.goBack();
    };

    const renderTag = () => {
        return (
            <Tag
                tag={tag}
            />
        );
    }

    return (
        <ScreenWrapperWithBackButton
            text={TEXT.tag}
            onBackPress={onBackPress}
            style={styles.container}
        >
            <Spinner
                visible={isProductListLoading}
            />

            {renderTag()}
        </ScreenWrapperWithBackButton>
    );
});

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 8,
    },
});

export default TagProfile;
