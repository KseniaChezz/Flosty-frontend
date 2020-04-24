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
