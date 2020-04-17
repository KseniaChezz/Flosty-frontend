import React from 'react';
import {memo} from 'react';
import {
    Text,
    View,
    ImageSourcePropType,
    StyleSheet,
} from 'react-native';

import HeaderLine from './HeaderLine';
import ImageButton from './ImageButton';

import {COLORS} from '../constants';

interface IProps {
    text: string;
    img?: ImageSourcePropType;
    noShadow?: boolean;
    onBackPress: () => void;
    onImgPress?: () => void;
}

const HeaderWithBackButton = memo((props: IProps) => {
    const {
        text,
        img,
        noShadow,
        onImgPress,
        onBackPress,
    } = props;

    const renderRightImageButton = () => {
        if (!img || !onImgPress) {
            return null;
        }

        return (
            <ImageButton
                img={img}
                style={styles.image}
                onPress={onImgPress}
            />
        );
    };

    return (
        <HeaderLine
            style={styles.container}
            noShadow={!!noShadow}
        >

            <ImageButton
                img={require('../../assets/images/before.png')}
                style={styles.image}
                onPress={onBackPress}
            />

            <View style={styles.textContainer}>

                <Text style={styles.text}>
                    {text}
                </Text>

            </View>

            {renderRightImageButton()}

        </HeaderLine>
    );
});

const styles = StyleSheet.create({
    container: {
        justifyContent: 'flex-start',
    },
    textContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        paddingLeft: 10,
    },
    text: {
        fontFamily: 'Montserrat',
        color: COLORS.DarkGrey,
        fontSize: 18,
        lineHeight: 22,
        fontWeight: '600',
    },
    image: {
        height: 26,
        width: 26,
    },
});

export default HeaderWithBackButton;
