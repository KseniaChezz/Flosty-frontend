import React, {memo, useState} from 'react';
import {FlatList, Image, ListRenderItemInfo, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useDispatch, useSelector} from 'react-redux';
import { RouteProp } from '@react-navigation/native';

import {styles} from './style';

import {ScreenWrapperWithBackButton, ChatMessage} from '../../../elements';

import {addMessageInShopChat, addFirstMessageInShopChat} from '../../../store/user/actions';

import {IRootNavigatorParamList} from '../../../types/rootNavigator';
import {IState} from '../../../store';
import {IMessage} from '../../../types/user';

import {COLORS, TEXT} from '../../../constants';
import {MessageAuthor, RootNavigatorRoutes} from '../../../enums';

type ScreenNavigationProp = StackNavigationProp<IRootNavigatorParamList, RootNavigatorRoutes.USER_PROFILE_SHOP_CHAT>;
type ScreenRouteProp = RouteProp<IRootNavigatorParamList, RootNavigatorRoutes.USER_PROFILE_SHOP_CHAT>;

interface IProps {
    navigation: ScreenNavigationProp;
    route: ScreenRouteProp;
}

const ShopChat = memo((props: IProps) => {
    const {
        navigation,
        route: {
            params: {
                shopName,
                shopId,
                shopLogo,
            },
        },
    } = props;
    const [message, setMessage] = useState<string>('');
    const messageList: IMessage[] = useSelector((state: IState) => state.user.messageList[shopId]?.messageList) || [];
    const dispatch = useDispatch();

    const onBackPress = () => {
        navigation.goBack();
    };

    const onAddMessagePress = () => {
        const messageToSend: IMessage = {
            text: message,
            date: Date.now(),
            author: MessageAuthor.USER,
        };

        if (messageList.length === 0) {
            dispatch(addFirstMessageInShopChat(shopId, messageToSend, shopName, shopLogo));
        } else {
            dispatch(addMessageInShopChat(shopId, messageToSend));
        }

        setMessage('');
    };

    const keyExtractor = (item: IMessage) => {
        const {author, date} = item;

        return `${author}${date}`;
    };

    const renderMessage = (info: ListRenderItemInfo<IMessage>) => {
        const {
            item: message,
        } = info;

        return (
            <ChatMessage
                message={message}
            />
        )
    }

    return (
        <ScreenWrapperWithBackButton
            text={shopName}
            onBackPress={onBackPress}
        >

            <View style={styles.container}>
                <FlatList<IMessage>
                    data={messageList}
                    keyExtractor={keyExtractor}
                    renderItem={renderMessage}
                    inverted
                />
            </View>

            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder={TEXT.message}
                    placeholderTextColor={COLORS.LightGrey}
                    multiline
                    numberOfLines={4}
                    onChangeText={setMessage}
                    value={message}
                />

                <TouchableOpacity
                    style={styles.imgContainer}
                    onPress={onAddMessagePress}
                >
                    <Image
                        style={styles.img}
                        source={require('../../../../assets/images/send.png')}
                    />
                </TouchableOpacity>

            </View>

        </ScreenWrapperWithBackButton>
    );
});

export default ShopChat;
