import React from 'react';
import {useState, memo} from 'react';
import {
    View,
    Image,
    ActivityIndicator,
} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useSelector, useDispatch} from 'react-redux';

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

import {TEXT, COLORS} from '../../../constants';
import {RootNavigatorRoutes} from '../../../enums';

import {isNotEmptyString} from '../../../utils';

type ScreenNavigationProp = StackNavigationProp<IRootNavigatorParamList, RootNavigatorRoutes.LOGIN>;

interface IProps {
    navigation: ScreenNavigationProp;
}

const Login = memo((props: IProps) => {
    const {navigation} = props;
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [isValidationShown, setIsValidationShown] = useState<boolean>(false);
    const isDataProcessing: boolean = useSelector((store: IState) => store.app.isDataProcessing);
    const dispatch = useDispatch();

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
                onChange={setEmail}
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

            {isDataProcessing &&
                <ActivityIndicator
                    size="large"
                    color={COLORS.LightGrey}
                />
            }

        </LoginAndRegistrationScreenWrapper>
    );
});

export default Login;
