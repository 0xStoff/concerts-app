import React, {useCallback, useEffect} from 'react';
import {useFonts} from "expo-font";
import * as SplashScreen from 'expo-splash-screen';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {DetailsScreen} from "./screens/DetailsScreen";
import {HomeScreen} from "./screens/HomeScreen";
import Screen from "./components/Screen";
import {TouchableNativeFeedback, View} from 'react-native';
import {BasicImage} from "./components/BasicImage";
import {assetLocation} from "./utils/data";

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
        <Screen onLayoutRootView={onLayoutRootView}>
            <NavigationContainer>
                <Stack.Navigator screenOptions={{headerShown: false}}>
                    <Stack.Screen name="Home" component={HomeScreen}/>
                    <Stack.Screen
                        name="Details"
                        component={DetailsScreen}
                        options={({navigation}) => ({
                            headerShown: true,
                            headerTransparent: true,
                            title: '',
                            headerLeft: (props) => (
                                <TouchableNativeFeedback
                                    onPress={() => navigation.goBack()}
                                >
                                    <View style={{marginLeft: 25, marginTop: 45}}>
                                        <BasicImage asset={`${assetLocation}/back.png`} style={{width: 35, height: 35}}/>
                                    </View>
                                </TouchableNativeFeedback>
                            ),
                        })}
                    />
                </Stack.Navigator>
            </NavigationContainer>
         </Screen>
    )
}
