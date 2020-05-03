import {
    StyleSheet,
} from 'react-native';

import {COLORS} from '../../../constants';

export const styles = StyleSheet.create({
    priceContainer: {
        paddingHorizontal: 8,
    },
    priceInnerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 44,
        borderBottomColor: COLORS.Border,
        borderBottomWidth: 1,
    },
    addDeleteContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 44,
        flex: 1,
        marginLeft: 45,
    },
    delete: {
        height: 30,
        width: 30,
    },
    text: {
        fontFamily: 'Montserrat',
        color: COLORS.DarkGrey,
        fontSize: 14,
        lineHeight: 18,
        marginRight: 15,
    },
});
