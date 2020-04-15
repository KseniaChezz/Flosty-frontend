import React from 'react';
import {memo} from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    Image,
    StyleSheet,
} from 'react-native';

import {COLORS} from '../constants';

interface IProps {
    text: string;
    hasAdditionalMenu: boolean;
    onPress: () => void;
}

const SearchMenuItem = memo((props: IProps) => {
    const {
        text,
        hasAdditionalMenu,
        onPress,
    } = props;

    return (
        <TouchableOpacity
            onPress={onPress}
            style={styles.menuContainer}
        >
            <View style={styles.menuInnerContainer}>
                <Text style={styles.text}>
                    {text}
                </Text>

                {hasAdditionalMenu &&
                <Image
                    source={require('../../assets/images/next.png')}
                    style={styles.img}
                />
                }
            </View>
        </TouchableOpacity>
    );
});

const styles = StyleSheet.create({
    menuContainer: {
        backgroundColor: COLORS.White,
        paddingHorizontal: 8,
    },
    menuInnerContainer: {
        height: 44,
        borderBottomColor: COLORS.Border,
        borderBottomWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    text: {
        color: COLORS.DarkGrey,
        fontFamily: 'Montserrat',
        fontSize: 14,
        lineHeight: 18,
        paddingLeft: 4,
    },
    img: {
        height: 25,
        width: 25,
    },
});

export default SearchMenuItem;
