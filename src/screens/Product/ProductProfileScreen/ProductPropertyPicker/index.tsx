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

import {IProductProperty, IDescription} from '../../../../types/product';

import {TEXT} from '../../../../constants';

interface IProps {
    colorList: IProductProperty[];
    selectedColor: string;
    setSelectedColor: (value: string) => void;
    sizeList: IProductProperty[];
    selectedSize: string;
    setSelectedSize: (value: string) => void;
    descriptionList: IDescription[];
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
        descriptionList,
        onDescriptionPress,
    } = props;

    const renderColorBage = (property: IProductProperty, isSelected: boolean, onPress: () => void) => {
        const {value, isAvailable} = property;

        return (
            <TouchableOpacity
                key={value}
                disabled={!isAvailable}
                style={[styles.bage, {backgroundColor: value}, isSelected ? styles.bageSelected : null]}
                onPress={onPress}
            />
        );
    };

    const renderSizeBage = (property: IProductProperty, isSelected: boolean, onPress: () => void) => {
        const {value, isAvailable} = property;

        return (
            <TouchableOpacity
                key={value}
                disabled={!isAvailable}
                style={[styles.bage, isSelected ? styles.bageSelected : null]}
                onPress={onPress}
            >
                <Text style={[styles.text, isAvailable ? styles.bageText : styles.bageTextDisabled]}>
                    {value}
                </Text>
            </TouchableOpacity>
        );
    }


    return (
        <View style={styles.container}>
            {colorList.length !== 0 &&
                <PropertyPicker
                    propertyList={colorList}
                    defaultTitle={TEXT.pickColor}
                    propertyName={TEXT.color}
                    selectedValue={selectedColor}
                    setSelectedValue={setSelectedColor}
                    renderBage={renderColorBage}
                />
            }

            {sizeList.length !== 0 &&
                <PropertyPicker
                    propertyList={sizeList}
                    defaultTitle={TEXT.pickSize}
                    propertyName={TEXT.size}
                    selectedValue={selectedSize}
                    setSelectedValue={setSelectedSize}
                    renderBage={renderSizeBage}
                />
            }

            {descriptionList. length !== 0 &&
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
