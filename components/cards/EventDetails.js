import {StyleSheet, Text, TextInput, View, Platform, Button} from "react-native";
import {basicStyles} from "../../utils/basicStyles";
import {toLocaleString} from "../../utils/utils";
import {Badge} from "./Badge";
import React, {useState} from "react";
import DateTimePicker from '@react-native-community/datetimepicker';
import {BasicButton} from "../basics/BasicButton";
import {BASE_SIZE} from "../../utils/constants";

export function EventDetails({city, location, time, title, customStyles, includeTime = true, children}) {
    return (
        <View style={[styles.textContainer, customStyles.container]}>
            <View style={styles.captionContainer}>
                <Text style={basicStyles.caption}>{toLocaleString(time, includeTime)}</Text>
                <Badge time={time}/>
            </View>
            <Text style={[basicStyles.title, customStyles.title]}>{title}</Text>
            <Text style={[basicStyles.subTitle, customStyles.location]}>{location}</Text>
            <Text style={[basicStyles.caption, customStyles.city]}>{city}</Text>
            {children}
        </View>
    )
}

export function EventDetailsInputs({customStyles, setItem, children}) {
    const [date, setDate] = useState(new Date());
    const [showDate, setShowDate] = useState(false);
    const [showTime, setShowTime] = useState(false);
    const [title, onChangeTitle] = useState('');
    const [location, onChangeLocation] = useState('');
    const [city, onChangeCity] = useState('');



    const onChange = (event, selectedDate) => {
        console.log('change')
        const currentDate = selectedDate || date;
        setShowDate(!showDate);
        setDate(currentDate);
    };

    const onChangeDate = (event, selectedDate) => {
        console.log('change')
        const currentDate = selectedDate || date;
        setShowDate(!showDate);
        setDate(currentDate);
    };


    const onChangeTime = (event, selectedDate) => {
        console.log('change')
        const currentDate = selectedDate || date;
        setShowTime(!showTime);
        setDate(currentDate);
    };

    const showDatePicker = () => {
        setShowDate(true);
    };

    const showTimePicker = () => {
        setShowTime(true);
    };


    const formattedDate = date.toLocaleDateString(undefined, {day: 'numeric', month: 'long', year: 'numeric'});
    const formattedTime = date.toLocaleTimeString(undefined, {hour: '2-digit', minute: '2-digit'});

    return (
        <View style={[styles.textContainer, customStyles.container]}>
            {(Platform.OS === 'ios') && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode="datetime"
                    is24Hour={true}
                    display="compact"
                    onChange={onChange}
                    style={{alignSelf: 'flex-start', padding: 5}}
                />
            )}
            {Platform.OS === 'android' &&
                <View style={{display: 'flex', flexDirection: 'row', gap: 10}}>
                    <BasicButton title={formattedDate} onPress={showDatePicker} customStyles={buttonStyles}/>
                    <BasicButton title={formattedTime} onPress={showTimePicker} customStyles={buttonStyles}/>
                </View>
            }

            {(Platform.OS === 'android' && showDate && !showTime) && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode="date"
                    is24Hour={true}
                    display="default"
                    onChange={onChangeDate}

                />
            )}

            {(Platform.OS === 'android' && showTime && !showDate) && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode="time"
                    is24Hour={true}
                    display="default"
                    onChange={onChangeTime}
                />
            )}

            <TextInput
                // onChangeText={(text) => setItem(prevItem => ({...prevItem, title: text}))}
                multiline
                onChangeText={text=> {
                    onChangeTitle(text)
                    setItem((prevItem)=>({...prevItem, title: text}))
                }}
                value={title}
                placeholder='choose a title'
                style={[basicStyles.title, customStyles.title]}
            />
            <TextInput
                onChangeText={onChangeLocation}
                value={location}
                placeholder='choose the location'
                style={[basicStyles.subTitle, customStyles.location]}
            />
            <TextInput
                onChangeText={onChangeCity}
                value={city}
                placeholder='choose city and country'
                style={[basicStyles.caption, customStyles.city]}
            />
            {children}
        </View>
    )
}


const buttonStyles = {
    button: {
        marginTop: 0,
        paddingVertical: 10,
        paddingHorizontal: 25,
        // borderRadius: 14,
        alignSelf: 'center',
        backgroundColor: 'rgba(135, 135, 135, 0.20)',
    },
    text: {
        color: '#000',
        // textAlign: 'center',
        fontSize: BASE_SIZE * 1,
        fontFamily: 'Inter-Bold',
    },
}

EventDetails.defaultProps = {
    customStyles: {
        container: {},
        title: {},
        location: {},
        city: {}
    },
    includeTime: true,
};

const styles = StyleSheet.create({
    textContainer: {
        justifyContent: 'center',
        backgroundColor: '#fff',
        borderRadius: 8,
    },
    captionContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
});
