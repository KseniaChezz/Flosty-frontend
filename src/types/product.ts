import {ImageSourcePropType} from 'react-native';

export interface IShopProduct {
    id: number;
    img: string;
    price: number;
    rating: string;
    date: number;
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
    ref: {
        type: string;
        id: number;
        name: string;
    },
    shopName: string;
    shopLogo: string;
}

export interface IShopProductResponse {
    id: number;
    price: number;
    price_with_sale: number;
    updated_at: string;
    rating: string;
    images: string[];
}

export interface ITagProductResponse {
    id: number;
    price: number;
    price_with_sale: number;
    updated_at: string;
    rating: string;
    images: string[];
}
