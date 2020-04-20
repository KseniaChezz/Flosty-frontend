import {StyleSheet} from 'react-native';

import {COLORS} from '../../../constants';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 10,
    },
    emptyContainer: {
        flex: 1,
        paddingBottom: 88,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontFamily: 'Montserrat',
        color: COLORS.LightGrey,
        fontSize: 14,
        lineHeight: 18,
        fontWeight: '400',
        textAlign: 'center',
    },
});
