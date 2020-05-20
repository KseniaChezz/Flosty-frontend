import React, {memo, useEffect} from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import {useSelector, useDispatch} from 'react-redux';
import {StackNavigationProp} from '@react-navigation/stack/lib/typescript/src/types';
import {RouteProp} from '@react-navigation/native';

import {ScreenWrapperWithBackButton} from '../../elements';
import Tag from './Tag';

import {getTagProducts} from '../../store/products/thunks/getTagProducts';
import {resetProductFilters} from '../../store/products/actions';

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

const TagProfile = memo((props:IProps) => {
    const {
        navigation,
        route: {
            params: {
                id,
            },
        },
    } = props;
    const isProductListLoading: boolean = useSelector((stor: IState) => stor.products.isLoading);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getTagProducts(id));
    }, []);

    const onBackPress = () => {
        navigation.goBack();
        dispatch(resetProductFilters());
    };

    const renderTag = () => {
        return (
            <Tag tagId={id}/>
        );
    }

    return (
        <ScreenWrapperWithBackButton
            text={TEXT.tag}
            onBackPress={onBackPress}
            style={styles.container}
        >
            <Spinner visible={isProductListLoading} />

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
