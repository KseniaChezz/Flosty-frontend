import {StyleSheet} from 'react-native';

import {COLORS} from '../../constants';

export const styles = StyleSheet.create({
    productContainer: {
        flexDirection: 'row',
        paddingHorizontal: 8,
        paddingBottom: 20,
    },
    productImage: {
        height: 60,
        width: 60,
        borderRadius: 10,
        marginRight: 15,
    },
    textContainer: {
        flex: 1,
    },
    checkbox: {
        height: 30,
        width: 30,
        marginRight: 15,
    },
    text: {
        fontFamily: 'Montserrat',
        color: COLORS.DarkGrey,
    },
    plainText: {
        fontSize: 14,
        lineHeight: 18,
    },
    titleText: {
        fontSize: 16,
        lineHeight: 20,
        fontWeight: '600',
    },
    marginBottom5: {
        marginBottom: 5,
    },
});
