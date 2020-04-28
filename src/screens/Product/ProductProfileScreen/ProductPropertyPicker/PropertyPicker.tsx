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
    selectedValue: IProductProperty | undefined;
    setSelectedValue: (value: IProductProperty) => void;
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
    // const isColorProperty: boolean = TEXT.color === propertyName;
    const choosenValue: string | undefined = selectedValue?.value;

    const onItemPress = (item: IProductProperty) => {
        return () => setSelectedValue(item);
    };

    return (
        <View style={styles.propertyContainer}>
            <View style={styles.innerPropertyContainer}>
                <Text style={[styles.text, styles.pickText]}>
                    {selectedValue ? `${propertyName} ${selectedValue.value}` : defaultTitle}
                </Text>

                <View style={styles.bagesContainer}>
                    {propertyList.map((property: IProductProperty) => {
                        const {id} = property;
                        const isSelected: boolean = id === selectedValue?.id;
                        const onPress = onItemPress(property);

                        return renderBage(property, isSelected, onPress);
                    })}
                </View>
            </View>
        </View>
    );
});

export default PropertyPicker;
