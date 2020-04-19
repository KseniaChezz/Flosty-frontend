import React from 'react';
import {memo} from 'react';
import {View, Image, ImageSourcePropType, TouchableOpacity, StyleSheet} from 'react-native';

import {goBack} from '../../../utils';

interface IProps {
    img: ImageSourcePropType;
}

const ProductImage = memo((props: IProps) => {
    const {img} = props;
    const source =  Image.resolveAssetSource(img)
    const {width, height} = Image.resolveAssetSource(source);
    const ratio: number = width / height;

    const onBackPress = () => {
        goBack();
    };

    return (
        <View style={styles.imgContainer}>
            <Image
                source={img}
                style={[styles.img, {aspectRatio: ratio}]}
            />
            <View style={styles.backContainer}>
                <TouchableOpacity onPress={onBackPress}>
                    <Image
                        source={require('../../../../assets/images/before.png')}
                        style={styles.backImg}
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
});

const styles = StyleSheet.create({
    imgContainer: {
        position: 'relative',
    },
    img: {
        width: '100%',
        height: undefined,
        resizeMode: 'contain',
    },
    backContainer: {
        height: 48,
        flexDirection: 'row',
        alignItems: 'center',
        position: 'absolute',
        top: 0,
        paddingHorizontal: 10,
    },
    backImg: {
        width: 30,
        height: 30,
    },
});

export default ProductImage;
