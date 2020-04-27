import {ImageSourcePropType} from 'react-native';
import {ISubscription} from './subscription';
import { ITag } from './shop';

export interface IShopProduct {
    id: number;
    name: string;
    img: string;
    price: number;
    rating: string;
    date: number;
    tagList: ITag[];
}

export interface IDetailProduct extends IShopProduct {
    title: string;
    text: string;
    oldPrice?: number;
    boughtNumber?: number;
    savedNumber?: number;
    tags: string[];
    colors: IProductProperty[];
    sizes: IProductProperty[];
    shop: IShopShort;
    delivery: {
        price: number;
        time: string;
    };
    descriptionList: IDescription[];
}

export interface IDescription {
    title: string;
    value: string;
};

export interface IProductProperty {
    value: string;
    isAvailable: boolean;
}

export interface IShopShort {
    id: string;
    name: string;
    rating: string;
    img: ImageSourcePropType;
}

export interface IFeedProduct {
    id: number;
    price: number;
    img: string;
    rating: string;
    subscription: ISubscription;
    shopName: string;
    shopLogo: string;
}

export interface IProductResponse {
    id: number;
    name: string;
    price: number;
    price_with_sale: number;
    updated_at: string;
    rating: string;
    image: string;
    tags: ITag[];
}
