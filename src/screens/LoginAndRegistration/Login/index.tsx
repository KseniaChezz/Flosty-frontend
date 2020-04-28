import React from 'react';
import {useState, memo} from 'react';
import {
    View,
    Image,
} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useSelector, useDispatch} from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';

import {styles} from './style';

import {
    LoginAndRegistrationScreenWrapper,
    PlainTextInput,
    PlainButton,
    ColoredButton,
} from '../../../elements';

import {loginUser} from '../../../store/user/thunks/login';

import {IRootNavigatorParamList} from '../../../types/rootNavigator';
import {IState} from '../../../store';

import {TEXT} from '../../../constants';
import {RootNavigatorRoutes} from '../../../enums';

import {isNotEmptyString} from '../../../utils';

type ScreenNavigationProp = StackNavigationProp<IRootNavigatorParamList, RootNavigatorRoutes.LOGIN>;

interface IProps {
    navigation: ScreenNavigationProp;
}

const Login = memo((props: IProps) => {
    const {navigation} = props;
    const [email, setEmail] = useState<string>('boris1234@mail.ru');
    const [password, setPassword] = useState<string>('gfhjkmxbr');
    const [isValidationShown, setIsValidationShown] = useState<boolean>(false);
    const isDataProcessing: boolean = useSelector((store: IState) => store.app.isDataProcessing);
    const dispatch = useDispatch();

    const onEmailChange = (value: string) => {
        if (isValidationShown) {
            setIsValidationShown(false);
        }

        setEmail(value);
    };

    const onPasswordChange = (value: string) => {
        if (isValidationShown) {
            setIsValidationShown(false);
        }

        setPassword(value);
    };

    const onRegisterPress = () => {
        navigation.navigate(RootNavigatorRoutes.REGISTRATION, {screen: 1});
    };

    const loginSuccessCallback = () => {
        navigation.navigate(RootNavigatorRoutes.SUBSCRIPTIONS);
    };

    const onLoginPress = () => {
        if (isNotEmptyString(email) && isNotEmptyString(password)) {
            dispatch(loginUser(email, password, loginSuccessCallback));
        } else {
            setIsValidationShown(true);
        }
    };

    return (
        <LoginAndRegistrationScreenWrapper>

            <View style={styles.logoContainer}>
                <Image
                    style={styles.logoImage}
                    source={require('../../../../assets/images/logotype.png')}
                />
            </View>

            <PlainTextInput
                value={email}
                onChange={onEmailChange}
                placeholder={TEXT.email}
                style={isValidationShown && email === '' ? styles.redBorder : {}}
            />

            <PlainTextInput
                value={password}
                onChange={setPassword}
                placeholder={TEXT.password}
                secureTextEntry={true}
                style={isValidationShown && password === '' ? styles.redBorder : {}}
            />

            <ColoredButton
                text={TEXT.enter}
                onPress={onLoginPress}
                buttonStyle={styles.enterButton}
            />

            <PlainButton
                text={`${TEXT.forgetPassword} ${TEXT.questionMark}`}
                onPress={()=>{}}
            />

            <PlainButton
                text={TEXT.register}
                onPress={onRegisterPress}
            />

            <Spinner visible={isDataProcessing} />

        </LoginAndRegistrationScreenWrapper>
    );
});

export default Login;
