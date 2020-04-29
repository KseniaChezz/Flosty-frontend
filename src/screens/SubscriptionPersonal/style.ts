import {StyleSheet} from 'react-native';

import {COLORS} from '../../constants';

export const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 8,
    },
    personalSubscription: {
        backgroundColor: COLORS.WhiteGrey,
        marginTop: 10,
    },
    tagsContainerStyle: {
        backgroundColor: COLORS.White,
        padding: 10,
        borderRadius: 10,
        shadowColor: COLORS.GreyBlue,
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowRadius: 2,
        shadowOpacity: 1.0,
    }
});
