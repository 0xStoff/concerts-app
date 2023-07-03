import {TouchableOpacity, View, StyleSheet} from "react-native";
import React from "react";

export function GalleryGridIcon({showColumns, setShowColumns}) {
    return (
        <TouchableOpacity
            style={styles.touchable}
            onPress={() => setShowColumns(!showColumns)}
        >
            {showColumns ?
                <View style={styles.square}/> :
                <View style={styles.grid}>
                    <View style={styles.gridItem}/>
                    <View style={styles.gridItem}/>
                    <View style={styles.gridItem}/>
                    <View style={styles.gridItem}/>
                </View>
            }
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    touchable: {
        position: 'absolute',
        height: 25,
        width: 25,
        bottom: -150,
        right: 25
    },
    square: {
        flex: 1,
        backgroundColor: '#4D0EFF',
        borderRadius: 5
    },
    grid: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between'
    },
    gridItem: {
        width: '45%',
        height: '45%',
        backgroundColor: '#4D0EFF',
        borderRadius: 3,
        margin: '2.5%'
    }
});
