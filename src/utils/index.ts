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
    isTagListSame,
} from './subscribe';
import {
    isStringWithNumbers,
    getTagListId,
    mapProductFromResponse,
    getFilteredProductListByTagAndTagId,
    formatProductPrice,
    mapColorProductResponse,
    mapSizeProductResponse,
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
} from './basket';

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
    isTagListSame,

    isStringWithNumbers,
    getTagListId,
    mapProductFromResponse,
    getFilteredProductListByTagAndTagId,
    formatProductPrice,
    mapColorProductResponse,
    mapSizeProductResponse,

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
}
