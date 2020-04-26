import {IShop, IShopResponse} from '../types/shop';

export const mapShopFromResponse = (shopResponse: IShopResponse): IShop => {
    const {
        id,
        name,
        description,
        image,
        address,
        phone_number,
        email,
        rating,
        subscribers,
        last_three_product_images,
        top_tags,
    } = shopResponse;

    return {
        id,
        name,
        description,
        address,
        email,
        rating,
        subscribers,
        tagList: top_tags,
        logo: image,
        phoneNumber: phone_number,
        productImgList: last_three_product_images,
    };
}
