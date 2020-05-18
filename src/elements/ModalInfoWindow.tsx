import React, {useState, memo} from 'react';
import {
    View,
    Text,
    StyleSheet,
} from 'react-native';
import Modal from 'react-native-modal';

import PlainButton from './PlainButton';

import {TEXT, COLORS} from '../constants';

interface IProps {
    isWindowVisible: boolean;
    title?: string;
    text?: string;
    onPress: () => void;
}

const ModalInfoWindow = memo((props: IProps) => {
    const {
        isWindowVisible,
        title,
        text,
        onPress,
    } = props;

    return (
        <View style={styles.modalContainer}>

            <Modal isVisible={isWindowVisible} onBackdropPress={onPress}>

                <View style={styles.modalInnerContainer}>

                    <View style={styles.modalTextContainer}>

                        {!!title &&
                            <Text style={[styles.text, styles.titleText]}>
                                {title}
                            </Text>
                        }

                        {!!text &&
                            <Text style={[styles.text, styles.messageText]}>
                                {text}
                            </Text>
                        }

                    </View>

                    <View style={styles.buttonsRow}>
                        <PlainButton
                            text={'OK'}
                            buttonStyle={styles.button}
                            textStyle={styles.buttonText}
                            onPress={onPress}
                        />
                    </View>

                </View>

            </Modal>

        </View>
    );
});

const styles = StyleSheet.create({
    modalContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalInnerContainer: {
        backgroundColor: COLORS.White,
        borderRadius: 10,
    },
    modalTextContainer: {
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    text: {
        fontFamily: 'Montserrat',
        color: COLORS.DarkGrey,
        textAlign: 'center',
    },
    titleText: {
        fontSize: 18,
        lineHeight: 22,
        fontWeight: '600',
        marginBottom: 10,
    },
    messageText: {
        fontSize: 14,
        lineHeight: 18,
        marginBottom: 25,
    },
    buttonsRow: {
        height: 44,
        borderTopWidth: 1,
        borderTopColor: COLORS.Border,
        flexDirection: 'row',
    },
    button: {
        flex: 1,
    },
    buttonBorder: {
        borderRightColor: COLORS.Border,
        borderRightWidth: 1,
    },
    buttonText: {
        color: COLORS.BrightBlue,
    },
});

export default ModalInfoWindow;
