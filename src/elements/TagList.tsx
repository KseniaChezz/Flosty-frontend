import React, {memo} from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';

import {COLORS} from '../constants';

interface IProps {
    tagList: string[];
}

const TagList = memo((props:IProps) => {
    const {tagList} = props;

    const renderTag = (info: {item: string; index: number;}) => {
        const {item, index} = info;
        return (
            <View style={getTagStyle(index)}>
                <Text style={styles.tagText}>
                    {item}
                </Text>
            </View>
        );
    };

    const keyExtractor = (item: string) => {
        return item;
    };

    return (
        <View style={styles.container}>
            <FlatList<string>
                data={tagList}
                renderItem={renderTag}
                keyExtractor={keyExtractor}
                horizontal
            />
        </View>

    );
});

const styles = StyleSheet.create({
    container: {
        height: 50,
        marginBottom: 20,
    },
    tagText: {
        fontFamily: 'Montserrat',
        fontSize: 14,
        lineHeight: 18,
        color: COLORS.White,
        fontWeight: '600'
    },
    tagContainer: {
        height: 44,
        justifyContent: 'center',
        paddingHorizontal: 10,
        borderRadius: 10,
        marginRight: 10,
    },
});

const getTagStyle = (index: number) => {
    const tagColorList: string[] = [COLORS.TagLightBlue, COLORS.TagBlue, COLORS.TagBlueViolet, COLORS.TadDarkBlue];
    const color = index < tagColorList.length ? tagColorList[index] : tagColorList[index % tagColorList.length];

    return StyleSheet.flatten([styles.tagContainer, {backgroundColor: color,}]);
}

export default TagList;
