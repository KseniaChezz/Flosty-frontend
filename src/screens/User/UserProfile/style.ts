import {StyleSheet} from 'react-native';

import {COLORS} from '../../../constants/colors';

export const styles = StyleSheet.create({
    text: {
        fontFamily: 'Montserrat',
        color: COLORS.DarkGrey,
    },
    name: {
        fontSize: 18,
        lineHeight: 22,
        fontWeight: '600',
        paddingVertical: 20,
        paddingLeft: 12,
    },
    userInfo: {
        marginBottom: 10,
    },
    messageAndSettings: {
        marginBottom: 20,
    },
});
