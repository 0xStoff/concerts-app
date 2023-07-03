import React, {useEffect, useState} from 'react';
import {Animated, StyleSheet, Text, View} from 'react-native';
import {basicStyles} from "../../utils/basicStyles";


export const Snackbar = ({message, duration = 3000 || 'permanent'}) => {
    const fadeAnim = useState(new Animated.Value(0))[0];

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
        }).start();

        if (duration !== 'permanent') {
            const timerId = setTimeout(() => {
                // Fade out the view
                Animated.timing(fadeAnim, {
                    toValue: 0,
                    duration: 500,
                    useNativeDriver: true,
                }).start();
            }, duration);

            return () => clearTimeout(timerId);
        }
    }, []);

    return (
        <Animated.View
            style={[
                styles.snackbar,
                {opacity: fadeAnim},
            ]}
        >
            <Text style={styles.text}>{message}</Text>
        </Animated.View>
    );
}


const styles = StyleSheet.create({
    snackbar: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        padding: 16,
        backgroundColor: '#4D0EFF',
    },
    text: {
        ...basicStyles.title,
        color: 'white',
        fontSize: 16,
    },
});
