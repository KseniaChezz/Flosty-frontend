import {StyleSheet} from 'react-native';

import {COLORS} from '../../../constants/colors';

export const styles = StyleSheet.create({
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
            height: 0,
        },
        shadowRadius: 5,
        shadowOpacity: 1.0,
    },
    button: {
        marginBottom: 30,
    },
});
