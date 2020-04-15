import {TEXT} from '../text';

import {ISearchCard} from '../../types/search';

import {electronics} from './electronics';
import {woman} from './woman';
import {beauty} from './beauty';

export const searchCardList: ISearchCard[] = [
    {
        title: TEXT.electronics,
        img: require('../../../assets/images/camera.png'),
        additionalMenu: electronics,
    },
    {
        title: TEXT.womanClothes,
        img: require('../../../assets/images/dress.png'),
        additionalMenu: woman,
    },
    {
        title: TEXT.beauty,
        img: require('../../../assets/images/style.png'),
        additionalMenu: beauty,
    },
    {
        title: TEXT.bagsAndCases,
        img: require('../../../assets/images/bag.png'),
    },
    {
        title: TEXT.manClothes,
        img: require('../../../assets/images/suit.png'),
    },
    {
        title: TEXT.jewellry,
        img: require('../../../assets/images/diamond.png'),
    },
    {
        title: TEXT.homeGoods,
        img: require('../../../assets/images/home.png'),
    },
    {
        title: TEXT.repairGoods,
        img: require('../../../assets/images/tools.png'),
    },
    {
        title: TEXT.gardenGoods,
        img: require('../../../assets/images/plant.png'),
    },
    {
        title: TEXT.sportGoods,
        img: require('../../../assets/images/scuba_gear.png'),
    },
    {
        title: TEXT.childrenGoods,
        img: require('../../../assets/images/toys.png'),
    },
    {
        title: TEXT.animalGoods,
        img: require('../../../assets/images/pets.png'),
    },
    {
        title: TEXT.hobbyGoods,
        img: require('../../../assets/images/hobby.png'),
    },
    {
        title: TEXT.paperGoods,
        img: require('../../../assets/images/stationery.png'),
    },
];
