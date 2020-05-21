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
    region: string | undefined;
    city: string;
    street: string;
    house: string;
    building: string | undefined;
    block: string | undefined;
    apartment: string;
    index: string;
    firstName: string;
    name: string;
    phoneNumber: string;
    email: string;
}

export interface IAddressResponseObligatoryFields {
    id: number;
    zip_code: string;
    city: string;
    street: string;
    house: string;
    apartment: string;
    recipient_first_name: string;
    recipient_last_name: string;
    phone_number: string;
    email: string;
}

export interface IAddressResponse extends IAddressResponseObligatoryFields {
    building?: string;
    block?: string;
    region?: string;
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

export interface IOrderResponse {
    id: number;
    track_number: string;
    will_delivered: string;
    status: string;
    products: IOrderProductResponse[];
}

export interface IOrderProductResponse {
    id: number;
    image: string;
    name: string;
    quantity: number;
    price: number;
    order_id: number;
    size?: string;
    color?: string;
}

export interface IOrder {
    id: number;
    trackNumber: string;
    deliveryDate: number;
    status: string;
    products: IOrderProduct[];
}

export interface IOrderProduct {
    id: number;
    image: string;
    name: string;
    quantity: number;
    price: number;
    orderId: number;
    size?: string;
    color?: string;
}
