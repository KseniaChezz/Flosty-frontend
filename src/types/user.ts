import {RootNavigatorRoutes, MessageAuthor} from '../enums';

export interface IFieldList {
    [id: string]: IField;
}

export interface IField {
    title: string;
    value: string;
    validate: (value: string) => boolean;
}

export interface IUserProfileItem {
    name: RootNavigatorRoutes;
    text: string;
    img: any;
}

export interface IUserAddressField extends IField {}

export interface IUserAddressFieldList extends IFieldList {}

export interface IAddress {
    id: number;
    country: string;
    region: string;
    city: string;
    street: string;
    house: string;
    building: string;
    block: string;
    apartment: string;
    index: string;
    firstName: string;
    name: string;
    phoneNumber: string;
    email: string;
}

export interface IUserCardFieldList extends IFieldList {}

export interface IUserCardField extends IField {}

export interface ICard {
    id: number;
    cardNumber: string;
    type: string;
    cardHolderName: string;
    expiryMonth: number;
    expiryYear: number;
}

export interface ICardResponse {
    id: number;
    expiry_month: number;
    expiry_year: number;
    holder: string;
    number: string;
    payment_system_name: string;
}

export interface IUserFieldList extends IFieldList {}

export interface IUserField extends IField {}

export interface IUser {
    profile: string;
    name: string;
    email: string;
}

export interface INotification {
    date: number;
    imgUri: string;
    text: string;
}

export interface IMessage {
    date: number;
    text: string;
    author: MessageAuthor;
}

export interface IShopMessageMap {
    [shopId: number]: IShopInfoAndMessage;
}

export interface IShopInfoAndMessage {
    id: number;
    logo: string;
    name: string;
    messageList: IMessage[];
}
