import React, {useState, memo} from 'react';
import {
    Text,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

import {styles} from './style';

import {
    LoginAndRegistrationScreenWrapper,
    PlainTextInput,
    PlainButton,
    ColoredButton,
    SubTitle,
    Title,
} from '../../../elements';

import {IRootNavigatorParamList} from '../../../types/rootNavigator';

import {
    TEXT,
    registrationScreenNumber,
} from '../../../constants';
import {RootNavigatorRoutes} from '../../../enums';

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

    const onBackPress = () => {
        navigation.goBack();
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
            />

            <PlainTextInput
                value={name}
                onChange={setName}
                placeholder={TEXT.name}
            />

            <PlainTextInput
                value={password}
                onChange={setPassword}
                placeholder={TEXT.password}
                secureTextEntry={true}
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
                onPress={()=>{}}
            />

            <PlainButton
                text={TEXT.back}
                onPress={onBackPress}
            />

        </LoginAndRegistrationScreenWrapper>
    );
});

export default RegistrationForm;
