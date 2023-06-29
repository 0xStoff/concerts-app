import {Modal, Pressable, StyleSheet, View} from "react-native";
import {BasicImage} from "./BasicImage";
import React from "react";
import {shadow} from "../utils/basicStyles";
import {screenHeight, screenWidth} from "../utils/constants";

export function ImageModal({imageToView, setImageToView}) {
    return (
        <Modal
            animationType="slide"
            transparent={false}
            visible={!!imageToView}
            onRequestClose={() => setImageToView(null)}
            onPress={() => alert('he')}
        >
            <View style={styles.modalContainer}>
                <Pressable onPress={() => setImageToView(null)}>
                    <BasicImage
                        asset={imageToView}
                        style={styles.fullScreenImage}
                    />
                </Pressable>
            </View>
        </Modal>
    )
}


const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black'
    },
    fullScreenImage: {
        height: screenHeight,
        width: screenWidth,
        contentFit: 'contain',
    }
});
