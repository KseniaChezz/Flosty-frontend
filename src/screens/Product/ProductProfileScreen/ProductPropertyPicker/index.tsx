import React from 'react';
import {memo, useState} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
} from 'react-native';

import styles from './style';

import PropertyPicker from './PropertyPicker';
import {RowMenuItem} from '../../../../elements';

import {IProductProperty, IColor} from '../../../../types/product';

import {TEXT} from '../../../../constants';

interface IProps {
    colorList: IColor[] | undefined;
    selectedColor: IProductProperty | undefined;
    setSelectedColor: (value: IProductProperty) => void;
    sizeList: IProductProperty[] | undefined;
    selectedSize: IProductProperty | undefined;
    setSelectedSize: (value: IProductProperty) => void;
    characteristic: string;
    onDescriptionPress: () => void;
}

const ProductPropertyPicker = memo((props: IProps) => {
    const {
        colorList,
        sizeList,
        selectedColor,
        setSelectedColor,
        selectedSize,
        setSelectedSize,
        characteristic,
        onDescriptionPress,
    } = props;

    const renderColorBage = (property: IProductProperty, isSelected: boolean, onPress: () => void) => {
        const {id, value, code} = property;

        return (
            <TouchableOpacity
                key={id}
                style={[styles.bage, styles.bageColor, {backgroundColor: code}, isSelected ? styles.bageSelected : null]}
                onPress={onPress}
            />
        );
    };

    const renderSizeBage = (property: IProductProperty, isSelected: boolean, onPress: () => void) => {
        const {id, value} = property;

        return (
            <TouchableOpacity
                key={id}
                style={[styles.bage, isSelected ? styles.bageSelected : null]}
                onPress={onPress}
            >
                <Text style={[styles.text, styles.bageText]}>
                    {value}
                </Text>
            </TouchableOpacity>
        );
    }


    return (
        <View style={styles.container}>
            {colorList && colorList.length !== 0 &&
                <PropertyPicker
                    propertyList={colorList}
                    defaultTitle={TEXT.pickColor}
                    propertyName={TEXT.color}
                    selectedValue={selectedColor}
                    setSelectedValue={setSelectedColor}
                    renderBage={renderColorBage}
                />
            }

            {sizeList && sizeList.length !== 0 &&
                <PropertyPicker
                    propertyList={sizeList}
                    defaultTitle={TEXT.pickSize}
                    propertyName={TEXT.size}
                    selectedValue={selectedSize}
                    setSelectedValue={setSelectedSize}
                    renderBage={renderSizeBage}
                />
            }

            {!!characteristic &&
                <RowMenuItem
                    text={TEXT.productDescription}
                    isIconShown={true}
                    onPress={onDescriptionPress}
                />
            }
        </View>
    );
});

export default ProductPropertyPicker;
