import {StyleSheet} from 'react-native';

import {COLORS} from '../../../constants';

export const styles = StyleSheet.create({
    container: {
        marginTop: 10,
    },
    inputContainer: {
        backgroundColor: COLORS.White,
        paddingHorizontal: 8,
    },
    inputInnerContainer: {
        height: 52,
        paddingHorizontal: 5,
        borderBottomColor: COLORS.Border,
        borderBottomWidth: 1,
    },
    titleContainer: {
        height: 30,
    },
    fieldsContainer: {
        flexDirection: 'row',
    },
    buttonContainer: {
        backgroundColor: COLORS.White,
        paddingHorizontal: 15,
    },
    title: {
        fontSize: 10,
        fontFamily: 'Montserrat',
        color: COLORS.LightGrey,
        marginTop: 10,
        marginBottom: 5,
    },
    text: {
        fontSize: 10,
        lineHeight: 14,
        fontFamily: 'Montserrat',
        color: COLORS.DarkGrey,
        marginBottom: 10,
    },
    textInput: {
        fontSize: 14,
        fontFamily: 'Montserrat',
        color: COLORS.DarkGrey,
    },
    flex1: {
        flex: 1,
    },
    textContainer: {
        paddingTop: 20,
        paddingHorizontal: 12,
    },
    greyButton: {
        backgroundColor: COLORS.Border,
    },
});
