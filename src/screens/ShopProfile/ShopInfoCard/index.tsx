import React, {useState, memo} from 'react';
import {
    View,
    Text,
    Image,
} from 'react-native';

import {styles} from './style';

import RatingAndFollowers from './RatingAndFollowers';

interface IProps {
    logo: string;
    name: string;
    description: string;
    address: string;
    phoneNumber: string;
    email: string;
    rating: string;
    followers: string;
}

const ShopInfoCard = memo((props: IProps) => {
    const {
        logo,
        name,
        description,
        address,
        phoneNumber,
        email,
        rating,
        followers,
    } = props;

    return (
        <View style={styles.shop}>

            <View style={styles.logoContainer}>
                <Image
                    source={{uri: logo}}
                    style={styles.logo}
                />
            </View>

            <View style={styles.info}>

                <Text style={[styles.text, styles.title]}>
                    {name}
                </Text>

                <Text style={[styles.text, styles.plainText]}>
                    {description}
                </Text>

                <RatingAndFollowers
                    rating={rating}
                    followers={followers}
                />

                <Text style={[styles.text, styles.plainText]}>
                    {address}
                </Text>

                <Text style={[styles.text, styles.plainText]}>
                    {phoneNumber}
                </Text>

                <Text style={[styles.text, styles.plainText]}>
                    {email}
                </Text>

            </View>

        </View>
    );
});

export default ShopInfoCard;
