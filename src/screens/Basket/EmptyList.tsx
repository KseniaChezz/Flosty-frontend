import React, {memo} from 'react';
import {
    View,
    Text,
    StyleSheet,
} from 'react-native';

import {TEXT, COLORS} from '../../constants';

interface IProps {}

const EmptyList = memo((props: IProps) => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>
                {TEXT.emptyBasket}
            </Text>
        </View>
    );
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 30,
        paddingBottom: 50,
    },
    text: {
        fontFamily: 'Montserrat',
        color: COLORS.LightGrey,
        fontSize: 14,
        lineHeight: 18,
        textAlign: 'center',
    },
});

export default EmptyList;
