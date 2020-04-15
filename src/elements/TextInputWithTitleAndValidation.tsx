import React, {useState, memo} from 'react';
import {
    View,
    Text,
    TextInput,
    Image,
    TouchableOpacity,
    ViewStyle,
    ImageSourcePropType,
    StyleSheet,
} from 'react-native';

import {TEXT, COLORS} from '../constants';

interface IProps {
    value: string;
    title: string;
    isErrorShown?: boolean;
    errorText?: string;
    isDisabled?: boolean;
    withHide?: boolean;

    onValueChange: (value: string) => void;

    style?: ViewStyle;
}

const TextInputWithTitleAndValidation = memo((props: IProps) => {
    const {
        value,
        title,
        isErrorShown,
        errorText,
        isDisabled,
        withHide,
        onValueChange,
        style,
    } = props;
    const [isHidden, setIsHidden] = useState<boolean>(true);
    const img: ImageSourcePropType = isHidden
        ? require('../../assets/images/unvisible.png')
        : require('../../assets/images/visible.png');

    const onHideIconChange = () => {
        setIsHidden(!isHidden);
    };

    const renderTitleOrError = () => {
        if (isErrorShown) {
            return (
                <Text style={[styles.title, styles.error]}>{errorText}</Text>
            );
        }

        if (!value) {
            return null;
        }

        return (
            <Text style={styles.title}>{title}</Text>
        );
    };

    const renderHideIcon = () => {
        if (withHide) {
            return (
                <TouchableOpacity onPress={onHideIconChange}>
                    <Image
                        style={styles.icon}
                        source={img}/>
                </TouchableOpacity>
            )
        }

        return null;
    };

    return (
        <View style={[styles.inputContainer, style]}>

            <View style={[
                styles.inputInnerContainer,
                isDisabled ? null : styles.inputContainerEditable,
                isErrorShown ? styles.errorContainer : null,
            ]}>

                <View style={styles.titleContainer}>
                    {renderTitleOrError()}
                </View>

                <View style={styles.textInputContainer}>
                    <TextInput
                        value={value}
                        onChangeText={onValueChange}
                        placeholder={title}
                        editable={!isDisabled}
                        style={styles.textInput}
                        secureTextEntry={withHide && isHidden}
                    />

                    {renderHideIcon()}
                </View>

            </View>

        </View>
    );
});

const styles = StyleSheet.create({
    inputContainer: {
        backgroundColor: COLORS.White,
        paddingHorizontal: 8,
    },
    inputInnerContainer: {
        height: 52,
        paddingHorizontal: 5,
    },
    inputContainerEditable: {
        borderBottomColor: COLORS.Border,
        borderBottomWidth: 1,
    },
    errorContainer: {
        borderBottomColor: COLORS.Red,
    },
    titleContainer: {
        height: 30,
    },
    title: {
        fontSize: 10,
        fontFamily: 'Montserrat',
        color: COLORS.LightGrey,
        marginTop: 10,
        marginBottom: 5,
    },
    error: {
        color: COLORS.Red,
    },
    textInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    textInput: {
        fontSize: 14,
        fontFamily: 'Montserrat',
        color: COLORS.DarkGrey,
        flex: 1,
    },
    icon: {
        height: 15,
        width: 30,
    }
});

export default TextInputWithTitleAndValidation;
