import React, {useState, memo} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';

import {Title} from '../../../../elements';
import {TEXT} from '../../../../constants';

interface IProps {
    hide: () => void;
}

const OrderHeader = memo((props: IProps) => {
    const {hide} = props;

    return (
        <View style={styles.titleRow}>
            <Title
                text={TEXT.orderProcessing}
                textStyle={styles.title}
            />
            <TouchableOpacity
                style={styles.close}
                onPress={hide}
            >
                <Text style={styles.title}>X</Text>
            </TouchableOpacity>
        </View>
    );
});

const styles = StyleSheet.create({
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
});

export default OrderHeader;
