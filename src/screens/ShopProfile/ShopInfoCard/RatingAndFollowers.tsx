import React, {memo} from 'react';
import {
    Image,
    View,
    Text,
    StyleSheet,
} from 'react-native';

import {Rating} from '../../../elements';

import {COLORS} from '../../../constants';

interface IProps {
    rating: string;
    followers: string;
}

const RatingAndFollowers = memo((props: IProps) => {
    const {
        rating,
        followers
    } = props;

    return (
        <View style={styles.container}>
            {!!rating &&
                <Image
                    style={styles.rating}
                    source={require('../../../../assets/images/star_select.png')}
                />
            }

            {!!rating &&
                <Text style={[styles.text, styles.ratingText]}>
                    {rating}
                </Text>
            }

            <Text style={[styles.text, styles.followersText]}>
                {followers}
            </Text>
        </View>
    );
});

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5,
    },
    rating: {
        height: 20,
        width: 20,
        marginLeft: -5,
    },
    text: {
        fontFamily: 'Montserrat',
        color: COLORS.LightGrey,
    },
    ratingText: {
        fontSize: 14,
        fontWeight: '500',
        marginRight: 15,
    },
    followersText: {
        fontSize: 10,
    },
});

export default RatingAndFollowers;

