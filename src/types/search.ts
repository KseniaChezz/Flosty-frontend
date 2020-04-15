import { ImageSourcePropType } from "react-native";

export interface ISearchCard {
    title: string;
    img: ImageSourcePropType,
    additionalMenu?: ISearchClarificationItem[];
}

export interface ISearchClarificationItem {
    title: string;
    additionalMenu?: ISearchClarificationItem[];
}
