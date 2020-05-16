import {ISubscription} from './subscription';
import { ITag } from './shop';

export interface IShopProduct {
    id: number;
    shopId: number;
    name: string;
    img: string;
    price: number;
    rating: string;
    date: number;
    tagList: ITag[];
}

export interface IDetailProduct extends Omit<IShopProduct, 'img'> {
    description: string;
    characteristic: string;
    colorList?: IColor[];
    sizeList?: ISize[];
    oldPrice?: number;
    boughtNumber: number;
    savedNumber: number;
    imageList: string[];
}

export interface IColor {
    id: number;
    code: string;
    order: number;
    value: string;
};

export interface ISize {
    id: number;
    value: string;
}

export interface IProductProperty {
    id: number;
    value: string;
    code?: string;
}

export interface IFeedProduct {
    id: number;
    shopId: number;
    price: number;
    img: string;
    rating: string;
    subscription: ISubscription;
    shopName: string;
    shopLogo: string;
}

export interface IProductResponse {
    id: number;
    shop_id: number;
    name: string;
    price: number;
    price_with_sale: number;
    updated_at: string;
    rating: string;
    image: string;
    tags: ITag[];
}

export interface IDetailedProductResponse extends IProductResponse {
    description: string;
    number_of_sales: number;
    number_of_saves: number;
    characteristic: string;
    images: string[];
    colors?: IColorResponse[];
    sizes?: ISizeResponse[];
}

export interface IColorResponse {
    id: number;
    order: number;
    name: string;
    hex_code: string;
}

export interface ISizeResponse {
    id: number;
    size: string;
}
