import {Modal, StyleSheet, View} from "react-native";
import QRCode from "react-native-qrcode-svg";
import {screenWidth} from "../../utils/constants";
import React from "react";
import {shadow} from "../../utils/basicStyles";
import {BasicButton} from "../basics/BasicButton";

export function QrTicketModal({ticketId, isModalVisible, closeModal}) {

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={isModalVisible}
            onRequestClose={closeModal}>
            <View style={styles.centeredView}>
                <View style={styles.overlay}/>
                <View style={styles.modalView}>
                    <QRCode
                        value={ticketId}
                        size={screenWidth * 0.9}
                    />
                    <BasicButton title='Hide' onPress={closeModal}/>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    modalView: {
        backgroundColor: "#fff",
        borderRadius: 8,
        padding: 15,
        alignItems: "center",
        ...shadow,
        shadowOffset: {height: 5, width: 5}
    },
    overlay: {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        backgroundColor: '#000',
        opacity: 0.95,
    },
});
