import {StyleSheet, TouchableOpacity} from "react-native";
import React from "react";
import {useNavigation} from "@react-navigation/native";
import {BasicImage} from "../basics/BasicImage";
import {EventDetails} from "./EventDetails";
import {screenWidth} from "../../utils/constants";
import {shadow} from "../../utils/basicStyles";

const CardComponent = ({cardType, type, id, asset, ...rest}) => {
    const navigation = useNavigation();

    if ((cardType === 'wide' && type !== 'past') || (cardType !== 'wide' && type === 'past')) {
        return null;
    }

    const isPast = cardType === 'wide';
    const styles = isPast ? stylesWide : stylesDefault;
    const eventDetailsStyle = isPast ? eventDetailsStyleWide : eventDetailsStyleDefault;

    const onPress = () => navigation.navigate('Details', id);

    const Details = <EventDetails key='details' customStyles={eventDetailsStyle} type={type} id={id} {...rest} />
    const Image = <BasicImage key='image' style={isPast ? styles.image : {flex: 1}} asset={asset}/>

    return (
        <TouchableOpacity onPress={onPress} style={styles.card}>
            {isPast ? [Details, Image] : [Image, Details]}
        </TouchableOpacity>
    );
};

export const Card = React.memo(CardComponent);

const eventDetailsStyleDefault = {
    container: {
        padding: 20,
    },
    title: {
        paddingTop: 10,
        paddingBottom: 5
    },
    location: {
        paddingBottom: 1
    }
}


const eventDetailsStyleWide = {
    container: {
        flex: 2
    },
    title: {
        paddingVertical: 5,
    },
    location: {
        paddingBottom: 1
    }
}

const stylesDefault = StyleSheet.create({
    card: {
        borderRadius: 8,
        width: screenWidth * 0.65,
        aspectRatio: 0.8,
        overflow: 'hidden',
        marginBottom: 30,
        marginRight: 15,
    }
})

const stylesWide = StyleSheet.create({
    card: {
        borderRadius: 8,
        width: screenWidth * 0.9,
        backgroundColor: '#fff',
        padding: 20,
        display: 'flex',
        flexDirection: 'row',
        gap: 10,
        alignSelf: 'center',
        marginBottom: 15,
        ...shadow
    },
    image: {
        flex: 1,
        aspectRatio: 1,
        alignSelf: 'center',
        overflow: 'hidden',
        borderRadius: 8
    },
});
