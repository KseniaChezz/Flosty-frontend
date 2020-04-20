import {StyleSheet} from 'react-native';

import {COLORS} from '../../../constants';

export const styles = StyleSheet.create({
    conditions: {
        flexDirection: 'row',
    },
    conditionsText: {
        fontSize: 12,
        fontFamily: 'Montserrat',
        color: COLORS.DarkGrey,
        marginBottom: 20,
    },
    conditionButton: {
        height: 'auto',
        justifyContent: 'flex-start',
    },
    conditionButtonText: {
        color: COLORS.Blue,
    },
    subtitle: {
        marginTop: 90,
    },
    title: {
        marginTop: 10,
        marginBottom: 35,
    },
    redBorder: {
        borderColor: COLORS.Red,
    },
});
