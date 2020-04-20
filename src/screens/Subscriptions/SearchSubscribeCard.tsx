import React, {memo} from 'react';
import {Image, StyleSheet, Text, View,} from 'react-native';
import {useDispatch} from 'react-redux';

import {ColoredButton} from '../../elements';

import {setAppTab} from '../../store/app/actions';

import {COLORS, TEXT} from '../../constants';
import {AppTab, RootNavigatorRoutes} from '../../enums';

import {navigate} from '../../utils';

interface IProps {}

const SearchSubscribeCard = memo((props: IProps) => {
    const dispatch = useDispatch();

    const onSearchPress = () => {
        dispatch(setAppTab(AppTab.SEARCH));
        navigate(RootNavigatorRoutes.SEARCH);
    };

    return (
        <View style={styles.card}>

            <View style={styles.imgContainer}>
                <Image
                    source={require('../../../assets/images/search2.png')}
                    style={styles.img}
                />
            </View>

            <Text style={[styles.text, styles.title]}>
                {TEXT.findSomethingToSubscribe}
            </Text>

            <Text style={[styles.text, styles.description]}>
                {TEXT.subscribeToFollow}
            </Text>

            <ColoredButton
                text={TEXT.search}
                onPress={onSearchPress}
                buttonStyle={styles.button}
                textStyle={styles.buttonText}
            />

        </View>
    );
});

const styles = StyleSheet.create({
    card: {
        height: 280,
        width: 200,
        borderRadius: 10,
        backgroundColor: COLORS.White,
        padding: 10,
        alignItems: 'center',
    },
    imgContainer: {
        justifyContent: 'center',
        marginBottom: 20,
    },
    img: {
        height: 60,
        width: 60,
    },
    button: {
        height: 44,
        width: 180,
    },
    disabledButton: {
        backgroundColor: COLORS.LightGrey,
        height: 44,
        width: 180,
    },
    buttonText: {
        fontSize: 14,
        letterSpacing: 0.2,
        fontWeight: '500',
    },
    title: {
        fontSize: 16,
        lineHeight: 20,
        fontWeight: '600',
        marginBottom: 16,
    },
    description: {
        fontSize: 10,
        lineHeight: 14,
        marginBottom: 27,
        color: COLORS.LightGrey,
    },
    text: {
        fontFamily: 'Montserrat',
        color: COLORS.DarkGrey,
        textAlign: 'center',
    },
});

export default SearchSubscribeCard;
