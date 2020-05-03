import {useSelector} from 'react-redux';

import {ISubscription, ISubscriptionResponse, ISubscriptionShop, ISubscriptionTag} from '../types/subscription';
import {IState} from '../store';

import {SubscriptionType} from '../enums';
import {TEXT} from '../constants';
import { ITag } from '../types/shop';

export const getSubscribersValueText = (subscribers: number): string => {
    const thousand: string = 'тыс.';
    const million: string = 'млн.';
    const subscribersCaseList: string[] = ['подписчик', 'подписчика', 'подписчиков'];

    if (subscribers < 1000) {
        const lastNumber: string = subscribers.toString().slice(-1);
        const beforeLastNumber: string = subscribers.toString().length > 1 ? subscribers.toString().slice(-2) : '';
        let subscribersCase: string = subscribersCaseList[1];

        if (+lastNumber === 0 || +lastNumber > 4) {
            subscribersCase = subscribersCaseList[2];
        }

        if (+lastNumber === 1 && +beforeLastNumber !== 1) {
            subscribersCase = subscribersCaseList[0];
        }

        return `${subscribers} ${subscribersCase}`;
    }

    if (subscribers >= 1000 && subscribers < 1000000) {
        return `${Math.floor(subscribers / 1000)} ${thousand} ${subscribersCaseList[2]}`;
    }

    return `${Math.floor(subscribers / 1000000)} ${million} ${subscribersCaseList[2]}`;
};

export const getSubscriptionType = (shops: ISubscriptionShop[], tags: ISubscriptionTag[]): SubscriptionType => {
    let type: SubscriptionType = SubscriptionType.ADJUSTED;

    if (shops.length === 0 && tags.length === 1) {
        type = SubscriptionType.TAG;
    } else if (shops.length === 1 && tags.length === 0) {
        type = SubscriptionType.SHOP;
    }

    return type;
};

export const mapSubscriptionFomResponse = (subscriptionResponse: ISubscriptionResponse): ISubscription => {
    const {
        id,
        updated_at,
        shops,
        tags,
    } = subscriptionResponse;

    return {
        id,
        shops,
        tags,
        date: + new Date(updated_at),
        type: getSubscriptionType(shops, tags),
    };
};

export const filterSubscriptionList = (subscriptionList: ISubscription[], filterType: string, searchText: string): ISubscription[] => {
    switch (filterType) {
        case TEXT.shops:
            return  subscriptionList.filter((item: ISubscription) => {
                return item.type === SubscriptionType.SHOP && isStringContainsSearchText(item.shops[0].name, searchText);
            });
        case TEXT.tags:
            return  subscriptionList.filter((item: ISubscription) => {
                return item.type === SubscriptionType.TAG && isStringContainsSearchText(item.tags[0].name, searchText);
            });
        case TEXT.adjusted:
            return subscriptionList.filter((item: ISubscription) => {
                return item.type === SubscriptionType.ADJUSTED && isSubscriptionHasSearchText(item, searchText);
            });
        case TEXT.allTags:
        default:
            return subscriptionList.filter((item: ISubscription) => isSubscriptionHasSearchText(item, searchText));
    }
};

const isSubscriptionHasSearchText = (subscription: ISubscription, text: string): boolean => {
    if (text === '') return true;

    const {shops, tags} = subscription;

    return [...shops, ...tags].some((item: ISubscriptionShop | ISubscriptionTag) => {
        return isStringContainsSearchText(item.name, text);
    });
}

const isStringContainsSearchText = (str: string, searchText: string): boolean => {
    return str.toLowerCase().includes(searchText.toLowerCase());
}

export const isShopSubscribed = (shopId: number): boolean => {
    const subscriptionList: ISubscription[] = useSelector((store: IState) => store.subscriptionList.list);

    return subscriptionList.filter((item: ISubscription) => {
        const {type, shops} = item;

        return type === SubscriptionType.SHOP && shops[0].id === shopId;
    }).length !==0;
}

export const isTagSubscribed = (tagId: number): boolean => {
    const subscriptionList: ISubscription[] = useSelector((store: IState) => store.subscriptionList.list);

    return subscriptionList.filter((item: ISubscription) => {
        const {type, tags} = item;

        return type === SubscriptionType.TAG && tags[0].id === tagId;
    }).length !==0;
}

export const getShopBindedSubscriptions = (shopId: number, subscriptionList: ISubscription[]): ISubscription[] => {
    return subscriptionList.filter((item: ISubscription) => {
        const {type, shops} = item;

        return type === SubscriptionType.ADJUSTED && shops[0]?.id === shopId;
    });
}

export const getTagBindedSubscriptions = (tagId: number, subscriptionList: ISubscription[]): ISubscription[] => {
    return subscriptionList.filter((item: ISubscription) => {
        const {type, tags} = item;

        return type === SubscriptionType.ADJUSTED && isTagFoundInTagList(tagId, tags);
    });
};

const isTagFoundInTagList = (tagId: number, tagList: ISubscriptionTag[]): boolean => {
    return tagList.some((item: ISubscriptionTag) => {
        const {id} = item;
        return id === tagId;
    });
}

export const isTagListSame = (initialTagList: ITag[], selectedTagList: ITag[]): boolean => {
    if (initialTagList.length !== selectedTagList.length) return false;

    let result: boolean = true;

    initialTagList.forEach((tag: ITag) => {
        if (!selectedTagList.some((item: ITag) => tag.id === item.id)) {
            result = false;
        }
    })

    return result;
}
