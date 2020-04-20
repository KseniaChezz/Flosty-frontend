import {StyleSheet} from 'react-native';
import { COLORS } from '../../../constants';

export const styles = StyleSheet.create({
    enterButton: {
        marginBottom: 60,
    },
    logoContainer: {
        height: 275,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 50,
    },
    logoImage: {
        height: 65,
        width: 220,
    },
    redBorder: {
        borderColor: COLORS.Red,
    },
});
