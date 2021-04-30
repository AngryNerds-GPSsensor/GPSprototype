import React, { useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import Card from "./Card";

const Weather = (props) => {
  /** we get these values and method from App.js
   * via props
   */
  const city = props.city;
  const temp = Math.round(props.temp);
  const feels = Math.round(props.feels);
  const description = props.description;
  const hum = props.hum;
  const max = Math.round(props.max);
  const min = Math.round(props.min);

  return (
    /*on the homeScreen and weather Screen there is a Card component which is the white box on the screen.
 This component has its own styling and it is getting this value from ...styles.card. 
 If we want to add more styling we are able to add more styling with  ...props.style and
 it also accepts different components inside with {props.children} like <View>,<Text> etc.. inside the Card component */

    /*The HOME SCREEN button calls weatherScreenNav method via props that sets the setWeatherScreen to false and navigate the weatherScreen to HomeScreen */

    <View style={styles.screen}>
      <Card style={styles.Card}>
        <View style={styles.city}>
          <Text style={styles.cityText}>{city}</Text>
          <Text style={styles.cityText2}>{description}</Text>
        </View>
        <View style={styles.tempScreen}>
          <Text style={styles.temp1}>{temp}°</Text>
          <Text style={styles.temp2}>
            min: {min}°, max: {max}°
          </Text>
        </View>
        <View style={styles.last}>
          <Text style={styles.last1}>Humidity Percentage: {hum}%</Text>
          <Text style={styles.last2}>Feels like: {feels}°</Text>
        </View>
      </Card>
      <View>
        <Button title="HOME SCREEN" onPress={props.screenNavigation} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    backgroundColor: "#f7c08a",
  },
  Card: {
    width: 300,
    height: 400,
    marginBottom: 25,
  },
  cityText: {
    fontWeight: "bold",
    fontSize: 22,
  },
  cityText2: {
    fontSize: 16,
  },
  city: {
    marginBottom: 110,
  },
  tempScreen: {
    alignItems: "center",
    marginBottom: 110,
  },
  temp1: {
    fontWeight: "bold",
    fontSize: 22,
    paddingBottom: 10,
  },
  temp2: {
    fontSize: 16,
  },
  last: {
    alignItems: "flex-start",
  },
  last1: {
    fontSize: 16,
    paddingBottom: 10,
  },
  last2: {
    fontSize: 16,
  },
});

export default Weather;
