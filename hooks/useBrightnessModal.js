import {useState} from "react";
import * as Brightness from "expo-brightness";

export const useBrightnessModal = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [originalBrightness, setOriginalBrightness] = useState(null);

    const openModal = async () => {
        let {status} = await Brightness.requestPermissionsAsync();
        if (status === 'granted') {
            let brightness = await Brightness.getBrightnessAsync();
            setOriginalBrightness(brightness);
            await Brightness.setBrightnessAsync(1);
            setIsModalVisible(true);
        }
    };

    const closeModal = async () => {
        if (originalBrightness !== null) {
            await Brightness.setBrightnessAsync(originalBrightness);
        }
        setIsModalVisible(false);
    };

    return {
        isModalVisible,
        openModal,
        closeModal
    };
};
