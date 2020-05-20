import React, {useState, memo, Fragment} from 'react';
import {
    View,
    Text,
    ViewStyle,
} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack/lib/typescript/src/types';
import {RouteProp} from '@react-navigation/native';
import Spinner from 'react-native-loading-spinner-overlay';
import {useSelector, useDispatch} from 'react-redux';

import {styles} from './style';

import {
    ScreenWrapperWithBackButton,
    TextInputWithTitleAndValidation,
    ColoredButton,
    HeaderWithBackButton,
} from '../../../elements';

import {addUserCard} from '../../../store/user/thunks/addUserCard';

import {IRootNavigatorParamList} from '../../../types/rootNavigator';
import {IUserCardField, IUserCardFieldList} from '../../../types/user';
import {IState} from '../../../store';

import {
    TEXT,
    userCardKeyList,
} from '../../../constants';
import {RootNavigatorRoutes} from '../../../enums';

import {getCardObjectForSave, validate} from '../../../utils';

type ScreenNavigationProp = StackNavigationProp<IRootNavigatorParamList, RootNavigatorRoutes.USER_PROFILE_CARD>;
type ScreenRouteProp = RouteProp<IRootNavigatorParamList, RootNavigatorRoutes.USER_PROFILE_CARD>;

interface IProps {
    navigation: ScreenNavigationProp;
    route: ScreenRouteProp;
}

const UserCard = memo((props: IProps) => {
    const {
        navigation,
        route: {
            params: {
                title,
                fieldList: cardFieldList,
                isModalMode,
                onAddCardSuccess,
            },
        },
    } = props;
    const [fieldList, setFieldList] = useState<IUserCardFieldList>(cardFieldList);
    const [errorField, setErrorField] = useState<string>('');
    const isDataProcessing: boolean = useSelector((store: IState) => store.user.isProcessingData);
    const dispatch = useDispatch();

    const onBackPress = () => {
        navigation.goBack();
    };

    const onFieldValueChange = (fieldKey: string) => {
        return (value: string) => {
            const nextField: IUserCardField = {...fieldList[fieldKey], value};

            setFieldList({...fieldList, [fieldKey]: nextField});
        };
    }

    const onSavePress = () => {
        if(!validate(userCardKeyList, fieldList, setErrorField)) {
            return;
        }

        if (isModalMode) {
            dispatch(addUserCard(getCardObjectForSave(fieldList), onAddCardSuccess));
        } else {
            dispatch(addUserCard(getCardObjectForSave(fieldList)));
        }

        onBackPress();
    }

    const renderItem = (field: IUserCardField, style?: ViewStyle) => {
        const {
            title,
            value,
        } = field;

        return (
            <TextInputWithTitleAndValidation
                key={title}
                value={value}
                onValueChange={onFieldValueChange(title)}
                title={title}
                isErrorShown={errorField === title}
                errorText={TEXT.fieldNotBeEmpty}
                style={style}
            />
        );
    };

    const renderItems = (fromIndex: number, tillIndex: number, style?: ViewStyle) => {
        return userCardKeyList.slice(fromIndex, tillIndex).map((key: string) => {
            const field: IUserCardField = fieldList[key];

            return renderItem(field, style);
        })
    };

    const renderContent = () => {
        return (
            <Fragment>
                {renderItems(0, 2)}

                <View style={styles.fieldsContainer}>
                    {renderItems(2, 4, styles.flex1)}
                </View>

                <View style={[styles.flex1, styles.textContainer]}>
                    <Text style={styles.text}>
                        {TEXT.cardListToPay}
                    </Text>
                    <Text style={styles.text}>
                        {TEXT.paymentProtection}
                    </Text>
                </View>

                <View style={styles.saveButtonContainer}>
                    <ColoredButton
                        text={TEXT.save}
                        onPress={onSavePress}
                    />
                </View>
            </Fragment>
        );
    };

    if (isModalMode) {
        return (
            <View style={styles.modalContainer}>

                <HeaderWithBackButton
                    text={TEXT.bankCard}
                    noShadow={true}
                    onBackPress={onBackPress}
                    center={true}
                />

                <View style={styles.flex1}>
                    {renderContent()}
                </View>

                <Spinner visible={isDataProcessing} />

            </View>
        );
    }

    return (
        <ScreenWrapperWithBackButton
            text={title}
            onBackPress={onBackPress}
            style={styles.container}
        >
            {renderContent()}
            <Spinner visible={isDataProcessing} />
        </ScreenWrapperWithBackButton>
    );
});

export default UserCard;
