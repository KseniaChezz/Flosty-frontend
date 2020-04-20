import {StyleSheet} from 'react-native';

import {COLORS} from '../../../constants';

export const styles = StyleSheet.create({
    wrapper: {
        paddingTop: 10,
    },
    container: {
        flex: 1,
        backgroundColor: COLORS.WhiteGrey,
        paddingTop: 40,
    },
    innerContainer: {
        flex: 1,
        paddingTop: 10,
    },
    emptyListContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 88,
    },
    emptyListText: {
        fontFamily: 'Montserrat',
        color: COLORS.LightGrey,
        fontSize: 14,
        lineHeight: 18,
        fontWeight: '400',
        textAlign: 'center',
    },
});
