export interface IShop {
    id: number;
    name: string;
    description: string;
    logo: string;
    rating: string;
    subscribers: number;
    address: string;
    phoneNumber: string;
    email: string;
    productImgList: string[];
    tagList: ITag[];
}

export interface ITag {
    id: number | string;
    name: string;
}

export interface IShopResponse {
    id: number;
    name: string;
    description: string;
    image: string;
    rating: string;
    address: string;
    phone_number: string;
    email: string;
    subscribers: number;
    last_three_product_images: string[];
    top_tags: ITag[];
}
