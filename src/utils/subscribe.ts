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
}
