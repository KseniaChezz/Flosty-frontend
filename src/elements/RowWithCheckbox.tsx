import React, {memo, ReactNode, useState} from 'react';
import {
    View,
    Text,
    Image,
    ImageSourcePropType,
    TouchableOpacity,
    ViewStyle,
    StyleSheet,
} from 'react-native';

import {TEXT, COLORS} from '../constants';

interface IProps {
    isSelected: boolean;
    isBorder?: boolean;
    onCheckboxPress: () => void;
    leftContent: () => ReactNode;
    rightContent?: () => ReactNode;
}

const RowWithCheckbox = memo((props: IProps) => {
    const {
        isSelected,
        leftContent,
        rightContent,
        isBorder,
        onCheckboxPress,
    } = props;
    const checkboxImage: ImageSourcePropType = isSelected
        ? require('../../assets/images/checkbox_select.png')
        : require('../../assets/images/checkbox_default.png');

    return (
        <View style={styles.container}>
            <View style={[styles.innerContainer, isBorder ? styles.border : null]}>
                <View style={styles.checkboxContainer}>
                    <TouchableOpacity onPress={onCheckboxPress}>
                        <Image
                            source={checkboxImage}
                            style={styles.checkbox}
                        />
                    </TouchableOpacity>

                    {leftContent()}
                </View>

                {!!rightContent && rightContent()}
            </View>
        </View>
    );
});

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.White,
        paddingHorizontal: 8,
        marginBottom: 10,
    },
    innerContainer: {
        flexDirection: 'row',
    },
    border: {
        borderBottomWidth: 1,
        borderBottomColor: COLORS.Border,
    },
    checkboxContainer: {
        height: 44,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    checkbox: {
        height: 30,
        width: 30,
    },
    text: {
        fontFamily: 'Montserrat',
        color: COLORS.DarkGrey,
        fontSize: 14,
        lineHeight: 18,
    },
});

export default RowWithCheckbox;
