import {StyleSheet} from 'react-native';

import {COLORS} from '../../../../constants';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.White,
    },
    mainContent: {
        flex: 1,
    },
    titleRow: {
        flexDirection: 'row',
        position: 'relative',
        justifyContent: 'center',
    },
    title: {
        fontSize: 18,
        lineHeight: 22,
        marginTop: 35,
        marginBottom: 15,
    },
    close: {
        position: 'absolute',
        right: 10,
    },
    button: {
        height: 44,
        backgroundColor: COLORS.Border,
        margin: 10,
        marginBottom: 10,
    },
    buttonText: {
        color: COLORS.LightGrey,
        fontFamily: 'Montserrat',
        fontSize: 16,
        fontWeight: '600',
    },
    conditionsText: {
        fontSize: 12,
        fontFamily: 'Montserrat',
        color: COLORS.DarkGrey,
        marginBottom: 20,
        textAlign: 'center',
        paddingHorizontal: 10,
    },
    conditionButtonText: {
        color: COLORS.Blue,
    },
});

export default styles;
