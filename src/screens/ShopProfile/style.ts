import {StyleSheet} from 'react-native';

import {COLORS} from '../../constants';

export const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 8,
    },
    subscribeButton: {
        height: 44,
        marginBottom: 10,
        marginTop: 0,
    },
    unsubscribeButton: {
        backgroundColor: COLORS.Border,
        height: 44,
        marginBottom: 10,
        marginTop: 0,
    },
    subscribeText: {
        fontSize: 16,
        lineHeight: 18,
        fontWeight: '500',
        fontFamily: 'Montserrat',
    },
    adjustButton: {
        height: 44,
        marginBottom: 10,
        marginTop: 0,
        backgroundColor: COLORS.LightBlue,
    },
    writeButton: {
        height: 44,
        marginBottom: 25,
        marginTop: 0,
        backgroundColor: COLORS.LightBlue,
    },
    writeAndAdjustText: {
        fontSize: 16,
        lineHeight: 18,
        fontWeight: '600',
        color:COLORS.White,
        fontFamily: 'Montserrat',
    },
    activityIndacitor: {
        marginTop: 50,
    },
    activityIndacitorContainer: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    },
});
