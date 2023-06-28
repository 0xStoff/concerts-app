import Screen from "../components/Screen";
import {FlatList, StyleSheet, Text, View} from "react-native";
import {cardData, userData} from "../utils/data";
import {WideCard} from "../components/WideCard";
import React, {useCallback} from "react";
import {ScrollHeader} from "../components/ScrollHeader";
import {BasicImage} from "../components/BasicImage";
import {BASE_SIZE} from "../utils/constants";


export function HomeScreen({}) {

    const renderItem = useCallback(({item}) => <WideCard {...item} />, []);

    return (
        <Screen>
            <View style={styles.welcomeHeader}>
                <Text style={styles.welcome}>Welcome, {userData.username}</Text>
                <BasicImage asset={userData.avatar} style={styles.avatar}/>
            </View>
            <FlatList
                data={cardData}
                // initialNumToRender={10}
                // maxToRenderPerBatch={10}
                // updateCellsBatchingPeriod={50}
                // removeClippedSubviews={true}
                // windowSize={3}
                // TODO: reactnativefastimage
                keyExtractor={(item, index) => index.toString()}
                ListHeaderComponent={ScrollHeader}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
            />
        </Screen>
    );
}


const flexBox = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15
};

const styles = StyleSheet.create({
    avatar: {
        width: 55,
        height: 55,
        borderRadius: 55
    },
    welcomeHeader: {
        ...flexBox,
        marginVertical: 10
    },
    welcome: {
        color: '#4D0EFF',
        fontFamily: 'Inter-Bold',
        fontSize: BASE_SIZE * 2.8,
        marginVertical: 30,
    }
});
