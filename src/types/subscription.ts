import {SubscriptionType} from '../enums';

export interface IShopSubscription {
    id: string;
    name: string;
    logo: string;
    goodsImg: string[];
    subscribers: number;
}

export interface ISubstrictionItem {
    id: number;
    name: string;
    image: string;
    subscribers: number;
}

export interface ISubscriptionShop extends ISubstrictionItem {}

export interface ISubscriptionTag extends ISubstrictionItem {}

export interface ISubscription {
    id: number;
    date: number;
    type: SubscriptionType;
    shops: ISubscriptionShop[];
    tags: ISubscriptionTag[]
}

 export interface IFilter {
    title: string;
}
