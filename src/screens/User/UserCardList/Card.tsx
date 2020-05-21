import React, {useState, memo} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    StyleSheet,
} from 'react-native';

import {ICard} from '../../../types/user';

import {COLORS} from '../../../constants';

import {getCardString} from '../../../utils';

interface IProps {
    card: ICard;
    onPress: () => void;
}

const Card = memo((props: IProps) => {
    const {
        onPress,
        card,
    } = props;

    return (
        <TouchableOpacity
            style={styles.cardContainer}
            onPress={onPress}
        >
            <View style={styles.cardInnerContainer}>

                <View style={styles.textContainer}>

                    <Text style={styles.text}>
                        {getCardString(card)}
                    </Text>

                </View>

                <View style={styles.iconContainer}>
                    <Image
                        style={styles.icon}
                        source={require('../../../../assets/images/delete.png')}
                    />
                </View>

            </View>

        </TouchableOpacity>
    );
});

const styles = StyleSheet.create({
    cardContainer: {
        backgroundColor: COLORS.White,
        marginBottom: 5,
    },
    cardInnerContainer: {
        flexDirection: 'row',
        height: 44,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.Border,
        marginHorizontal: 8,
        paddingHorizontal: 4,
        paddingTop: 10,
        paddingBottom:5,
    },
    textContainer: {
        flex: 1,
    },
    iconContainer: {
        width: 30,
        justifyContent: 'flex-start',
        alignItems: 'flex-end',
    },
    icon: {
        height: 30,
        width: 30,
    },
    text: {
        fontFamily: 'Montserrat',
        fontSize: 14,
        lineHeight: 18,
        color: COLORS.DarkGrey,
        fontWeight: '500',
    },
    marginTop5: {
        marginTop: 5,
    },
});

export default Card;
