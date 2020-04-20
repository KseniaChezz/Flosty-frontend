import {StyleSheet} from 'react-native';

import {COLORS} from '../../../constants';

export const styles = StyleSheet.create({
    emptyListContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 50,
    },
    emptyListText: {
        fontFamily: 'Montserrat',
        color: COLORS.LightGrey,
        fontSize: 14,
        lineHeight: 18,
        fontWeight: '400',
        textAlign: 'center',
    },
    container: {
        backgroundColor: COLORS.White,
    },
    innerContainer: {
       marginHorizontal: 8,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.Border,
        paddingVertical: 12,
        paddingHorizontal: 4,
        flexDirection: 'row',
    },
    img: {
        height: 40,
        width: 40,
        borderRadius: 5,
        backgroundColor: COLORS.Yellow,
    },
    textContainer: {
        paddingLeft: 10,
    },
    text: {
        fontFamily: 'Montserrat',
    },
    mainText: {
        fontSize: 14,
        lineHeight: 18,
        color: COLORS.DarkGrey,
        fontWeight: '500',
        marginBottom: 10,
    },
    dateText: {
        fontSize: 10,
        lineHeight: 14,
        color: COLORS.LightGrey,
        fontWeight: '400',
    },
    titleContainer: {
        height: 44,
        paddingHorizontal: 12,
        justifyContent: 'center',
        backgroundColor: COLORS.WhiteGrey,
    },
    titleText: {
        color: COLORS.LightGrey,
        fontSize: 14,
        lineHeight: 18,
    },
});
