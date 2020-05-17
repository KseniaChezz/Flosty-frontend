import {IUserState} from './types/state';
import {
    IUserAction,
    ISetUser,
    ISetAddressList,
    IAddAddress,
    IDeleteAddress,
    ISetCardList,
    IAddCard,
    IDeleteCard,
    ISetProcessingData,
    ISetNotificationList,
    IAddMessageInSupportChat,
    IAddMessageInShopChat,
    IAddFirstMessageInShopChat,
} from './types/actions';
import {IAddress, ICard} from '../../types/user';
import {IAppAction} from '../app/types/actions';

import {TEXT} from '../../constants';
import {UserAction} from './userActionEnum';
import {MessageAuthor} from '../../enums';
import {AppAction} from '../app/appActionEnum';

const initialState: IUserState = {
    isProcessingData: false,
    main: {
        profile: TEXT.private,
        name: 'Ivan Ivanov',
        email: 'qwerty@mail.ru',
    },
    addressList: [],
    cardList: [],
    notificationList: [
        {
            date: Date.now(),
            imgUri: '',
            text: 'Ваш товар прибыл в пункт назначения.\n' +
                'Поздравляем с покупкой!',
        },
    ],
    supportChat: [
        {
            text: TEXT.supportMessage,
            date: Date.now(),
            author: MessageAuthor.SUPPORT,
        },
    ],
    messageList: {},
}

const onSetUser = (state: IUserState, action: ISetUser): IUserState => {
    const {user} = action;

    return {
        ...state,
        main: user,
    };
}

const onSetAddressList = (state: IUserState, action: ISetAddressList): IUserState => {
    const {addressList} = action;

    return {
        ...state,
        addressList,
    };
}

const onAddAddress = (state: IUserState, action: IAddAddress): IUserState => {
    const {address} = action;

    return {
        ...state,
        addressList: [...state.addressList, address],
    };
}

const onDeleteAddress = (state: IUserState, action: IDeleteAddress): IUserState => {
    const {addressId} = action;

    return {
        ...state,
        addressList: state.addressList.filter((address: IAddress) => addressId !== address.id),
    };
}

const onSetCardList = (state: IUserState, action: ISetCardList): IUserState => {
    const {cardList} = action;

    return {
        ...state,
        cardList,
    };
}

const onAddCard = (state: IUserState, action: IAddCard): IUserState => {
    const {card} = action;

    return {
        ...state,
        cardList: [...state.cardList, card],
    };
}

const onDeleteCard = (state: IUserState, action: IDeleteCard): IUserState => {
    const {cardId} = action;

    return {
        ...state,
        cardList: state.cardList.filter((card: ICard) => cardId !== card.id),
    };
}

const onSetProcessingData = (state: IUserState, action: ISetProcessingData): IUserState => {
    const {isProcessingData} = action;

    return {
        ...state,
        isProcessingData,
    };
}

const onSetNotificationList = (state: IUserState, action: ISetNotificationList): IUserState => {
    const {notificationList} = action;

    return {
        ...state,
        notificationList,
    };
}

const onAddMessageInSupportChat = (state: IUserState, action: IAddMessageInSupportChat): IUserState => {
    const {message} = action;

    return {
        ...state,
        supportChat: [message, ...state.supportChat],
    };
}

const onAddMessageInShopChat = (state: IUserState, action: IAddMessageInShopChat): IUserState => {
    const {
        shopId,
        message,
    } = action;

    return {
        ...state,
        messageList: {
            ...state.messageList,
            [shopId]: {
                ...state.messageList[shopId],
                messageList: [message, ...state.messageList[shopId].messageList],
            }
        },
    };
}

const onAddFirstMessageInShopChat = (state: IUserState, action: IAddFirstMessageInShopChat): IUserState => {
    const {
        shopId,
        shopLogo,
        shopName,
        message,
    } = action;

    return {
        ...state,
        messageList: {
            ...state.messageList,
            [shopId]: {
                id: shopId,
                name: shopName,
                logo: shopLogo,
                messageList: [message]
            }
        },
    };
}

export const userReducer = (state: IUserState = initialState, action: IUserAction | IAppAction): IUserState => {
    switch (action.type) {
        case UserAction.USER_SET_USER:
            return onSetUser(state, action);
        case UserAction.USER_SET_ADDRESS_LIST:
            return onSetAddressList(state, action);
        case UserAction.USER_ADD_ADDRESS:
            return onAddAddress(state, action);
        case UserAction.USER_DELETE_ADDRESS:
            return onDeleteAddress(state, action);
        case UserAction.USER_SET_CARD_LIST:
            return onSetCardList(state, action);
        case UserAction.USER_ADD_CARD:
            return onAddCard(state, action);
        case UserAction.USER_DELETE_CARD:
            return onDeleteCard(state, action);
        case UserAction.USER_SET_PROCESSING_DATA:
            return onSetProcessingData(state, action);
        case UserAction.USER_SUPPORT_CHAT_ADD_MESSAGE:
            return onAddMessageInSupportChat(state, action);
        case UserAction.USER_SHOP_CHAT_ADD_MESSAGE:
            return onAddMessageInShopChat(state, action);
        case UserAction.USER_SHOP_CHAT_ADD_FIRST_MESSAGE:
            return onAddFirstMessageInShopChat(state, action);
        case AppAction.APP_SET_DEFAULT:
            return initialState;
        default:
            return state;
    }
}
