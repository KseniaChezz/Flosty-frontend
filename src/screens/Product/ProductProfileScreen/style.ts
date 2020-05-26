import {StyleSheet} from 'react-native';

import {COLORS} from '../../../constants/colors';

export const styles = StyleSheet.create({
    safeTop: {
        flex: 1,
        backgroundColor: COLORS.WhiteGrey,
    },
    safe: {
        backgroundColor: COLORS.White,
    },
    container: {
        flex: 1,
    },
    buttonContainer: {
        height: 94,
        backgroundColor: COLORS.White,
        padding: 10,
        shadowColor: COLORS.GreyBlue,
        shadowOffset: {
            width: 0,
            height: -5,
        },
        shadowRadius: 5,
        shadowOpacity: 0.5,
    },
});
