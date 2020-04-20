import {TEXT, maxMessageLength} from '../constants';

import {
    IAddress,
    IUserAddressFieldList,
    IUser,
    IUserFieldList,
    IUserCardFieldList,
    ICard,
    IFieldList,
    IField,
    INotification,
    IShopMessageMap,
    IMessage,
} from '../types/user';

import {
    isToday,
    isDateBelongsSixDaysBeforeToday,
    isDateBelongTwentyThreeDaysBeforeThisWeek,
} from '../utils/time';
import { MessageAuthor } from '../enums';

export const isNotEmptyString = (value: string) => {
    return value !== '';
};

export const getAddressObjectForRender = (address?: IAddress): IUserAddressFieldList => {
    return  {
        [TEXT.country]: {
            title: TEXT.country,
            value: address?.country || 'Россия',
            validate: isNotEmptyString,
        },
        [TEXT.region]: {
            title: TEXT.region,
            value: address?.region || '',
            validate: isNotEmptyString,
        },
        [TEXT.city]: {
            title: TEXT.city,
            value: address?.city || '',
            validate: isNotEmptyString,
        },
        [TEXT.street]: {
            title: TEXT.street,
            value: address?.street || '',
            validate: isNotEmptyString,
        },
        [TEXT.house]: {
            title: TEXT.house,
            value: address?.house || '',
            validate: isNotEmptyString,
        },
        [TEXT.building]: {
            title: TEXT.building,
            value: address?.building || '',
            validate: isNotEmptyString,
        },
        [TEXT.block]: {
            title: TEXT.block,
            value: address?.block || '',
            validate: isNotEmptyString,
        },
        [TEXT.apartment]: {
            title: TEXT.apartment,
            value: address?.apartment || '',
            validate: isNotEmptyString,
        },
        [TEXT.index]: {
            title: TEXT.index,
            value: address?.index || '',
            validate: isNotEmptyString,
        },
        [TEXT.firstName]: {
            title: TEXT.firstName,
            value: address?.firstName || '',
            validate: isNotEmptyString,
        },
        [TEXT.name]: {
            title: TEXT.name,
            value: address?.name || '',
            validate: isNotEmptyString,
        },
        [TEXT.phoneNumber]: {
            title: TEXT.phoneNumber,
            value: address?.phoneNumber || '',
            validate: isNotEmptyString,
        },
        [TEXT.email]: {
            title: TEXT.email,
            value: address?.email || '',
            validate: isNotEmptyString,
        },
    };
}

export const getUserObjectForRender = (user: IUser): IUserFieldList => {
    const {
        profile = TEXT.private,
        name = '',
        email = '',
    } = user;

    return {
        [TEXT.profile]: {
            title: TEXT.profile,
            value: profile,
            validate: isNotEmptyString,
        },
        [TEXT.name]: {
            title: TEXT.name,
            value: name,
            validate: isNotEmptyString,
        },
        [TEXT.email]: {
            title: TEXT.email,
            value: email,
            validate: isNotEmptyString,
        },
    };
}

export const getCardObjectForRender = (): IUserCardFieldList => {
    return {
        [TEXT.cardNumber]: {
            title: TEXT.cardNumber,
            value: '',
            validate: isNotEmptyString,
        },
        [TEXT.cardHolderName]: {
            title: TEXT.cardHolderName,
            value: '',
            validate: isNotEmptyString,
        },
        [TEXT.month]: {
            title: TEXT.month,
            value: '',
            validate: isNotEmptyString,
        },
        [TEXT.year]: {
            title: TEXT.year,
            value: '',
            validate: isNotEmptyString,
        },
        [TEXT.cvc]: {
            title: TEXT.cvc,
            value: '',
            validate: isNotEmptyString,
        },
    };
}

export const checkPasswordChangeAndSetError = (
    oldPassword: string,
    newPassword: string,
    repeatNewPassword: string,
    setPasswordErrorText: (text: string) => void,
    setErrorPasswordFieldList: (fieldList: string[]) => void,
): boolean => {
    if (!oldPassword) {
        setPasswordErrorText(TEXT.fieldNotBeEmpty);
        setErrorPasswordFieldList([TEXT.oldPassword]);

        return false;
    }

    if (!newPassword) {
        setPasswordErrorText(TEXT.fieldNotBeEmpty);
        setErrorPasswordFieldList([TEXT.newPassword]);

        return false;
    }

    if (!repeatNewPassword) {
        setPasswordErrorText(TEXT.fieldNotBeEmpty);
        setErrorPasswordFieldList([TEXT.repeatNewPassword]);

        return false;
    }

    if (newPassword !== repeatNewPassword) {
        setPasswordErrorText(TEXT.notEqualPasswordError);
        setErrorPasswordFieldList([TEXT.newPassword, TEXT.repeatNewPassword]);

        return false;
    }

    setPasswordErrorText('');
    setErrorPasswordFieldList([]);
    return true;
}

