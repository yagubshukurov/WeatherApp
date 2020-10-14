import React from 'react' 
import { View, Text, StyleSheet } from 'react-native'
import { colors } from '../utils/index'

const {PRIMARY_COLOR, SECONDARY_COLOR, BORDER_COLOR} = colors

export default function WeatherDetails({ currentWeather }) {

    const {
        main: { feels_like, humidity }
    } = currentWeather
    return (
        <View style= {styles.weatherDeatils}>
            <View style = {styles.weatherDeatilsRow}>
                <View style = {{... styles.weatherDeatilsBox, borderRightWidth: 1, borderRightColor: BORDER_COLOR}}>
                    <Text>{feels_like}</Text>
                </View>
                <View style = {styles.weatherDeatilsBox}>
                    <Text>{humidity}</Text>
                </View>
            </View>
        </View>
    ) 
}

const styles = StyleSheet.create({
    weatherDeatils: {
        marginTop: 'auto',
        margin: 10,
        borderWidth: 1,
        borderColor: BORDER_COLOR,
        borderRadius: 10
    }, 
    weatherDeatilsRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    }, 
    weatherDeatilsBox: {
        flex: 1,
        padding: 20
    }
})