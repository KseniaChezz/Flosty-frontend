import React, {memo, useState} from 'react';
import {
    View,
    TextInput,
    TouchableOpacity,
    Image,
    ViewStyle,
    StyleSheet,
} from 'react-native';

import {TEXT, COLORS} from '../constants';

interface IProps {
    text: string;
    onTextChange: (text: string) => void;
    onPress: () => void;
    style?: ViewStyle;
}

const SearchInput = memo((props:IProps) => {
    const {
        text,
        onTextChange,
        onPress,
        style,
    } = props;

    const onCleanPress = () => {
        onTextChange('');
    };

    return (
        <View style={[styles.searchInputContainer, style]}>
            <TouchableOpacity
                onPress={onPress}
            >
                <Image
                    source={require('../../assets/images/search_default.png')}
                    style={styles.img}
                />
            </TouchableOpacity>

            <TextInput
                value={text}
                onChangeText={onTextChange}
                style={styles.searchInput}
                placeholder={TEXT.search}
                placeholderTextColor={COLORS.LightGrey}
            />

            {text.length !== 0 &&
            <TouchableOpacity onPress={onCleanPress}>
                <Image
                    source={require('../../assets/images/cross_grey.png')}
                    style={styles.imgCross}
                />
            </TouchableOpacity>
            }
        </View>
    );
});

const styles = StyleSheet.create({
    searchInputContainer: {
        flexDirection: 'row',
        height: 40,
        borderRadius: 5,
        borderColor: COLORS.DarkGrey,
        borderWidth: 1,
        alignItems: 'center',
        paddingLeft: 9,
        marginBottom: 15,
    },
    img: {
        height: 25,
        width: 25,
    },
    imgCross: {
        height: 35,
        width: 35,
    },
    searchInput: {
        flex: 1,
        marginLeft: 10,
        fontSize: 14,
        lineHeight: 18,
        fontFamily: 'Montserrat',
    },
});

export default SearchInput;
