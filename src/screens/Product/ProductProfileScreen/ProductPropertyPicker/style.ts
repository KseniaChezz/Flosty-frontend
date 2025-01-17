import {StyleSheet} from 'react-native';

import {COLORS} from '../../../../constants';

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.White,
        marginBottom: 10,
    },
    propertyContainer: {
        marginHorizontal: 8,
    },
    innerPropertyContainer: {
        paddingHorizontal: 4,
        paddingTop: 15,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.Border,
    },
    text: {
        fontFamily: 'Montserrat',
    },
    pickText: {
        color: COLORS.LightGrey,
        fontSize: 14,
        lineHeight: 18,
        fontWeight: '600',
        marginBottom: 10,
    },
    bagesContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    bageColor: {
        width: 40,
    },
    bage: {
        height: 40,
        minWidth: 40,
        borderRadius: 20,
        backgroundColor: COLORS.Border,
        marginRight: 10,
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: COLORS.Border,
        borderWidth: 1,
    },
    bageSelected: {
        borderColor: COLORS.DarkGrey,
        borderWidth: 1,
    },
    bageText: {
        color: COLORS.DarkGrey,
        fontSize: 14,
        lineHeight: 18,
        fontWeight: '500',
    },
});

export default styles;
