import React, {useState} from 'react';
import {memo} from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
} from 'react-native';
import Carousel, {CarouselStatic} from 'react-native-snap-carousel';

import {goBack} from '../../../utils';

import {COLORS} from '../../../constants';

interface IProps {
    imageList: string[];
}

const {width} = Dimensions.get('window');

const ProductImage = memo((props: IProps) => {
    const {imageList} = props;
    const [index, setIndex] = useState<number>(0);

    const onBackPress = () => {
        goBack();
    };

    const onSnapToItem = (index: number) => {
        setIndex(index);
    };


    const renderItem = (item: {item: string; index: number;}) => {
        const {
            item: image,
            index,
        } = item;

        return (
            <Image
                source={{uri: image}}
                style={[styles.img]}
            />
        );
    };

    return (
        <View style={styles.imgContainer}>
            <Carousel<string>
                data={imageList}
                renderItem={renderItem}
                sliderWidth={width * imageList.length}
                itemWidth={width}
                layout={'default'}
                firstItem={index}
                activeSlideAlignment={'start'}
                onSnapToItem={onSnapToItem}
            />

            <View style={styles.backContainer}>
                <TouchableOpacity onPress={onBackPress} style={styles.row}>
                    <Image
                        source={require('../../../../assets/images/before.png')}
                        style={styles.backImg}
                    />
                </TouchableOpacity>

                <View style={styles.countContainer}>
                    <Text style={styles.count}>
                        {index + 1} / {imageList.length}
                    </Text>
                </View>
            </View>
        </View>
    );
});

const styles = StyleSheet.create({
    imgContainer: {
        position: 'relative',
    },
    img: {
        width: width,
        height: 400,
        resizeMode: 'contain',
    },
    backContainer: {
        position: 'absolute',
        top: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        width: '100%',
        alignItems: 'center',
        height: 48,
    },
    row: {
    },
    backImg: {
        width: 30,
        height: 30,
    },
    countContainer: {
        backgroundColor: COLORS.LightGrey,
        height: 28,
        borderRadius: 14,
        paddingHorizontal: 10,
    },
    count: {
        fontFamily: 'Montserrat',
        color: COLORS.White,
        fontSize: 14,
        lineHeight: 28,
        fontWeight: '600',
    }
});

export default ProductImage;
