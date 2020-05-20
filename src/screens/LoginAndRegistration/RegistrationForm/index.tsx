import React, {useState, memo} from 'react';
import {
    Text,
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import {StackNavigationProp} from '@react-navigation/stack/lib/typescript/src/types';
import {RouteProp} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';

import {styles} from './style';

import {
    LoginAndRegistrationScreenWrapper,
    PlainTextInput,
    PlainButton,
    ColoredButton,
    SubTitle,
    Title,
} from '../../../elements';

import {registerUser} from '../../../store/user/thunks/register';

import {IRootNavigatorParamList} from '../../../types/rootNavigator';
import {IState} from '../../../store';

import {
    TEXT,
    registrationScreenNumber,
    COLORS,
} from '../../../constants';
import {RootNavigatorRoutes} from '../../../enums';

import {isNotEmptyString} from '../../../utils';

type ScreenNavigationProp = StackNavigationProp<IRootNavigatorParamList, RootNavigatorRoutes.REGISTRATION_FORM>;
type ScreenRouteProp = RouteProp<IRootNavigatorParamList, RootNavigatorRoutes.REGISTRATION_FORM>;

interface IProps {
    navigation: ScreenNavigationProp;
    route: ScreenRouteProp;
}

const RegistrationForm = memo((props: IProps) => {
    const {
        route: {
            params: {
                screen,
            },
        },
        navigation,
    } = props;
    const [email, setEmail] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [isValidationShown, setIsValidationShown] = useState<boolean>(false);
    const isDataProcessing: boolean = useSelector((store: IState) => store.app.isDataProcessing);
    const dispatch = useDispatch();

    const onBackPress = () => {
        navigation.goBack();
    };

    const registerSuccessCallback = () => {
        navigation.navigate(RootNavigatorRoutes.SUBSCRIPTIONS);
    };

    const onRegisterButtonPress = () => {
        if (isNotEmptyString(email) && isNotEmptyString(name) && isNotEmptyString(password)) {
            dispatch(registerUser(email, password, name, registerSuccessCallback));
        } else {
            setIsValidationShown(true);
        }
    };

    return (
        <LoginAndRegistrationScreenWrapper>
            <SubTitle
                text={`${TEXT.registration} ${screen} ${TEXT.of} ${registrationScreenNumber}`}
                textStyle={styles.subtitle}
            />

            <Title
                text={TEXT.fillRegistrationForm}
                textStyle={styles.title}
            />

            <PlainTextInput
                value={email}
                onChange={setEmail}
                placeholder={TEXT.email}
                style={isValidationShown && email === '' ? styles.redBorder : {}}
            />

            <PlainTextInput
                value={name}
                onChange={setName}
                placeholder={TEXT.name}
                style={isValidationShown && name === '' ? styles.redBorder : {}}
            />

            <PlainTextInput
                value={password}
                onChange={setPassword}
                placeholder={TEXT.password}
                secureTextEntry={true}
                style={isValidationShown && password === '' ? styles.redBorder : {}}
            />

            <Text style={styles.conditionsText}>
                {TEXT.approveText}

                <Text
                    style={[styles.conditionsText, styles.conditionButtonText]}
                    onPress={()=>{}}
                >
                    {` ${TEXT.conditions} `}
                </Text>

                {`${TEXT.and} `}

                <Text
                    style={[styles.conditionsText, styles.conditionButtonText]}
                    onPress={()=>{}}
                >
                    {TEXT.privacyPolicyObjectiveCase}
                </Text>

            </Text>

            <ColoredButton
                text={TEXT.register}
                onPress={onRegisterButtonPress}
            />

            <PlainButton
                text={TEXT.back}
                onPress={onBackPress}
            />

            <Spinner
                visible={isDataProcessing}
            />

        </LoginAndRegistrationScreenWrapper>
    );
});

export default RegistrationForm;
