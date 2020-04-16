import {StyleSheet} from 'react-native';

import {COLORS} from '../../../constants/colors';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.WhiteGrey,
        paddingTop: 40,
        paddingHorizontal: 8,
    },
    shop: {
        flexDirection: 'row',
        marginBottom: 20,
        paddingTop: 8,
    },
    logoContainer: {
        width: 60,
    },
    logo: {
        height: 60,
        width: 60,
        borderRadius: 30,
        backgroundColor: COLORS.Blue,
    },
    info: {
        flex: 1,
        paddingLeft: 20,
        paddingTop: 10,
    },
    text: {
        fontFamily: 'Montserrat',
        color: COLORS.DarkGrey,
    },
    title: {
        fontSize: 18,
        lineHeight: 22,
        fontWeight: '600',

    },
    plainText: {
        fontSize: 14,
        lineHeight: 18,
    },
});
