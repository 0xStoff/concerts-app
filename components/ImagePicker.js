import React, {useState, useEffect} from 'react';
import {Button, Image, View, Platform, TouchableOpacity, StyleSheet} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import {BasicImage} from "./BasicImage";
import {shadow} from "../utils/basicStyles";
import {blurhash, screenHeight} from "../utils/constants";
import {assetLocation} from "../utils/data";
import * as SQLite from "expo-sqlite";


export const useImagePicker = (item) => {
    const [images, setImages] = useState(item.memories);
    const db = SQLite.openDatabase('concerts_db');

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsMultipleSelection: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            const imageURIs = result.assets.map(asset => ({uri: asset.uri}));


            setImages(prevImages => [...prevImages, ...imageURIs]);

            db.transaction(tx => {
                tx.executeSql(
                    'UPDATE past_events SET memories = ? WHERE id = ?',
                    [JSON.stringify([...images, ...imageURIs]), item.id],
                    (_, result) => console.log('Memories updated for event:', item.id),
                    (_, error) => console.log('Error updating memories:', error)
                );
            });

        }
    };

    return {images, pickImage};
}
