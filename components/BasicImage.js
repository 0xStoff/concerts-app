import {Image} from "expo-image";
import {assetLocation} from "../utils/data";
import {blurhash} from "../utils/constants";
import React from "react";
import {Platform} from "react-native";


export function BasicImage({asset, style}) {
    return (
        <Image
            source={{uri: `${assetLocation}/${asset}`}}
            // transition={100}
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
