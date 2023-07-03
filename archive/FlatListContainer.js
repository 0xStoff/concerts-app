// import React from 'react';
// import { StyleSheet, FlatList, TouchableOpacity } from 'react-native';
// import Screen from "../components/basics/Screen";
// import {BasicButton} from "../components/basics/BasicButton";
// import {QrTicketModal} from "../components/modals/QrTicketModal";
// import {ImageModal} from "../components/modals/ImageModal";
//
// export function FlatListContainer({
//                                       images,
//                                       listHeader,
//                                       renderItem,
//                                       pickImage,
//                                       isModalVisible,
//                                       closeModal,
//                                       imageToView,
//                                       setImageToView,
//                                       item
//                                   }) {
//     const keyExtractor = (item, index) => `${item}-${index}`;
//
//     return (
//         <Screen style={{ paddingTop: 0 }}>
//             <FlatList
//                 data={images}
//                 keyExtractor={keyExtractor}
//                 numColumns={2}
//                 ListHeaderComponent={listHeader}
//                 renderItem={renderItem}
//                 contentContainerStyle={styles.imageGridContainer}
//             />
//             <BasicButton text="+ Upload" customStyles={customButtonStyle} onPress={pickImage} />
//             <QrTicketModal
//                 ticketId={item.ticketId}
//                 isModalVisible={isModalVisible}
//                 closeModal={closeModal}
//             />
//             <ImageModal imageToView={imageToView} setImageToView={setImageToView} />
//         </Screen>
//     );
// }
//
// const styles = StyleSheet.create({
//     imageGridContainer: {
//         display: 'flex',
//         flexDirection: 'row',
//         flexWrap: 'wrap',
//         justifyContent: 'space-between',
//         padding: 10,
//         marginTop: 100,
//     },
// });
//
// const customButtonStyle = {
//     button: {
//         position: 'absolute',
//         bottom: 15,
//         backgroundColor: '#4D0EFF',
//     },
//     text: {
//         color: '#fff',
//     },
// };
