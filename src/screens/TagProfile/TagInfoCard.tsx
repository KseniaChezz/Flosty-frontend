import React, {memo} from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
} from 'react-native';

import {TEXT, COLORS} from '../../constants';

import {ISubscriptionTag} from '../../types/subscription';

import {getSubscribersValueText} from '../../utils';

interface IProps {
    tag: ISubscriptionTag;
}

const TagInfoCard = memo((props:IProps) => {
    const {tag} = props;
    const {
        id,
        name,
        image,
        subscribers,
    } = tag;

    return (
        <View style={styles.tagContainer}>
            <Image
                source={{uri: image}}
                style={styles.img}
            />

            <View style={styles.textContainer}>
                <Text style={[styles.text, styles.tagText]}>
                    #{name}
                </Text>

                <Text style={[styles.text, styles.subscribersText]}>
                    {getSubscribersValueText(subscribers)}
                </Text>
            </View>
        </View>
    );
});

const styles = StyleSheet.create({
    tagContainer: {
        flexDirection: 'row',
        marginTop: 10,
        marginBottom: 10,
    },
    img: {
        height: 60,
        width:60,
        borderRadius: 30,
        marginRight: 20,
    },
    textContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    text: {
        fontFamily: 'Montserrat',
    },
    tagText: {
        fontSize: 18,
        lineHeight: 22,
        fontWeight: '600',
        color: COLORS.DarkGrey,
        marginBottom: 10,
    },
    subscribersText: {
        fontSize: 10,
        lineHeight: 14,
        color: COLORS.LightGrey,
    }
});

export default TagInfoCard;
