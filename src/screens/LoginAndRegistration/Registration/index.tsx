import React, {useState, memo} from 'react';
import {StackNavigationProp} from '@react-navigation/stack/lib/typescript/src/types';
import {RouteProp} from '@react-navigation/native';

import {styles} from './style';

import {
    LoginAndRegistrationScreenWrapper,
    PlainButton,
    ImageButtonWithText,
    ColoredButton,
    Title,
    SubTitle,
} from '../../../elements';

import {ILoginAndRegistrationNavigatorParamList} from '../../../types/loginAndRegistrationNavigator';

import {TEXT, registrationScreenNumber} from '../../../constants';
import {LoginAndRegistrationNavigatorRoutes} from '../../../enums';

type ScreenNavigationProp = StackNavigationProp<
    ILoginAndRegistrationNavigatorParamList,
    LoginAndRegistrationNavigatorRoutes.REGISTRATION_SCREEN>;
type ScreenRouteProp = RouteProp<
    ILoginAndRegistrationNavigatorParamList,
    LoginAndRegistrationNavigatorRoutes.REGISTRATION_SCREEN>;

interface IProps {
    navigation: ScreenNavigationProp;
    route: ScreenRouteProp;
}

const Registration = memo((props: IProps) => {
    const {
        route: {
            params: {
                screen,
            },
        },
        navigation,
    } = props;
    const [account, setAccount] = useState<string>('');

    const onBackPress = () => {
        navigation.goBack();
    };

    const onNextPress = () => {
        switch (account) {
            case TEXT.private:
                props.navigation.navigate(LoginAndRegistrationNavigatorRoutes.REGISTRATION_FORM_SCREEN, {screen: 2});
                break;
            default:
                break;
        }
    };

    const onAccountPress = (account: string) => () => {
        setAccount(account);
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

            <ImageButtonWithText
                img={require('../../../../assets/images/private_icon.png')}
                text={TEXT.private}
                isSelected={account === TEXT.private}
                onPress={onAccountPress(TEXT.private)}
            />

            <ImageButtonWithText
                img={require('../../../../assets/images/business_icon.png')}
                text={TEXT.business}
                isSelected={account === TEXT.business}
                onPress={onAccountPress(TEXT.business)}
            />

            <ColoredButton
                text={TEXT.next}
                onPress={onNextPress}
                buttonStyle={styles.nextButton}
            />

            <PlainButton
                text={TEXT.back}
                onPress={onBackPress}
            />

        </LoginAndRegistrationScreenWrapper>
    );
});

export default Registration;
