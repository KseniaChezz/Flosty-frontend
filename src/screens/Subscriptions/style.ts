import {StyleSheet} from 'react-native';

import {COLORS} from '../../constants/colors';

export const styles = StyleSheet.create({
    textContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 1,
    },
    text: {
        fontFamily: 'Montserrat',
        color: COLORS.DarkGrey,
    },
    title: {
        fontSize: 21,
        lineHeight: 25,
        fontWeight: '600',
        marginBottom: 15,
    },
    message: {
        fontSize: 14,
        lineHeight: 18,
        fontWeight: '400',
        textAlign: 'center',
        width: 315,
    },
    shopName: {
        fontSize: 14,
        lineHeight: 18,
        fontWeight: '600',
        marginBottom: 7,
    },
    subscribers: {
        fontSize: 10,
        lineHeight: 14,
        fontWeight: '400',
        marginBottom: 27,
        color: COLORS.LightGrey,
    },
    cardContainer: {
        flex: 1,
        alignItems: 'center',
    },

    subscriptionTitleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 10,
        marginTop: 17,
        marginBottom: 19,
    },
    subscriptionTitle: {
        fontSize: 18,
        lineHeight: 22,
        fontWeight: '600',
        marginRight: 10,
    },
    subscriptionNumber: {
        fontSize: 14,
        lineHeight: 22,
    },
    tabRow: {
        flexDirection: 'row',
        height: 44,
        marginBottom: 10,
    },

    mainContent: {
        flex: 1,
    },
});
