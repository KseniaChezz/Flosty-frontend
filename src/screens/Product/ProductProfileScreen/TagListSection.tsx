import React from 'react';
import {memo, useState} from 'react';
import {
    Text,
    View,
    StyleSheet,
} from 'react-native';

import {COLORS, TEXT} from '../../../constants';

interface IProps {
    tagList: string[];
}

const TagListSection = memo((props: IProps) => {
    const {tagList} = props;

    return (
        <View style={styles.container}>
            <Text style={[styles.text, styles.title]}>
                {TEXT.tags}
            </Text>

            <View style={styles.tagContainer}>
                {tagList.map((tag: string) => {
                    return (
                        <Text
                            key={tag}
                            style={[styles.text, styles.tag]}
                        >
                            {tag}
                        </Text>
                    )
                })}
            </View>
        </View>
    );
});

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.White,
        paddingHorizontal: 12,
        paddingVertical: 10,
        marginBottom: 10,
    },
    text: {
        fontFamily: 'Montserrat',
    },
    title: {
        color: COLORS.DarkGrey,
        fontSize: 16,
        lineHeight: 20,
        fontWeight: '600',
        marginBottom: 15,
    },
    tagContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    tag: {
        color: COLORS.Blue,
        fontSize: 14,
        lineHeight: 18,
        marginRight: 10,
    },
});

export default TagListSection;
