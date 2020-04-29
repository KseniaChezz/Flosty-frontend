import React from 'react';
import {memo, useState} from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';

import {COLORS, TEXT} from '../../../constants';

import {ITag} from '../../../types/shop';
import { navigate } from '../../../utils';
import { RootNavigatorRoutes } from '../../../enums';

interface IProps {
    tagList: ITag[];
}

const TagListSection = memo((props: IProps) => {
    const {tagList} = props;

    const onTagPress = (id: number | string) => {
        if (typeof id === 'number') {
            return () => {
                navigate(RootNavigatorRoutes.TAG_PROFILE, {id})
            }
        }

        return () => {
            navigate(RootNavigatorRoutes.SHOP_PROFILE, {id: +id})
        }
    }

    return (
        <View style={styles.container}>
            <Text style={[styles.text, styles.title]}>
                {TEXT.tags}
            </Text>

            <View style={styles.tagContainer}>
                {tagList.map((tag: ITag) => {
                    const {name, id} = tag;

                    return (
                        <TouchableOpacity onPress={onTagPress(id)}>
                            <Text
                                key={name}
                                style={[styles.text, styles.tag]}
                            >
                                #{name}
                            </Text>
                        </TouchableOpacity>
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
