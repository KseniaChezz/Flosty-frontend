import {TEXT} from '../text';

import {ISearchClarificationItem} from '../../types/search';

import {womanClothes} from './womanClothes';
import {womanFootWear} from './womanFootWear';
import {bags} from './bags';
import {weddingClothes} from './weddingClothes';
import {partyClothes} from './partyClothes';
import {accessorises} from './accessorises';
import {garmentCare} from './garmentCare';

export const woman: ISearchClarificationItem[] = [
    {
        title: TEXT.all,
    },
    {
        title: TEXT.clothes,
        additionalMenu: womanClothes,
    },
    {
        title: TEXT.footWear,
        additionalMenu: womanFootWear,
    },
    {
        title: TEXT.bags,
        additionalMenu: bags,
    },
    {
        title: TEXT.weddingClothes,
        additionalMenu: weddingClothes,
    },
    {
        title: TEXT.partyClothes,
        additionalMenu: partyClothes,
    },
    {
        title: TEXT.accessorises,
        additionalMenu: accessorises,
    },
    {
        title: TEXT.garmentCare,
        additionalMenu: garmentCare,
    },
];
