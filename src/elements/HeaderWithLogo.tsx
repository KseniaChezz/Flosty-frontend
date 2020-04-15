import React from 'react';
import {memo} from 'react';
import {Image, ImageSourcePropType, StyleSheet} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';

import HeaderLine from './HeaderLine';
import ImageButton from './ImageButton';

import {setAppTab} from '../store/app/actions';

import {RootNavigatorRoutes, AppTab} from '../enums';

import {IState} from '../store';

interface IProps {
  navigation: any;
}

const HeaderWithLogo = memo((props: IProps) => {
  const {navigation} = props;
  const selectedTab: AppTab = useSelector((state: IState) => state.app.selectedTab);
  const dispatch = useDispatch();
  const img: ImageSourcePropType =
    selectedTab === AppTab.USER
      ? require('../../assets/images/profile_select.png')
      : require('../../assets/images/profile_default.png');

  const onUserPress = () => {
    dispatch(setAppTab(AppTab.USER));
    navigation.navigate(RootNavigatorRoutes.USER_PROFILE);
  };

  return (
    <HeaderLine>

      <Image style={styles.logoImage} source={require('../../assets/images/logotype.png')} />

      <ImageButton img={img} style={styles.userImage} onPress={onUserPress} />

    </HeaderLine>
  );
});

const styles = StyleSheet.create({
  logoImage: {
    height: 26,
    width: 90,
  },
  userImage: {
    height: 26,
    width: 26,
  },
});

export default HeaderWithLogo;
