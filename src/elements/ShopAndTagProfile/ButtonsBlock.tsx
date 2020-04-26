import React, {memo, Fragment} from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';

import ColoredButton from '../ColoredButton';
import IsSubscribeButtonsRow from './IsSubscribeButtonsRow';

import {TEXT, COLORS} from '../../constants';

interface IProps {
    isSubscribed: boolean;
    hasBindedSubscriptions: boolean;
    onAdjustSubscriptionPress: () => void;
    onBindedSubscriptionsPress: () => void;
    onSubscribePress: () => void;
    onUnsubscribePress: () => void;
    isWriteButtonShown?: boolean;
}

const ButtonsBlock = memo((props: IProps) => {
    const {
        isSubscribed,
        hasBindedSubscriptions,
        onAdjustSubscriptionPress,
        onBindedSubscriptionsPress,
        onSubscribePress,
        onUnsubscribePress,
        isWriteButtonShown,
    } = props;

    return (
        <Fragment>
            <ColoredButton
                text={isSubscribed ? TEXT.unsubscribe : TEXT.subscribe}
                onPress={isSubscribed ? onUnsubscribePress : onSubscribePress}
                buttonStyle={isSubscribed ? styles.unsubscribeButton : styles.subscribeButton}
                textStyle={styles.subscribeText}
            />

            <IsSubscribeButtonsRow
                isSubscribed={isSubscribed}
                hasBindedSubscriptions={hasBindedSubscriptions}
                onAdjustSubscriptionPress={onAdjustSubscriptionPress}
                onBindedSubscriptionsPress={onBindedSubscriptionsPress}
            />

            {isWriteButtonShown &&
                <ColoredButton
                    text={TEXT.writeToVendor}
                    onPress={() => {
                    }}
                    buttonStyle={styles.writeButton}
                    textStyle={styles.writeText}
                />
            }
        </Fragment>
    );
});

const styles = StyleSheet.create({
    subscribeButton: {
        height: 44,
        marginBottom: 10,
        marginTop: 0,
    },
    unsubscribeButton: {
        backgroundColor: COLORS.Border,
        height: 44,
        marginBottom: 10,
        marginTop: 0,
    },
    subscribeText: {
        fontSize: 16,
        lineHeight: 18,
        fontWeight: '500',
        fontFamily: 'Montserrat',
    },
    writeButton: {
        height: 44,
        marginBottom: 25,
        marginTop: 0,
        backgroundColor: COLORS.LightBlue,
    },
    writeText: {
        fontSize: 16,
        lineHeight: 18,
        fontWeight: '600',
        color:COLORS.White,
        fontFamily: 'Montserrat',
    },
});

export default ButtonsBlock;
