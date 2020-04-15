import React from 'react';
import {memo} from 'react';
import {View, ImageSourcePropType, StyleSheet} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';

import ImageButton from './ImageButton';

import { setAppTab } from '../store/app/actions';

import {COLORS, appTabList} from '../constants';
import {AppTab, RootNavigatorRoutes} from '../enums';

import {IAppTab} from '../types/app';
import {IState} from '../store';

import {navigate} from '../utils/navigation';

const Footer = memo(() => {
    const selectedTab: AppTab = useSelector((state: IState) => state.app.selectedTab);
    const dispatch = useDispatch();

    const onTabPress = (tab: AppTab, screen: RootNavigatorRoutes) => {
        return () => {
            dispatch(setAppTab(tab));
            navigate(screen);
        }
    };

    return (
        <View style={styles.container}>

            {appTabList.map((tab: IAppTab) => {
                const {
                    name,
                    selectedImg,
                    defaultImg,
                    screen,
                } = tab;
                const img = selectedTab === name ? selectedImg : defaultImg;

                return (
                    <ImageButton
                        key={name}
                        img={img}
                        onPress={onTabPress(name, screen)}
                        style={styles.image}
                    />
                )
            })}

        </View>
    );
});

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: COLORS.White,
        height: 58,
        paddingBottom: 20,
        paddingTop: 8,
        paddingHorizontal: 8,
        shadowColor: COLORS.GreyBlue,
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowRadius: 5,
        shadowOpacity: 1.0,
    },
    image: {
        height: 30,
        width: 30,
    },
});

export default Footer;
