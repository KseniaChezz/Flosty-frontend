import {StyleSheet} from 'react-native';

import {COLORS} from '../../../constants/colors';

export const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.White,
    },
    sizeContainer: {
        paddingHorizontal: 12,
        paddingVertical: 15,
    },
    text: {
        fontFamily: 'Montserrat',
    },
    pickText: {
        color: COLORS.LightGrey,
        fontSize: 14,
        lineHeight: 18,
        fontWeight: '600',
        marginBottom: 10,
    },
    bagesContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    bage: {
        height: 40,
        width: 40,
        borderRadius: 20,
        backgroundColor: COLORS.Border,
        marginRight: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    bageSelected: {
        borderColor: COLORS.DarkGrey,
        borderWidth: 1,
    },
    bageText: {
        color: COLORS.DarkGrey,
        fontSize: 14,
        lineHeight: 18,
        fontWeight: '500',
    },
    bageTextDisabled: {
        color: COLORS.LightGrey,
        fontSize: 14,
        lineHeight: 18,
        fontWeight: '500',
    },
});
