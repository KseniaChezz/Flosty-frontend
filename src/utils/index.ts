import {
    getAddressObjectForRender,
    getUserObjectForRender,
    getCardObjectForRender,
    checkPasswordChangeAndSetError,
    getuserObjectForSave,
    validate,
    getCardObjectForSave,
    mapCardFromResponse,
    getCardObjectForSend,
    getAddressObjectForSave,
    getNotificationSectionList,
    getUserCommunicationShopList,
    isNotEmptyString,
    getAddressString,
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
    isTagListSame,
    getTagListFromSubscription,
    getShopOrTagSubscriptionId,
    getBindedSubscriptions,
} from './subscribe';
import {
    isStringWithNumbers,
    getTagListAndShopId,
    mapProductFromResponse,
    getFilteredProductListByTagAndTagId,
    formatProductPrice,
    mapColorProductResponse,
    mapSizeProductResponse,
    getIdListFromTagList,
    getFilteredTagList,
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
import {
    mapBasketProductResponse,
    getTotalBasketProductsCount,
    isShopSelected,
    isProductSelected,
    selectAllBasketProducts,
    selectAllShopBasketProducts,
    selectBasketProduct,
    unSelectBasketProduct,
    unSelectAllShopBasketProducts,
    getSelectedBasketProductsCount,
    getSelectedBasketProductsPrice,
    getAddressForBasketMenuItem,
} from './basket';

export {
    getAddressObjectForRender,
    getUserObjectForRender,
    getCardObjectForRender,
    checkPasswordChangeAndSetError,
    getuserObjectForSave,
    validate,
    getCardObjectForSave,
    mapCardFromResponse,
    getCardObjectForSend,
    getAddressObjectForSave,
    getNotificationSectionList,
    getUserCommunicationShopList,
    isNotEmptyString,
    getAddressString,

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
    isTagListSame,
    getTagListFromSubscription,
    getShopOrTagSubscriptionId,
    getBindedSubscriptions,

    isStringWithNumbers,
    getTagListAndShopId,
    mapProductFromResponse,
    getFilteredProductListByTagAndTagId,
    formatProductPrice,
    mapColorProductResponse,
    mapSizeProductResponse,
    getIdListFromTagList,
    getFilteredTagList,

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

    mapBasketProductResponse,
    getTotalBasketProductsCount,
    isShopSelected,
    isProductSelected,
    selectAllBasketProducts,
    selectAllShopBasketProducts,
    selectBasketProduct,
    unSelectBasketProduct,
    unSelectAllShopBasketProducts,
    getSelectedBasketProductsCount,
    getSelectedBasketProductsPrice,
    getAddressForBasketMenuItem,
}
