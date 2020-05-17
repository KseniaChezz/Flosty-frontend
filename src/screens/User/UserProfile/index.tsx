import React from 'react';
import {memo, useState} from 'react';
import {View, Text} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useSelector, useDispatch} from 'react-redux';

import {styles} from './style';

import {
    CommonScreenWrapper,
    ItemListWithIconAndNotification,
    ModalWindow,
} from '../../../elements';

import {logoutUser} from '../../../store/user/thunks/logout';

import {IRootNavigatorParamList} from '../../../types/rootNavigator';
import {IUserProfileItem} from '../../../types/user';
import {IState} from '../../../store';

import {
    TEXT,
    userInfoList,
    messagesAndSettingsList,
} from '../../../constants';
import {RootNavigatorRoutes} from '../../../enums';

type ScreenNavigationProp = StackNavigationProp<IRootNavigatorParamList, RootNavigatorRoutes.USER_PROFILE>;

interface IProps {
    navigation: ScreenNavigationProp;
}

const UserProfile = memo((props: IProps) => {
    const {navigation} = props;
    const userName: string = useSelector((state: IState) => state.user.main.name);
    const state = useSelector((state: IState) => state);
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
    const dispatch = useDispatch();

    const onItemPress = (name: RootNavigatorRoutes) => {
        return () => navigation.navigate(name);
    };

    const onExitPress = () => {
        setIsModalVisible(true);
    };

    const onCancelPress = () => {
        setIsModalVisible(false);
    };

    const onLogoutSuccessCallback = () => {
        navigation.navigate(RootNavigatorRoutes.LOGIN);
    };

    const onExitSubmitPress = () => {
        onCancelPress();
        dispatch(logoutUser(onLogoutSuccessCallback));
    };

    return (
        <CommonScreenWrapper>

            <Text style={[styles.text, styles.name]}>
                {userName}
            </Text>

            <View style={styles.userInfo}>
                {userInfoList.map((item: IUserProfileItem) => {
                    const {name, text, img} = item;

                    return (
                        <ItemListWithIconAndNotification
                            key={name}
                            img={img}
                            text={text}
                            onPress={onItemPress(name)}
                        />
                    );
                })}
            </View>

            <View style={styles.messageAndSettings}>
                {messagesAndSettingsList.map((item: IUserProfileItem) => {
                    const {name, text, img} = item;

                    return (
                        <ItemListWithIconAndNotification
                            key={name}
                            img={img}
                            text={text}
                            onPress={onItemPress(name)}
                        />
                    );
                })}
            </View>

            <ItemListWithIconAndNotification
                img={require('../../../../assets/images/exit.png')}
                text={TEXT.logout}
                onPress={onExitPress}
            />

            <ModalWindow
                isWindowVisible={isModalVisible}
                title={TEXT.accountExit}
                text={TEXT.areYouSureToExit}
                submitButtonText={TEXT.logout}
                onCancelPress={onCancelPress}
                onSubmitPress={onExitSubmitPress}
            />

        </CommonScreenWrapper>
    );
});

export default UserProfile;
