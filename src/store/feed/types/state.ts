import {IFeedProduct} from '../../../types/product';

export interface IFeedState {
    list: IFeedProduct[];
    isLoading: boolean;
}
