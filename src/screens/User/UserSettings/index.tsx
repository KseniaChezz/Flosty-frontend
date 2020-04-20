import React, {Fragment, useState, memo} from 'react';
import {
    View,
    Text,
    TextInput,
    ViewStyle,
} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useSelector, useDispatch} from 'react-redux';

import {styles} from './style';

import {
    ScreenWrapperWithBackButton,
    TextInputWithTitleAndValidation,
    ColoredButton,
} from '../../../elements';
import PasswordSetting from './PasswordSetting';

import {setUser} from '../../../store/user/actions';

import {IRootNavigatorParamList} from '../../../types/rootNavigator';
import {IUserField, IUserFieldList, IUser} from '../../../types/user';
import {IState} from '../../../store';

import {
    TEXT,
    userKeyList,
} from '../../../constants';
import {RootNavigatorRoutes} from '../../../enums';

import {getUserObjectForRender, getuserObjectForSave, checkPasswordChangeAndSetError, validate} from '../../../utils';

type ScreenNavigationProp = StackNavigationProp<IRootNavigatorParamList, RootNavigatorRoutes.USER_PROFILE_SETTINGS>;

interface IProps {
    navigation: ScreenNavigationProp;
}

const UserSettings = memo((props: IProps) => {
    const {navigation} = props;
    const initialUser: IUser = useSelector((state: IState) => state.user.main);
    const [userFieldList, setUserFieldList] = useState<IUserFieldList>(getUserObjectForRender(initialUser));
    const [errorField, setErrorField] = useState<string>('');
    const [isEditMode, setIsEditMode] = useState<boolean>(false);
    const [isPasswordEditMode, setIsPasswordEditMode] = useState<boolean>(false);
    const [oldPassword, setOldPassword] = useState<string>('');
    const [newPassword, setNewPassword] = useState<string>('');
    const [repeatNewPassword, setRepeatNewPassword] = useState<string>('');
    const [errorPasswordFieldList, setErrorPasswordFieldList] = useState<string[]>([]);
    const [passwordErrorText, setPasswordErrorText] = useState<string>('');
    const dispatch = useDispatch();

    const onBackPress = () => {
        navigation.goBack();
    };

    const onEditPress = () => {
        setIsEditMode(true);
    };

    const onEditPasswordPress = () => {
        setIsPasswordEditMode(true);
        onEditPress();
    }

    const onSavePress = () => {
        if(!validate(userKeyList, userFieldList, setErrorField)) {
            return;
        }

        if (isPasswordEditMode && checkPasswordChangeAndSetError(
                oldPassword,
                newPassword,
                repeatNewPassword,
                setPasswordErrorText,
                setErrorPasswordFieldList,
        )) {
            dispatch(setUser(getuserObjectForSave(userFieldList)));
            setOldPassword('');
            setNewPassword('');
            setRepeatNewPassword('');
            setIsPasswordEditMode(false);
            setIsEditMode(false);

            return;
        }

        dispatch(setUser(getuserObjectForSave(userFieldList)));
        setIsEditMode(false);
    };

    const onFieldValueChange = (fieldKey: string) => {
        return (value: string) => {
            const nextField: IUserField = {...userFieldList[fieldKey], value};

            setUserFieldList({...userFieldList, [fieldKey]: nextField});
        };
    };

    const renderItem = (field: IUserField) => {
        const {
            title,
            value,
        } = field;

        return (
            <TextInputWithTitleAndValidation
                key={title}
                value={value}
                onValueChange={onFieldValueChange(title)}
                title={title}
                isErrorShown={errorField === title}
                errorText={TEXT.fieldNotBeEmpty}
                isDisabled={!isEditMode}
            />
        );
    };

    const renderButton = () => {
        if (isEditMode) {
            return (
                <ColoredButton
                    text={TEXT.save}
                    onPress={onSavePress}
                />
            );
        }

        return (
            <ColoredButton
                text={TEXT.edit}
                onPress={onEditPress}
                buttonStyle={styles.greyButton}
            />
        )
    };

    return (
        <ScreenWrapperWithBackButton
            text={TEXT.settings}
            onBackPress={onBackPress}
            style={styles.container}
        >
            {userKeyList.map((key: string) => {
                const field: IUserField = userFieldList[key];

                return renderItem(field);
            })}

            <View style={styles.flex1}>

                <PasswordSetting
                    isEditMode={isPasswordEditMode}
                    oldPassword={oldPassword}
                    newPassword={newPassword}
                    repeatNewPassword={repeatNewPassword}
                    errorPasswordFieldList={errorPasswordFieldList}
                    passwordErrorText={passwordErrorText}
                    onEditPress={onEditPasswordPress}
                    setOldPassword={setOldPassword}
                    setNewPassword={setNewPassword}
                    setRepeatNewPassword={setRepeatNewPassword}
                    setErrorPasswordFieldList={setErrorPasswordFieldList}
                    setPasswordErrorText={setPasswordErrorText}
                />

            </View>

            <View style={styles.buttonContainer}>
                {renderButton()}
            </View>

        </ScreenWrapperWithBackButton>
    );
});

export default UserSettings;
