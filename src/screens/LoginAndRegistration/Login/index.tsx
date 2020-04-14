import React from 'react';
import {useState, memo} from 'react';
import {
    View,
    Image,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

import {styles} from './style';

import {
    LoginAndRegistrationScreenWrapper,
    PlainTextInput,
    PlainButton,
    ColoredButton,
} from '../../../elements';

import {IRootNavigatorParamList} from '../../../types/rootNavigator';

import {TEXT} from '../../../constants';
import {RootNavigatorRoutes} from '../../../enums';

type ScreenNavigationProp = StackNavigationProp<IRootNavigatorParamList, RootNavigatorRoutes.LOGIN>;

interface IProps {
    navigation: ScreenNavigationProp;
}

const Login = memo((props: IProps) => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const onRegisterPress = () => {
        props.navigation.navigate(RootNavigatorRoutes.REGISTRATION, {screen: 1});
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
            />

            <PlainTextInput
                value={password}
                onChange={setPassword}
                placeholder={TEXT.password}
                secureTextEntry={true}
            />

            <ColoredButton
                text={TEXT.enter}
                onPress={()=>{}}
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

        </LoginAndRegistrationScreenWrapper>
    );
});

export default Login;
