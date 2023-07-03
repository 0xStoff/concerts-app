import React, {useCallback, useEffect} from 'react';
import {useFonts} from "expo-font";
import * as SplashScreen from 'expo-splash-screen';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {DetailsScreen} from "./screens/DetailsScreen";
import {HomeScreen} from "./screens/HomeScreen";
import Screen from "./components/basics/Screen";
import {TouchableNativeFeedback, View} from 'react-native';
import {BasicImage} from "./components/basics/BasicImage";
import {assetLocation} from "./utils/data";
import AddTicketScreen from "./screens/AddTicketScreen";

const Stack = createStackNavigator();

export default function App() {
    const [fontsLoaded] = useFonts({
        'Inter-Bold': require('./assets/Inter/static/Inter-Bold.ttf'),
        'Inter-Medium': require('./assets/Inter/static/Inter-Medium.ttf'),
        'Inter-Regular': require('./assets/Inter/static/Inter-Regular.ttf'),
        'Inter-Light': require('./assets/Inter/static/Inter-Light.ttf'),
    });


    useEffect(() => {
        // insertEvents()
    }, [])

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
                                        <BasicImage asset={`${assetLocation}/back.png`}
                                                    style={{width: 35, height: 35}}/>
                                    </View>
                                </TouchableNativeFeedback>
                            ),
                        })}
                    />
                    <Stack.Screen
                        name="AddTicket"
                        component={AddTicketScreen}
                        options={({navigation}) => ({
                            headerShown: true,
                            headerTransparent: true,
                            title: '',
                            headerLeft: (props) => (
                                <TouchableNativeFeedback
                                    onPress={() => navigation.goBack()}
                                >
                                    <View style={{marginLeft: 25, marginTop: 45}}>
                                        <BasicImage asset={`${assetLocation}/back.png`}
                                                    style={{width: 35, height: 35}}/>
                                    </View>
                                </TouchableNativeFeedback>
                            ),
                        })}/>
                </Stack.Navigator>
            </NavigationContainer>
        </Screen>
    )
}


// .
// ├── assets                  # For static files like images, fonts, etc.
// │   ├── fonts
// │   └── images
// ├── components              # Reusable components across the app.
// │   ├── basics              # Basic components like buttons, inputs, etc.
// │   └── complex             # Complex components made up of basic components.
// ├── hooks                   # Custom hooks.
// ├── navigation              # Navigation related files (stack, tab, drawer navigators).
// ├── screens                 # Screen components (one for each screen in your app).
// ├── sqlite                  # Database related files.
// ├── store                   # If using Redux or any state management, for store configuration.
// │   ├── actions
// │   ├── reducers
// │   └── middleware
// ├── utils                   # Utility functions, helpers, constants, etc.
// ├── services                # For API or other services.
// └── styles                  # Global styles or themes.
