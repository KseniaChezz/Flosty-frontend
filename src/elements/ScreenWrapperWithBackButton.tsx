import React from 'react';
import {memo, ReactNode} from 'react';
import {
    View,
    ImageSourcePropType,
    ViewStyle,
    StyleSheet,
} from 'react-native';

import HeaderWithBackButton from './HeaderWithBackButton';

import {COLORS} from '../constants';

interface IProps {
    children: ReactNode[] | ReactNode;
    text: string;
    img?: ImageSourcePropType;

    onBackPress: () => void;
    onImgPress?: () => void;

    style?: ViewStyle;
}

const ScreenWrapperWithBackButton = memo((props: IProps) => {
    const {
        children,
        text,
        img,
        onImgPress,
        onBackPress,
        style,
    } = props;

    return (
        <View style={styles.container}>

            <HeaderWithBackButton
                text={text}
                img={img}
                onImgPress={onImgPress}
                onBackPress={onBackPress}
            />

            <View style={[styles.innerContainer, style]}>
                {children}
            </View>

        </View>
    );
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.WhiteGrey,
    },
    innerContainer: {
        flex: 1,
    },
});

export default ScreenWrapperWithBackButton;
