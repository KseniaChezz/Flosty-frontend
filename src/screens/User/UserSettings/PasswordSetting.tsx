import React from 'react';
import {Fragment, useState, memo} from 'react';
import {
    View,
    Text,
    TextInput,
    ViewStyle,
    StyleSheet,
} from 'react-native';

import {
    TextInputWithTitleAndValidation,
    PlainButton,
} from '../../../elements';

import {TEXT, COLORS} from '../../../constants';

interface IProps {
    isEditMode: boolean;
    oldPassword: string;
    newPassword: string;
    repeatNewPassword: string;
    errorPasswordFieldList: string[];
    passwordErrorText: string;

    onEditPress: () => void;
    setOldPassword: (password: string) => void;
    setNewPassword: (password: string) => void;
    setRepeatNewPassword: (password: string) => void;
    setErrorPasswordFieldList: (fieldList: string[]) => void;
    setPasswordErrorText: (text: string) => void;
}

const PasswordSetting = memo((props: IProps) => {
    const {
        isEditMode,
        oldPassword,
        newPassword,
        repeatNewPassword,
        errorPasswordFieldList,
        passwordErrorText,
        onEditPress,
        setOldPassword,
        setNewPassword,
        setRepeatNewPassword,
        setErrorPasswordFieldList,
        setPasswordErrorText,
    } = props;

    const onChangeButtonPress = () => {
        onEditPress();
    };

    if (isEditMode) {
        return (
            <Fragment>
                <TextInputWithTitleAndValidation
                    value={oldPassword}
                    onValueChange={setOldPassword}
                    title={TEXT.oldPassword}
                    isErrorShown={errorPasswordFieldList.some(item => item === TEXT.oldPassword)}
                    errorText={passwordErrorText}
                    withHide={true}
                />
                <TextInputWithTitleAndValidation
                    value={newPassword}
                    onValueChange={setNewPassword}
                    title={TEXT.newPassword}
                    isErrorShown={errorPasswordFieldList.some(item => item === TEXT.newPassword)}
                    errorText={passwordErrorText}
                    withHide={true}
                />
                <TextInputWithTitleAndValidation
                    value={repeatNewPassword}
                    onValueChange={setRepeatNewPassword}
                    title={TEXT.repeatNewPassword}
                    isErrorShown={errorPasswordFieldList.some(item => item === TEXT.repeatNewPassword)}
                    errorText={passwordErrorText}
                    withHide={true}
                />
            </Fragment>
        );
    }

    return (
        <View style={styles.changePasswordContainer}>
            <PlainButton
                text={TEXT.changePassword}
                onPress={onChangeButtonPress}
                textStyle={styles.buttonText}
            />
        </View>
    );
});

const styles = StyleSheet.create({
    changePasswordContainer: {
        height: 52,
        backgroundColor: COLORS.White,
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingLeft: 12,
    },
    buttonText: {
        fontSize: 14,
    }
});

export default PasswordSetting;
