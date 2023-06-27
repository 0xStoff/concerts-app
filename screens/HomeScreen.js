import Screen from "../components/Screen";
import {FlatList, StyleSheet} from "react-native";
import {cardData} from "../utils/data";
import {WideCard} from "../components/WideCard";
import React from "react";
import {BASE_SIZE} from "../utils/constants";
import {Header, ScrollHeader} from "../components/Headers";


export function HomeScreen({onLayoutRootView}) {
    return (
        <Screen onLayoutRootView={onLayoutRootView}>
            <Header/>
            <FlatList
                data={cardData}
                keyExtractor={(item, index) => index.toString()}
                ListHeaderComponent={ScrollHeader}
                renderItem={({item}) => <WideCard {...item} />}
                showsVerticalScrollIndicator={false}
            />
        </Screen>
    );
}
