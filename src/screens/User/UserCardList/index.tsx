import React, {useState, memo} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import {useSelector, useDispatch} from 'react-redux';

import {styles} from './style';

import {ScreenWrapperWithBackButton, ModalWindow} from '../../../elements';
import Card from './Card';

import {deleteCard} from '../../../store/user/actions';

import {IRootNavigatorParamList} from '../../../types/rootNavigator';
import {ICard} from '../../../types/user';
import {IState} from '../../../store';

import {TEXT} from '../../../constants';
import {RootNavigatorRoutes} from '../../../enums';

import {getCardObjectForRender} from '../../../utils';

type ScreenNavigationProp = StackNavigationProp<IRootNavigatorParamList, RootNavigatorRoutes.USER_PROFILE_CARD_LIST>;

interface IProps {
    navigation: ScreenNavigationProp;
}

const UserAddressList = memo((props: IProps) => {
    const {navigation} = props;
    const cardList: ICard[] = useSelector((state: IState) => state.user.cardList);
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
    const [selectedCardId, setSelectedCardId] = useState<string>('');
    const dispatch = useDispatch();

    const onBackPress = () => {
        navigation.goBack();
    };

    const onAddPress = () => {
        navigation.navigate(
            RootNavigatorRoutes.USER_PROFILE_CARD,
            {title: TEXT.addCard, fieldList: getCardObjectForRender()},
        );
    };

    const onCardPress = (cardId: string) => {
        return () => {
            setSelectedCardId(cardId);
            setIsModalVisible(true);
        }
    }

    const onCancelPress = () => {
        setIsModalVisible(false);
    }

    const onDeletePress = () => {
        dispatch(deleteCard(selectedCardId));
        setIsModalVisible(false);
    }

    const renderEmptyList = () => {
        return (
            <View style={styles.emptyListContainer}>

                <Text style={styles.emptyListText}>
                    {TEXT.emptyUserCardList}
                </Text>

            </View>
        );
    };

    const renderList = () => {
        return cardList.map((card: ICard) => {
            const {id} = card;
            return (
                <Card
                    key={id}
                    card={card}
                    onPress={onCardPress(id)}
                />
            )
        })
    }

    return (
        <ScreenWrapperWithBackButton
            text={TEXT.myCards}
            img={require('../../../../assets/images/add.png')}
            onImgPress={onAddPress}
            onBackPress={onBackPress}
            style={styles.wrapper}
        >

            {cardList.length === 0 ? renderEmptyList() : renderList()}

            <ModalWindow
                isWindowVisible={isModalVisible}
                title={TEXT.deleteCard}
                text={TEXT.areYouSureToDeleteCard}
                submitButtonText={TEXT.delete}
                onCancelPress={onCancelPress}
                onSubmitPress={onDeletePress}
            />

        </ScreenWrapperWithBackButton>
    );
});

export default UserAddressList;
