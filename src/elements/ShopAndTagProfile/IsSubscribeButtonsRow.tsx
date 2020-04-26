import React, {memo} from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';

import ColoredButton from '../ColoredButton';

import {TEXT, COLORS} from '../../constants';

interface IProps {
    isSubscribed: boolean;
    hasBindedSubscriptions: boolean;
    onAdjustSubscriptionPress: () => void;
    onBindedSubscriptionsPress: () => void;
}

const IsSubscribeButtonsRow = memo((props: IProps) => {
    const {
        isSubscribed,
        hasBindedSubscriptions,
        onAdjustSubscriptionPress,
        onBindedSubscriptionsPress,
    } = props;

    if (!isSubscribed) return null;

    return (
        <View style={styles.isSubscribedContainer}>
            <ColoredButton
                text={TEXT.adjustSubscription}
                onPress={onAdjustSubscriptionPress}
                buttonStyle={styles.adjustButton}
                textStyle={styles.adjustText}
            />

            {hasBindedSubscriptions &&
                <TouchableOpacity onPress={onBindedSubscriptionsPress}>
                    <Image
                        source={require('../../../assets/images/link.png')}
                        style={styles.link}
                    />
                </TouchableOpacity>
            }
        </View>
    );
});

const styles = StyleSheet.create({
    isSubscribedContainer: {
        flexDirection:'row',
    },
    link: {
        height: 44,
        width: 44,
        borderRadius: 22,
        marginLeft: 20,
    },
    adjustButton: {
        height: 44,
        marginBottom: 10,
        marginTop: 0,
        backgroundColor: COLORS.LightBlue,
        flex: 1,
    },
    adjustText: {
        fontSize: 16,
        lineHeight: 18,
        fontWeight: '600',
        color:COLORS.White,
        fontFamily: 'Montserrat',
    },
});

export default IsSubscribeButtonsRow;
