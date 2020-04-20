import React, {useState, memo} from 'react';
import {
    View,
    Text,
    TextInput,
    SectionList,
    SectionListData,
    SectionListRenderItem,
    ViewStyle,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import {useSelector} from 'react-redux';

import {styles} from './style';

import {
    ScreenWrapperWithBackButton,
} from '../../../elements';

import {IRootNavigatorParamList} from '../../../types/rootNavigator';
import {IState} from '../../../store';
import { INotification } from '../../../types/user';

import {TEXT} from '../../../constants';
import {RootNavigatorRoutes} from '../../../enums';

import {getReadableDate, getNotificationSectionList} from '../../../utils';

type ScreenNavigationProp = StackNavigationProp<IRootNavigatorParamList, RootNavigatorRoutes.USER_PROFILE_NOTIFICATIONS>;

interface IProps {
    navigation: ScreenNavigationProp;
}

const UserNotifications = memo((props: IProps) => {
    const {navigation} = props;
    const notificationList: INotification[] = useSelector((state: IState) => state.user.notificationList);

    const onBackPress = () => {
        navigation.goBack();
    };

    const renderEmptyList = () => {
        return (
            <View style={styles.emptyListContainer}>

                <Text style={styles.emptyListText}>
                    {TEXT.emptyNotificationList}
                </Text>

            </View>
        );
    };

    const renderNotification = (notification: {item: INotification}) => {
        const {
            item: {
                text,
                date,
            },
         } = notification;

        return (
            <View style={styles.container}>
                <View style={styles.innerContainer}>
                    <View style={styles.img}/>
                    <View style={styles.textContainer}>
                        <Text style={[styles.text, styles.mainText]}>
                            {text}
                        </Text>
                        <Text style={[styles.text, styles.dateText]}>
                            {getReadableDate(date)}
                        </Text>
                    </View>
                </View>
            </View>
        );
    }

    const renderTitle = (info: {section: SectionListData<INotification>}) => {
        const {title, data} = info.section;

        if (data.length === 0) {
            return null;
        }

        return (
            <View style={styles.titleContainer}>
                <Text style={[styles.text, styles.titleText]}>
                    {title}
                </Text>
            </View>
        );
    };

    const renderNotificationList = () => {
        return (
            <SectionList
                sections={getNotificationSectionList(notificationList)}
                keyExtractor={(item: INotification) => item.date.toString()}
                renderItem={renderNotification}
                renderSectionHeader={renderTitle}
            />
        );
    }

    return (
        <ScreenWrapperWithBackButton
            text={TEXT.notifications}
            onBackPress={onBackPress}
        >

            {notificationList.length === 0 ? renderEmptyList() : renderNotificationList()}

        </ScreenWrapperWithBackButton>
    );
});

export default UserNotifications;
