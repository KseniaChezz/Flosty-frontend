import React, {memo} from 'react';
import {
    View,
    Text,
    StyleSheet,
    ActivityIndicator,
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
    shopTagList: ITag[];
    onShopTagPress: (item: ITag) => () => void;
    searchText: string;
    setSearchText: (value: string) => void;
    isSubscriptionDataProcessing: boolean;
    onSavePress: () => void;
}

const SubscriptionDetalCard = memo((props: IProps) => {
    const {
        selectedTagList,
        onSelectedTagPress,
        shopTagList,
        onShopTagPress,
        searchText,
        setSearchText,
        isSubscriptionDataProcessing,
        onSavePress,
    } = props;

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
            />

            <Text style={[styles.text, styles.titlePlain, styles.marginTop15]}>
                {TEXT.youAlsoLike}
            </Text>

            <TagList
                tagList={shopTagList}
                onItemPress={onShopTagPress}
            />

            <ColoredButton
                text={TEXT.save}
                onPress={onSavePress}
                buttonStyle={styles.button}
                textStyle={styles.buttonText}
            />

            <View style={styles.activityIndacitorContainer}>
                {isSubscriptionDataProcessing &&
                    <ActivityIndicator
                        size="large"
                        color={COLORS.LightGrey}
                    />
                }
            </View>
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
    buttonText: {
        fontSize: 16,
        lineHeight: 18,
        fontWeight: '500',
        fontFamily: 'Montserrat',
    },
    marginTop15: {
        marginTop: 15,
    },
    activityIndacitorContainer: {
        position: 'absolute',
        bottom: 15,
        left: 0,
        justifyContent: 'center',
        width: '105%',
    }
});

export default SubscriptionDetalCard;
