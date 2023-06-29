import {TouchableOpacity, View} from "react-native";
import React from "react";

export function GalleryGridIcon({showColumns, setShowColumns}) {
    return <TouchableOpacity
        style={{
            position: 'absolute',
            height: 30,
            width: 30,
            bottom: -150,
            right: 25
        }}
        onPress={() => setShowColumns(!showColumns)}>
        {showColumns ?
            <View
                style={{
                    flex: 1,
                    backgroundColor: 'rgba(77, 14, 255, 0.20)',
                    borderRadius: 5
                }}
            />
            :
            <View style={{flex: 1, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between'}}>
                <View style={{
                    width: '45%',
                    height: '45%',
                    backgroundColor: 'rgba(77, 14, 255, 0.20)',
                    borderRadius: 3,
                    margin: '2.5%'
                }}/>
                <View style={{
                    width: '45%',
                    height: '45%',
                    backgroundColor: 'rgba(77, 14, 255, 0.20)',
                    borderRadius: 3,
                    margin: '2.5%'
                }}/>
                <View style={{
                    width: '45%',
                    height: '45%',
                    backgroundColor: 'rgba(77, 14, 255, 0.20)',
                    borderRadius: 3,
                    margin: '2.5%'
                }}/>
                <View style={{
                    width: '45%',
                    height: '45%',
                    backgroundColor: 'rgba(77, 14, 255, 0.20)',
                    borderRadius: 3,
                    margin: '2.5%'
                }}/>
            </View>}

    </TouchableOpacity>
}
