import {
    getAddressObjectForRender,
    getUserObjectForRender,
    getCardObjectForRender,
    checkPasswordChangeAndSetError,
    getuserObjectForSave,
    validate,
    getCardObjectForSave,
    getAddressObjectForSave,
    getNotificationSectionList,
    getUserCommunicationShopList,
    isNotEmptyString,
} from './user';
import {
    getReadableDate,
    isToday,
    isDateBelongsSixDaysBeforeToday,
    isDateBelongTwentyThreeDaysBeforeThisWeek,
    getTime,
    getTimeOrDate,
} from './time';
import {
    mapShopFromResponse,
} from './shop';
import {
    getSubscribersValueText,
    filterSubscriptionList,
    mapSubscriptionFomResponse,
    getSubscriptionType,
    isShopSubscribed,
    isTagSubscribed,
    getShopBindedSubscriptions,
    getTagBindedSubscriptions,
} from './subscribe';
import {
    isStringWithNumbers,
    getTagListId,
    mapProductFromResponse,
    filterProductListByNameAndTag,
    formatProductPrice,
} from './product';
import {getEachNthIndexFromZeroTillMax} from './search';
import {navigate, goBack} from './navigation';
import {
    getLogoForFeedProduct,
    getShopNameForFeedProduct,
    getTagLineForFeedProduct,
} from './feed';
import {
    getMaxPriceFilterProductList,
    getMinPriceFilterProductList,
    getSortingFilterProductList,
    getFilteredProductList,
} from './filter';
import {isProductFavorite} from './favorite';

export {
    getAddressObjectForRender,
    getUserObjectForRender,
    getCardObjectForRender,
    checkPasswordChangeAndSetError,
    getuserObjectForSave,
    validate,
    getCardObjectForSave,
    getAddressObjectForSave,
    getNotificationSectionList,
    getUserCommunicationShopList,
    isNotEmptyString,

    getReadableDate,
    isToday,
    isDateBelongsSixDaysBeforeToday,
    isDateBelongTwentyThreeDaysBeforeThisWeek,
    getTime,
    getTimeOrDate,

    getSubscribersValueText,
    filterSubscriptionList,
    mapSubscriptionFomResponse,
    getSubscriptionType,
    isShopSubscribed,
    isTagSubscribed,
    getShopBindedSubscriptions,
    getTagBindedSubscriptions,

    isStringWithNumbers,
    getTagListId,
    mapProductFromResponse,
    filterProductListByNameAndTag,
    formatProductPrice,

    getEachNthIndexFromZeroTillMax,

    navigate,
    goBack,

    mapShopFromResponse,

    getLogoForFeedProduct,
    getShopNameForFeedProduct,
    getTagLineForFeedProduct,

    getMaxPriceFilterProductList,
    getMinPriceFilterProductList,
    getSortingFilterProductList,
    getFilteredProductList,

    isProductFavorite,
}
