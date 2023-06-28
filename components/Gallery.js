import React from "react";
import {
    Modal,
    StyleSheet,
    TouchableOpacity,
    View,
    Pressable, FlatList
} from "react-native";
import {BasicImage} from "./BasicImage";
import {screenHeight, screenWidth} from "../utils/constants";

{/*{images.map(image => (*/}
{/*    <TouchableOpacity style={styles.imageGridItem} key={image} onPress={() => setImageToView(image)}>*/}
{/*        <BasicImage style={{flex: 1, borderRadius: 3}} asset={image}/>*/}
{/*    </TouchableOpacity>*/}
{/*))}*/}


export function Gallery() {
    const [imageToView, setImageToView] = React.useState(null);
    const images = ['conc1.jpg', 'conc2.jpeg', 'conc3.jpeg', 'conc4.jpeg', 'rosa.jpeg', 'coldplay5.jpg', 'taylor.jpeg', 'me.png'];

    return (
        <View style={styles.imageGridContainer}>
            <FlatList
                data={images}
                keyExtractor={(item, index) => index.toString()}
                // showsVerticalScrollIndicator={false}
                // ListHeaderComponent={Header}
                horizontal={false}
                numColumns={2}
                renderItem={({item}) =>
                    <TouchableOpacity
                        style={styles.imageGridItem}
                        key={item}
                        onPress={() => setImageToView(item)}
                    >
                        <BasicImage style={{flex: 1, borderRadius: 3}} asset={item}/>
                    </TouchableOpacity>
                }
            />

            <Modal
                animationType="slide"
                transparent={false}
                visible={!!imageToView}
                onRequestClose={() => setImageToView(null)} onPress={() => alert('he')}
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
        </View>
    );
}

const styles = StyleSheet.create({
    imageGridContainer: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        padding: 10,
        marginTop: 100
    },
    imageGridItem: {
        aspectRatio: 1,
        width: '50%',
        padding: 2,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black'
    },
    fullScreenImage: {
        height: screenHeight,
        width: screenWidth,
        // resizeMode: 'contain',
    }
});
