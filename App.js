import React, {useCallback} from 'react';
import {FlatList, StyleSheet, Text, View} from "react-native";
import {Image} from "expo-image";
import {useFonts} from "expo-font";
import * as SplashScreen from 'expo-splash-screen';
import {Card} from "./components/Card";
import {BASE_SIZE, blurhash} from "./utils/constants";
import {assetLocation, cardData, userData} from "./utils/data";
import {AddTicket} from "./components/AddTicket";

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {DetailsScreen} from "./screens/DetailsScreen";
import {HomeScreen} from "./screens/HomeScreen";


const Stack = createStackNavigator();

export default function App() {
    const [fontsLoaded] = useFonts({
        'Inter-Bold': require('./assets/Inter/static/Inter-Bold.ttf'),
        'Inter-Medium': require('./assets/Inter/static/Inter-Medium.ttf'),
        'Inter-Regular': require('./assets/Inter/static/Inter-Regular.ttf'),
        'Inter-Light': require('./assets/Inter/static/Inter-Light.ttf'),
    });

    const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded) {
            await SplashScreen.hideAsync();
        }
    }, [fontsLoaded]);

    if (!fontsLoaded) {
        return null;
    }

    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Home" component={HomeScreen}/>
                <Stack.Screen name="Details" component={DetailsScreen}/>
            </Stack.Navigator>
        </NavigationContainer>

    )
}

