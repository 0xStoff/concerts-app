import {StyleSheet, TouchableOpacity} from "react-native";
import React from "react";
import {screenWidth} from "../utils/constants";
import {useNavigation} from "@react-navigation/native";
import {EventDetails} from "./EventDetails";
import {BasicImage} from "./BasicImage";
import {shadow} from "../utils/basicStyles";

function WideCardComponent(item) {
    const navigation = useNavigation();
    return (
        <TouchableOpacity
            onPress={() => navigation.navigate('Details', item.id)}
            style={styles.card}
        >
            <EventDetails
                customStyles={eventDetailsStyle}
                includeTime={false}
                {...item} />
            <BasicImage style={styles.image} asset={item.asset}/>
        </TouchableOpacity>
    )
}

const eventDetailsStyle = {
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

const styles = StyleSheet.create({
    card: {
        width: screenWidth * 0.9,
        borderRadius: 8,
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

export const WideCard = React.memo(WideCardComponent);
