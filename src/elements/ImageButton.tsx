import React from 'react';
import {memo} from 'react';
import {
    Image,
    ImageSourcePropType,
    TouchableOpacity,
    ImageStyle,
} from 'react-native';

interface IProps {
    img: ImageSourcePropType;

    onPress: () => void;

    style: ImageStyle;
}

const ImageButton = memo((props: IProps) => {
    const {
        img,
        style,
        onPress,
    } = props;

    return (
        <TouchableOpacity
            onPress={onPress}
        >
            <Image
                style={style}
                source={img}
            />
        </TouchableOpacity>
    );
});

export default ImageButton;
