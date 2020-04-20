import {ImageSourcePropType} from 'react-native';
import {AppTab, RootNavigatorRoutes} from '../enums';

export interface IAppTab {
    name: AppTab;
    selectedImg: ImageSourcePropType;
    defaultImg: ImageSourcePropType;
    screen: RootNavigatorRoutes;
}
