import { StyleSheet, SafeAreaView, View } from "react-native";
import React from "react";
import Constants from "expo-constants";

export default function Screen({ children, style, onLayoutRootView }) {
    return (
        <SafeAreaView style={[styles.screen, style]}>
            <View  onLayout={onLayoutRootView} style={[styles.view, style]}>{children}</View>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    screen: {
        flex: 1,
        paddingTop: Constants.statusBarHeight,
        backgroundColor: '#F9F9F9',
    },
    view: {
        flex: 1,
    },
});
