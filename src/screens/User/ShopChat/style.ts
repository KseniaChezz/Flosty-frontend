import {StyleSheet} from 'react-native';

import {COLORS} from '../../../constants';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    inputContainer: {
        flexDirection: 'row',
        minHeight: 68,
        maxHeight: 120,
        backgroundColor: COLORS.White,
        paddingBottom: 20,
        alignItems: 'center',
    },
    input: {
        flex: 1,
        paddingHorizontal: 20,
        color: COLORS.DarkGrey,
        fontSize: 14,
        lineHeight: 18,
        fontFamily: 'Montserrat',
    },
    imgContainer: {
        paddingRight: 15,
    },
    img: {
        height: 30,
        width: 30,
    },
});
