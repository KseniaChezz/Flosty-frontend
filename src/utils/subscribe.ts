import {ISubscriptionShop, ISubscriptionTag, ISubscriptionResponse, ISubscription} from '../types/subscription';
import {SubscriptionType} from '../enums';

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
