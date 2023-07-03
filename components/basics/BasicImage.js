import {Image} from "expo-image";
import React from "react";
import {blurhash} from "../../utils/constants";
import {Platform} from "react-native";


export function BasicImage({asset, style}) {
    if (!asset) return null;
    return (
        <Image
            source={{uri: asset}}
            cachePolicy='memory-disk'
            recyclingKey={asset.toString()}
            placeholder={{
                blurhash: Platform.OS === 'ios' && blurhash,
                cacheKey: asset.toString()
            }}
            {...style}
        />
    )
}
