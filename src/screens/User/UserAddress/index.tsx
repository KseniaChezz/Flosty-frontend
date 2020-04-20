import React, {useState, memo} from 'react';
import {
    View,
    Text,
    TextInput,
    ViewStyle,
} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import {useDispatch} from 'react-redux';

import {styles} from './style';

import {
    ScreenWrapperWithBackButton,
    TextInputWithTitleAndValidation,
    ColoredButton,
    ModalWindow
} from '../../../elements';

import {addAddress, deleteAddress} from '../../../store/user/actions';

import {IRootNavigatorParamList} from '../../../types/rootNavigator';
import {IUserAddressField, IUserAddressFieldList} from '../../../types/user';

import {
    TEXT,
    userAddressKeyList,
} from '../../../constants';
import {RootNavigatorRoutes} from '../../../enums';
import {getAddressObjectForSave, validate} from '../../../utils';

type ScreenNavigationProp = StackNavigationProp<IRootNavigatorParamList, RootNavigatorRoutes.USER_PROFILE_ADDRESS>;
type ScreenRouteProp = RouteProp<IRootNavigatorParamList, RootNavigatorRoutes.USER_PROFILE_ADDRESS>;

interface IProps {
    navigation: ScreenNavigationProp;
    route: ScreenRouteProp;
}

const UserAddress = memo((props: IProps) => {
    const {
        navigation,
        route: {
            params: {
                title,
                fieldList: addressFieldList,
                id,
            },
        },
    } = props;
    const [fieldList, setFieldList] = useState<IUserAddressFieldList>(addressFieldList);
    const [errorField, setErrorField] = useState<string>('');
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
    const headerImg = title === TEXT.editAddress ? require('../../../../assets/images/delete.png') : null;
    const dispatch = useDispatch();

    const onBackPress = () => {
        navigation.goBack();
    };

    const onCanselPress = () => {
        setIsModalVisible(false);
    }

    const onDeletePress = () => {
        if (!id) {
            throw new Error('Variable id must be defined');
        }

        dispatch(deleteAddress(id));
        onCanselPress();
        onBackPress();
    }

    const onDeleteIconPress = () => {
        setIsModalVisible(true);
    }

    const onFieldValueChange = (fieldKey: string) => {
        return (value: string) => {
            const nextField: IUserAddressField = {...fieldList[fieldKey], value};

            setFieldList({...fieldList, [fieldKey]: nextField});
        };
    }

    const onSavePress = () => {
        if(!validate(userAddressKeyList, fieldList, setErrorField)) {
            return;
        }

        dispatch(addAddress({...getAddressObjectForSave(fieldList)}));
        onBackPress();
    }

    const renderItem = (field: IUserAddressField, style?: ViewStyle) => {
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
        return userAddressKeyList.slice(fromIndex, tillIndex).map((key: string) => {
            const field: IUserAddressField = fieldList[key];

            return renderItem(field, style);
        })
    };

    return (
        <ScreenWrapperWithBackButton
            text={title}
            img={headerImg}
            onImgPress={onDeleteIconPress}
            onBackPress={onBackPress}
            style={styles.container}
        >
            {renderItems(0, 4)}

            <View style={styles.fieldsContainer}>
                {renderItems(4, 8, styles.flex1)}
            </View>

            {renderItems(8, 11)}

            <View style={styles.fieldsContainer}>

                <TextInputWithTitleAndValidation
                    value={'+7'}
                    onValueChange={()=>{}}
                    title={TEXT.code}
                    style={styles.flex1}
                />

                {renderItems(11, 12, styles.flex5)}

            </View>

            {renderItems(12, 13)}

            <View style={styles.flex1} />

            <View style={styles.saveButtonContainer}>
                <ColoredButton
                    text={TEXT.save}
                    onPress={onSavePress}
                />
            </View>

            <ModalWindow
                isWindowVisible={isModalVisible}
                title={TEXT.deleteAddress}
                text={TEXT.areYouSureToDeleteAddress}
                submitButtonText={TEXT.delete}
                onCancelPress={onCanselPress}
                onSubmitPress={onDeletePress}
            />

        </ScreenWrapperWithBackButton>
    );
});

export default UserAddress;
