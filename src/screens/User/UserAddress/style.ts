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
    saveButtonContainer: {
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
    textInput: {
        fontSize: 14,
        fontFamily: 'Montserrat',
        color: COLORS.DarkGrey,
    },
    flex1: {
        flex: 1,
    },
    flex5: {
        flex: 5,
    },
});
