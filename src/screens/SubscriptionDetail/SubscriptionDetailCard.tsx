import React, {memo} from 'react';
import {
    View,
    Text,
    StyleSheet,
} from 'react-native';

import {
    ColoredButton,
    SearchInput,
    TagList,
} from '../../elements';

import {TEXT, COLORS} from '../../constants';

import {ITag} from '../../types/shop';

interface IProps {
    selectedTagList: ITag[];
    onSelectedTagPress: (item: ITag) => () => void;
    popularTagList: ITag[] | undefined;
    onPopularTagPress: (item: ITag) => () => void;
    searchText: string;
    setSearchText: (value: string) => void;
    onSavePress: () => void;
    isSelectedTagListSame: boolean;
}

const SubscriptionDetalCard = memo((props: IProps) => {
    const {
        selectedTagList,
        onSelectedTagPress,
        popularTagList,
        onPopularTagPress,
        searchText,
        setSearchText,
        onSavePress,
        isSelectedTagListSame,
    } = props;
    const isDisabled: boolean = selectedTagList.length === 0 || isSelectedTagListSame;

    return (
        <View style={styles.detailContainer}>
            <Text style={[styles.text, styles.titleBold]}>
                {TEXT.subscriptionAdjustment}
            </Text>

            <Text style={[styles.text, styles.titlePlain]}>
                {TEXT.youChoose}
            </Text>

            <TagList
                tagList={selectedTagList}
                isNoScroll={true}
                isTagsWithCross={true}
                onItemPress={onSelectedTagPress}
            />

            <Text style={[styles.text, styles.titlePlain]}>
                {TEXT.findYouNeed}
            </Text>

            <SearchInput
                text={searchText}
                onTextChange={setSearchText}
                onPress={()=>{}}
            />

            {popularTagList &&
                <Text style={[styles.text, styles.titlePlain, styles.marginTop15]}>
                    {TEXT.youAlsoLike}
                </Text>
            }

            {popularTagList &&
                <TagList
                    tagList={popularTagList}
                    onItemPress={onPopularTagPress}
                />
            }

            <ColoredButton
                text={TEXT.save}
                onPress={onSavePress}
                buttonStyle={isDisabled ? styles.disabledButton : styles.button}
                textStyle={styles.buttonText}
                isDisabled={isDisabled}
            />
        </View>
    );
});

const styles = StyleSheet.create({
    detailContainer: {
        position: 'relative',
        backgroundColor: COLORS.White,
        paddingHorizontal: 8,
        marginTop: 10,
    },
    text: {
        fontFamily: 'Montserrat',
        color: COLORS.DarkGrey,
        zIndex: 0,
    },
    titleBold: {
        fontSize: 18,
        lineHeight: 22,
        marginTop: 18,
        fontWeight: '600',
    },
    titlePlain: {
        fontSize: 16,
        lineHeight: 18,
        marginBottom: 10,
        marginTop: 20,
    },
    button: {
        height: 44,
        marginBottom: 10,
        marginTop: 0,
    },
    disabledButton: {
        height: 44,
        marginBottom: 10,
        marginTop: 0,
        backgroundColor: COLORS.Border,
    },
    buttonText: {
        fontSize: 16,
        lineHeight: 18,
        fontWeight: '500',
        fontFamily: 'Montserrat',
    },
    marginTop15: {
        marginTop: 15,
    },
});

export default SubscriptionDetalCard;
