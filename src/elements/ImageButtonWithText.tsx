import React from 'react';
import {memo} from 'react';
import {
    Text,
    TouchableOpacity,
    View,
    Image,
    ImageSourcePropType,
    ViewStyle,
    TextStyle,
    StyleSheet,
} from 'react-native';

import {COLORS} from '../constants/colors';

interface IProps {
    text: string;
    isSelected: boolean;
    img: ImageSourcePropType;

    onPress: () => void;

    buttonStyle?: ViewStyle;
    textStyle?: TextStyle;
}

const ImageButtonWithText = memo((props: IProps) => {
    const {
        img,
        text,
        onPress,
        isSelected,
        buttonStyle,
        textStyle,
    } = props;

    return (
        <TouchableOpacity
            onPress={onPress}
            style={[styles.buttonContainer, buttonStyle, !isSelected ? styles.plain: null]}
        >
            <View style={styles.imageContainer}>
                <Image
                    style={styles.image}
                    source={img}
                />
            </View>
            
            <View style={[styles.textContainer, isSelected ? styles.selected : null]}>
                <Text style={[styles.text, textStyle]}>
                    {text}
                </Text>
            </View>
        </TouchableOpacity>
    );
});

const styles = StyleSheet.create({
    buttonContainer: {
        height: 60,
        flexDirection: 'row',
        borderRadius: 10,
        marginBottom: 20,
    },
    imageContainer: {
        width: 68,
        backgroundColor: COLORS.LightBlue,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
    },
    textContainer: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: COLORS.White,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
    },
    selected: {
        backgroundColor: COLORS.LightBlue,
    },
    plain: {
        shadowColor: COLORS.GreyBlue,
        shadowOffset: {
            width: 5,
            height: 5,
        },
        shadowRadius: 5,
        shadowOpacity: 1.0,
    },
    image: {
        height: 60,
        width: 68,
    },
    text: {
        color: COLORS.DarkGrey,
        fontFamily: 'Montserrat',
        fontSize: 20,
        textAlign: 'center',
    }
});

export default ImageButtonWithText;

