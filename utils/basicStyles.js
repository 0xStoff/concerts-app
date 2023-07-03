import {StyleSheet} from "react-native";
import {BASE_SIZE} from "./constants";


export const shadow = {
    shadowColor: '#000',
    shadowOffset: {
        width: 0,
        height: -10,
    },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 0.5
}
export const basicStyles = StyleSheet.create({
    caption: {
        color: '#667085',
        fontSize: BASE_SIZE,
        fontFamily: 'Inter-Light',
    },
    subTitle: {
        color: '#000',
        fontSize: BASE_SIZE * 1.2,
        fontFamily: 'Inter-Regular',
    },
    title: {
        color: '#000',
        fontSize: BASE_SIZE * 1.8,
        fontFamily: 'Inter-Bold',
    },
});
