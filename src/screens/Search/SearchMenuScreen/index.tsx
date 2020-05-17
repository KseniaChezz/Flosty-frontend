import React, {memo} from 'react';
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    Image,
    ListRenderItemInfo,
} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';

import {ScreenWrapperWithBackButton, RowMenuItem} from '../../../elements';

import {ISearchNavigatorParamList} from '../../../types/searchNavigator';
import {ISearchClarificationItem} from '../../../types/search';

import {SearchNavigatorRoutes} from '../../../enums';
import {TEXT} from '../../../constants';

type ScreenNavigationProp = StackNavigationProp<ISearchNavigatorParamList, SearchNavigatorRoutes.SEARCH_MENU_SCREEN>;
type ScreenRouteProp = RouteProp<ISearchNavigatorParamList, SearchNavigatorRoutes.SEARCH_MENU_SCREEN>;

interface IProps {
    navigation: ScreenNavigationProp;
    route: ScreenRouteProp;
}

const SearchMenuScreen = memo((props: IProps) => {
    const {
        navigation,
        route: {
            params: {
                title: pageTitle,
                menuList,
                search,
            },
        },
    } = props;

    const onBackPress = () => {
        navigation.goBack();
    };

    const onMenuPress = (menu: ISearchClarificationItem) => {
        const {title, additionalMenu} = menu;

        if (additionalMenu) {
            return () => {
                navigation.push(
                    SearchNavigatorRoutes.SEARCH_MENU_SCREEN,
                    {title, search, menuList: additionalMenu},
                );
            }
        }

        return () => {
            search(title === TEXT.all ? pageTitle : title);
            navigation.popToTop();
        };

    }

    const keyExtractor = (item: ISearchClarificationItem) => {
        return item.title;
    }

    const renderMenu = (info: ListRenderItemInfo<ISearchClarificationItem>) => {
        const {item} = info;
        const {title, additionalMenu} = item;
        return (
            <RowMenuItem
                text={title}
                isIconShown={!!additionalMenu}
                onPress={onMenuPress(item)}
            />
        )
    };

    return (
        <ScreenWrapperWithBackButton
            text={pageTitle}
            onBackPress={onBackPress}
        >

            <FlatList<ISearchClarificationItem>
                data={menuList}
                keyExtractor={keyExtractor}
                renderItem={renderMenu}
            />

        </ScreenWrapperWithBackButton>
    );
});

export default SearchMenuScreen;
