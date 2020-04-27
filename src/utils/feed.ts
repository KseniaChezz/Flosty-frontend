import {ImageSourcePropType} from 'react-native';
import {ISubscription, ISubscriptionTag} from '../types/subscription';
import {SubscriptionType} from "../enums";

export const getLogoForFeedProduct = (subscription: ISubscription): ImageSourcePropType => {
    const {type, shops, tags} = subscription;

    switch (type) {
        case SubscriptionType.SHOP:
            return {uri: shops[0].image};
        case SubscriptionType.TAG:
            return {uri: tags[0].image};
        case SubscriptionType.ADJUSTED:
            if (shops.length !== 0) {
                return {uri: shops[0].image};
            }

            return require('../../assets/images/link.png');
        default:
            return require('../../assets/images/link.png');
    }
};

export const getShopNameForFeedProduct = (subscription: ISubscription): string => {
    const {type, shops} = subscription;

    switch (type) {
        case SubscriptionType.SHOP:
            return shops[0].name;
        case SubscriptionType.ADJUSTED:
            if (shops.length !== 0) {
                return shops[0].name;
            }

            return '';
        default:
            return '';
    }
};

export const getTagLineForFeedProduct = (subscription: ISubscription): string => {
    const {type, tags} = subscription;

    switch (type) {
        case SubscriptionType.TAG:
            return `#${tags[0].name}`;
        case SubscriptionType.ADJUSTED:
            return tags.reduce((result: string, item: ISubscriptionTag) => {
                return result + `#${item.name}`;
            }, '');
        default:
            return '';
    }
};
