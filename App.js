import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import * as Location from 'expo-location'
import WeatherInfo from './components/WeatherInfo'
import UnitsPicker from './components/UnitsPicker'
import ReloadIcon from './components/ReloadIcon'
import {colors} from './utils/index'

const WEATHER_API_KEY = '336aef7035f10550aa187f316e0b9f23'
const BASE_WEATHER_URL = 'https://api.openweathermap.org/data/2.5/weather?'

export default function App() {
  const [errorMessage, setErrorMessage] = useState(null)
  const [currentWeather, setCurrentWeather] = useState(null)
  const [unitsSystem, setUnitsSystem] = useState('metric')

  useEffect(() => {
    load()
  }, [unitsSystem])
  async function load() {
    setCurrentWeather(null)
    setErrorMessage(null)
    try{
      let { status } = await Location.requestPermissionsAsync()

      if (status != 'granted') {
        setErrorMessage('Access is required to determine location!')
        return 
      }
        const location = await Location.getCurrentPositionAsync()

        const {latitude, longitude} = location.coords

        const weatherURL = `${BASE_WEATHER_URL}lat=${latitude}&lon=${longitude}&units=${unitsSystem}&appid=${WEATHER_API_KEY}`

        const response = await fetch(weatherURL)

        const result = await response.json()

        if (response.ok) {
          setCurrentWeather(result)
        } else  {
          setErrorMessage(result.message)
        }
    } catch(error){
      setErrorMessage(error.message)
    }
  }
  if(currentWeather) {
    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        <View style = {styles.container}>
          <UnitsPicker unitsSystem={unitsSystem} setUnitsSystem={setUnitsSystem}/>
          <ReloadIcon load={load} />
          <WeatherInfo currentWeather={currentWeather}/>
        </View>
      </View>
    )
  } else if (errorMessage) {
    return (
      <View style={styles.container}>
        <Text>No data received!</Text>
        <StatusBar style="auto" />
      </View>
    )
  } else {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={colors.PRIMARY_COLOR}/>
        <StatusBar style="auto" />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  main: {
    flex: 1,
    justifyContent: 'center',
  }
});
