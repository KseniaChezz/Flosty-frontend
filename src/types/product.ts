import {ImageSourcePropType} from 'react-native';

export interface IProduct {
    img: ImageSourcePropType;
    price: number;
    rating: string;
}

export interface IProductDetail extends IProduct {
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


