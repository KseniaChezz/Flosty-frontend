import React from 'react';
import {memo} from 'react';
import {
    Text,
    View,
    Image,
    StyleSheet,
} from 'react-native';

import {COLORS} from '../constants';

interface IProps {
    rating: string;
}

const Rating = memo((props: IProps) => {
    const {rating} = props;

    return (
        <View style={styles.ratingContainer}>
            <Image
                source={require('../../assets/images/star_select.png')}
                style={styles.star}
            />
            <Text style={styles.ratingText}>
                {rating}
            </Text>
        </View>
    );
});

const styles = StyleSheet.create({
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    ratingText: {
        fontFamily: 'Montserrat',
        fontSize: 14,
        color: COLORS.LightGrey,
    },
    star: {
        height: 30,
        width: 30,
    },
});

export default Rating;
