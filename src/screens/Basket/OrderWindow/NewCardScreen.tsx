import React, {useState, memo} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
    ViewStyle,
} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';

import {HeaderWithBackButton, TextInputWithTitleAndValidation} from '../../../elements';

import {IOrderNavigatorParamList} from '../../../types/orderNavigator';
import {IUserCardField, IUserCardFieldList} from '../../../types/user';

import {OrderNavigatorRoutes} from '../../../enums/orderNavigatorRoutes';
import {TEXT, COLORS, userCardKeyList} from '../../../constants';

import {getCardObjectForRender} from '../../../utils';

type ScreenNavigationProp = StackNavigationProp<IOrderNavigatorParamList, OrderNavigatorRoutes.ROOT_ORDER_SCREEN>;

interface IProps {
    navigation: ScreenNavigationProp;
}

const NewCardScreen = memo((props: IProps) => {
    const {
        navigation,
    } = props;
    const [fieldList, setFieldList] = useState<IUserCardFieldList>(getCardObjectForRender());
    const [errorField, setErrorField] = useState<string>('');

    const onBackPress = () => {
        navigation.goBack();
    };

    const onFieldValueChange = (fieldKey: string) => {
        return (value: string) => {
            const nextField: IUserCardField = {...fieldList[fieldKey], value};

            setFieldList({...fieldList, [fieldKey]: nextField});
        };
    }

    const renderItems = (fromIndex: number, tillIndex: number, style?: ViewStyle) => {
        return userCardKeyList.slice(fromIndex, tillIndex).map((key: string) => {
            const field: IUserCardField = fieldList[key];

            return renderItem(field, style);
        })
    };

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

    return (
        <View style={styles.container}>

            <HeaderWithBackButton
                text={TEXT.bankCard}
                noShadow={true}
                onBackPress={onBackPress}
                center={true}
            />

            <View style={styles.mainContent}>
                {renderItems(0, 2)}

                <View style={styles.fieldsContainer}>
                    {renderItems(2, 5, styles.flex1)}
                </View>

                <View style={[styles.flex1, styles.textContainer]}>
                    <Text style={styles.text}>
                        {TEXT.cardListToPay}
                    </Text>
                    <Text style={styles.text}>
                        {TEXT.paymentProtection}
                    </Text>
                </View>
            </View>

        </View>
    );
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.White,
    },
    mainContent: {
        flex: 1,
    },
    fieldsContainer: {
        flexDirection: 'row',
    },
    textContainer: {
        paddingTop: 20,
        paddingHorizontal: 12,
    },
    flex1: {
        flex: 1,
    },
    text: {
        fontSize: 10,
        lineHeight: 14,
        fontFamily: 'Montserrat',
        color: COLORS.DarkGrey,
        marginBottom: 10,
    },
});

export default NewCardScreen;