export const getAddressObjectForSave = (addressObjectFieldList: IUserAddressFieldList): IAddress => {
    return {
        country: addressObjectFieldList[TEXT.country].value,
        region: addressObjectFieldList[TEXT.region].value,
        city: addressObjectFieldList[TEXT.city].value,
        street:addressObjectFieldList[TEXT.street].value,
        house: addressObjectFieldList[TEXT.house].value,
        building: addressObjectFieldList[TEXT.building].value,
        block: addressObjectFieldList[TEXT.block].value,
        apartment: addressObjectFieldList[TEXT.apartment].value,
        index: addressObjectFieldList[TEXT.index].value,
        firstName: addressObjectFieldList[TEXT.firstName].value,
        name: addressObjectFieldList[TEXT.name].value,
        phoneNumber: addressObjectFieldList[TEXT.phoneNumber].value,
        email: addressObjectFieldList[TEXT.email].value,
        id: `addressId${Math.random()}`,
    }
};

export const getCardObjectForSave = (cardObjectFieldList: IUserCardFieldList): ICard => {
    return {
        cardNumber: +cardObjectFieldList[TEXT.cardNumber].value,
        cardHolderName: cardObjectFieldList[TEXT.cardHolderName].value,
        expiryMonth: +cardObjectFieldList[TEXT.month].value,
        expiryYear: +cardObjectFieldList[TEXT.year].value,
        code: +cardObjectFieldList[TEXT.cvc].value,
        type: getRandomCardType(),
        id: `cardId${Math.random()}`,
    }
}

export const getRandomCardType = (): string => {
    const cardTypeList: string[] = ['MasterCard', 'Visa', 'Maestro', 'МИР'];
    const randomIndex: number = getRandomInt(cardTypeList.length);

    return cardTypeList[randomIndex];
}

const getRandomInt = (max: number): number => {
    return Math.floor(Math.random() * Math.floor(max));
}

export const getuserObjectForSave = (userObjectFieldList: IUserFieldList): IUser => {
    return {
        name: userObjectFieldList[TEXT.name].value,
        email: userObjectFieldList[TEXT.email].value,
        profile: userObjectFieldList[TEXT.profile].value,
    }
}

export const validate = (
    userKeyList: string[],
    userFieldList: IFieldList,
    setErrorField: (title: string) => void,
): boolean => {
    for (let i = 0; i < userKeyList.length; i++) {
        const key: string = userKeyList[i];
        const field: IField = userFieldList[key];
        const {
            value,
            validate,
            title,
        } = field;

        if (!validate(value)) {
            setErrorField(title);
            return false;
        }
    }

    return true;
}

export const getNotificationSectionList = (notificationList: INotification[]) => {
    return [
        {
            title: TEXT.today,
            data: notificationList.filter(
                (notification: INotification) => isToday(notification.date)
            ),
        },
        {
            title: TEXT.sevenDays,
            data: notificationList.filter(
                (notification: INotification) => isDateBelongsSixDaysBeforeToday(notification.date)
            ),
        },
        {
            title: TEXT.thirtyDays,
            data: notificationList.filter(
                (notification: INotification) => isDateBelongTwentyThreeDaysBeforeThisWeek(notification.date)
            ),
        }
    ];
}

export const getUserCommunicationShopList = (shopMessageMap: IShopMessageMap) => {
    const keyList: string[] = Object.keys(shopMessageMap);

    return keyList.map((key: string) => shopMessageMap[key]);
}

export const getMessageCut = (message: IMessage, shopName: string): string => {
    const {text, author} = message;

    if (author === MessageAuthor.USER) {
        return `${text.slice(0, maxMessageLength)}${text.length > maxMessageLength ? '...' : ''}`;
    }

    const shopNameLength: number = shopName.length;
    const delta: number = maxMessageLength - shopNameLength;

    return `${shopName}: ${text.slice(0, delta)}${text.length > delta ? '...' : ''}`;
}
