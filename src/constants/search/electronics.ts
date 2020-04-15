import {TEXT} from '../text';

import {ISearchClarificationItem} from '../../types/search';

import {phones} from './phones';
import {audioAndVideo} from './audioAndVideo';
import {smartElectronics} from './smartElectronnics';
import {computers} from './computers';
import {memory} from './memory';
import {electricalGoods} from './electricalGoods';
import {cameras} from './cameras';
import {gameConsoles} from './gameConsoles';
import {opticalGoods} from './opticalGoods';

export const electronics: ISearchClarificationItem[] = [
    {
        title: TEXT.all,
    },
    {
        title: TEXT.phones,
        additionalMenu: phones,
    },
    {
        title: TEXT.audioAndVideo,
        additionalMenu: audioAndVideo,
    },
    {
        title: TEXT.smartElectronics,
        additionalMenu: smartElectronics,
    },
    {
        title: TEXT.computers,
        additionalMenu: computers,
    },
    {
        title: TEXT.memory,
        additionalMenu: memory,
    },
    {
        title: TEXT.electricalGoods,
        additionalMenu: electricalGoods,
    },
    {
        title: TEXT.cameras,
        additionalMenu: cameras,
    },
    {
        title: TEXT.gameConsoles,
        additionalMenu: gameConsoles,
    },
    {
        title: TEXT.opticalGoods,
        additionalMenu: opticalGoods,
    },
];
