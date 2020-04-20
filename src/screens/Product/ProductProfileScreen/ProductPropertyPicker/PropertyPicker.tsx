import React, {ReactNode} from 'react';
import {memo, useState} from 'react';
import {
    View,
    Text,
} from 'react-native';

import styles from './style';

import {IProductProperty} from '../../../../types/product';

import {TEXT, productColor} from '../../../../constants';

interface IProps {
    propertyList: IProductProperty[];
    defaultTitle: string;
    propertyName: string;
    selectedValue: string;
    setSelectedValue: (value: string) => void;
    renderBage: (property: IProductProperty, isSelected: boolean, onPress: () => void) => ReactNode;
}

const PropertyPicker = memo((props: IProps) => {
    const {
        propertyList,
        defaultTitle,
        propertyName,
        selectedValue,
        setSelectedValue,
        renderBage,
    } = props;
    const isColorProperty: boolean = TEXT.color === propertyName;
    const valueToRender: string = isColorProperty ? productColor[selectedValue] : selectedValue;

    const onSizePress = (value: string) => {
        return () => setSelectedValue(value);
    };

    return (
        <View style={styles.propertyContainer}>
            <View style={styles.innerPropertyContainer}>
                <Text style={[styles.text, styles.pickText]}>
                    {selectedValue === '' ? defaultTitle : `${propertyName} ${valueToRender}`}
                </Text>

                <View style={styles.bagesContainer}>
                    {propertyList.map((property: IProductProperty) => {
                        const {value} = property;
                        const isSelected: boolean = value === selectedValue;
                        const onPress = onSizePress(value);

                        return renderBage(property, isSelected, onPress);
                    })}
                </View>
            </View>
        </View>
    );
});

export default PropertyPicker;
