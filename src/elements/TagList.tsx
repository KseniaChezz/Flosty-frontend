import React, {memo} from 'react';
import {
    View,
    Text,
    FlatList,
    Image,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';

import {COLORS} from '../constants';
import {ITag} from '../types/shop';

interface IProps {
    tagList: ITag[];
    onItemPress: (item: ITag) => () => void;
    isNoScroll?: boolean;
    isTagsWithCross?: boolean;
}

const TagList = memo((props:IProps) => {
    const {tagList, onItemPress, isNoScroll, isTagsWithCross} = props;

    const renderTag = (info: {item: ITag; index: number;}) => {
        const {item, index} = info;
        const {name} = item;

        return (
            <TouchableOpacity
                key={name}
                style={[getTagStyle(index), isNoScroll ? styles.marginBottom10 : null]}
                onPress={onItemPress(item)}
            >
                <Text style={styles.tagText}>
                    {name}
                </Text>

                {isTagsWithCross &&
                    <Image
                        source={require('../../assets/images/cross_white.png')}
                        style={styles.cross}
                    />
                }
            </TouchableOpacity>
        );
    };

    const keyExtractor = (item: ITag) => {
        return item.name;
    };

    if (isNoScroll) {
        return (
            <View style={styles.noScrollContainer}>
                {tagList.map((item: ITag, index: number) => {
                    return renderTag({item, index})
                })}
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <FlatList<ITag>
                data={tagList}
                renderItem={renderTag}
                keyExtractor={keyExtractor}
                horizontal
                showsHorizontalScrollIndicator={false}
            />
        </View>

    );
});

const styles = StyleSheet.create({
    container: {
        height: 50,
        marginBottom: 20,
    },
    noScrollContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    tagText: {
        fontFamily: 'Montserrat',
        fontSize: 14,
        lineHeight: 18,
        color: COLORS.White,
        fontWeight: '600'
    },
    tagContainer: {
        flexDirection: 'row',
        height: 44,
        alignItems: 'center',
        paddingHorizontal: 10,
        borderRadius: 10,
        marginRight: 10,
    },
    cross: {
        height: 25,
        width: 25,
    },
    marginBottom10: {
        marginBottom: 10,
    },
});

const getTagStyle = (index: number) => {
    const tagColorList: string[] = [COLORS.TagLightBlue, COLORS.TagBlue, COLORS.TagBlueViolet, COLORS.TadDarkBlue];
    const color = index < tagColorList.length ? tagColorList[index] : tagColorList[index % tagColorList.length];

    return StyleSheet.flatten([styles.tagContainer, {backgroundColor: color}]);
}

export default TagList;
