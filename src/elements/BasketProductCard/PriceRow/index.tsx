import React, {memo} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
} from 'react-native';

import Price from '../../Price';

import {styles} from './style';

interface IProps {
    price: number;
    quantity: number;
    onIncreaseProductQuantityPress: () => void;
    onDecreaseProductQuantityPress: () => void;
}

const PriceRow = memo((props: IProps) => {
    const {
        price,
        quantity,
        onIncreaseProductQuantityPress,
        onDecreaseProductQuantityPress,
    } = props;

    return (
        <View style={styles.priceContainer}>
            <View style={styles.priceInnerContainer}>
                <View style={styles.addDeleteContainer}>
                    <TouchableOpacity onPress={onDecreaseProductQuantityPress}>
                        <Text style={styles.text}>
                            –
                        </Text>
                    </TouchableOpacity>

                    <Text style={styles.text}>
                        {quantity}
                    </Text>

                    <TouchableOpacity onPress={onIncreaseProductQuantityPress}>
                        <Text style={styles.text}>
                            +
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <Image
                            source={require('../../../../assets/images/delete.png')}
                            style={styles.delete}
                        />
                    </TouchableOpacity>
                </View>

                <Price price={price * quantity}/>
            </View>
        </View>
    );
});

export default PriceRow;
