import React, {memo, Fragment} from 'react';
import {View, StyleSheet} from 'react-native';

import {SearchCard} from '../../../elements';

import {ISearchCard} from '../../../types/search';

import {searchCardList} from '../../../constants';

import {getEachNthIndexFromZeroTillMax} from '../../../utils';

interface IProps {
    onCardPress: (card: ISearchCard) => () => void;
}

const SearchCardList = memo((props:IProps) => {
    const {onCardPress} = props;

    const renderSearchCardList = () => {
        const firsrIndexInRowList: number[] = getEachNthIndexFromZeroTillMax(3, searchCardList.length);

        return firsrIndexInRowList.map((item: number, index: number, arr: number[]) => {
            const isLast: boolean = index === arr.length - 1;

            return (
                <View key={item} style={styles.cardContainer}>
                    {renderCards(item)}
                    {isLast && <View style={styles.emptyCard}/>}
                </View>
            )
        });
    };

    const renderCards = (startIndex: number) => {
        return searchCardList.slice(startIndex, startIndex + 3).map((item: ISearchCard, index: number, arr: ISearchCard[]) => {
            const {title, img} = item;
            const isLast: boolean = index === arr.length - 1;

            return (
                <SearchCard
                    key={title}
                    text={title}
                    img={img}
                    onPress={onCardPress(item)}
                    style={isLast ? {} : styles.marginRight10}
                />
            )
        })
    }

    return (
        <Fragment>
            {renderSearchCardList()}
        </Fragment>
    );
});

const styles = StyleSheet.create({
    cardContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    emptyCard: {
        flex: 1,
        marginLeft: 10,
    },
    marginRight10: {
        marginRight: 10,
    }
});

export default SearchCardList;
