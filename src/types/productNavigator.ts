import {IDescription} from './product';

export type IProductNavigatorParamList = {
    ProductProfileScreen: undefined;
    DescriptionScreen: {descriptionList: IDescription[]};
    GuaranteeScreen: undefined;
};
