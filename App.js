import React, { useEffect, useState } from "react";
import { Button, ColorPropType, StyleSheet, Text, View } from "react-native";
import * as Location from "expo-location";
import WEATHER from "./Component/Weather";
import Card from "./Component/Card";

const apiKey = "f83409d625816b954bbe4e5d7b5cbe85";
const URL = "https://api.openweathermap.org/data/2.5/weather?";

export default function App() {
  const [errorMsg, setErrorMsg] = useState(null);
  const [result, setResult] = useState(null);
  const [weatherScreen, setWeatherScreen] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        /*asking first the location permission to user 
       if the permission is denied then set the error Message to Permission to access location was denied
       print on this message on the screen and stop executing the rest of the code 
      */
        let { status } = await Location.requestPermissionsAsync();
        if (status !== "granted") {
          setErrorMsg("Permission to access location was denied");
          return;
        }

        /* 
      if the user gives permission to use location service then 
      we have getCurrentPositionAsync to get the latitude and longitude from user 
      */
        let location = await Location.getCurrentPositionAsync({});
        let { latitude, longitude } = location.coords;

        //with latitude and longitude information we make an API call to openweathermap api*/
        const weatherURL = `${URL}lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
        const response = await fetch(weatherURL);
        const result = await response.json();
        // console.log(weatherURL)

        /* if the api call responds correctly then we set the result variable to api json format */
        if (response.ok) {
          setResult(result);
        }
        //if there are any problems while api call then we set error message and print on the user screen
        else {
          setErrorMsg(result.message);
        }
      } catch (err) {
        // if any errors occur then we set an error message for user
        setErrorMsg(err.message);
      }
    })();
  }, []);

  const screenNavigation = () => {
    setWeatherScreen(true);
  };

  const weatherScreenNav = () => {
    setWeatherScreen(false);
  };

  /* The variable 'text' holds a value that is printed to the user while getting 
  information on location service and api
  */
  let text = "Waiting..";
  /* the error message is null at first which is a falsy value 
  if errors occur, for example: user deny location permission or any problem from 
  api call then the code above set an error message and when the error message set then the value of 
  errorMsg is a string value which is true value based on JS value conversion then the app executes the error message since it is true
  */
  if (errorMsg) {
    text = errorMsg;
  } else if (result) {
  /** when we get a response from weather api then the
   * result value is set which is a true value following same logic as the errorMsg then the app
   * executes this part down below
   */
    /*There are two screens: HomeScreen and Weather Screen. We navigate them by clicking on a button on both Screens.
    The weather screen is set to false at first so first screen to be shown is the homeScreen*/

    /*the WEATHER button when clicked calls the screenNavigation method 
    which sets the weatherScreen to true and navigate the screen to weather screen*/

    /*on the homeScreen and weather Screen there is a Card component which is the white box on the screen this component has 
    its own styling its getting this value from ...styles.card and if we want to add more styling we are able to add more styling with  ...props.style 
    and also it accept different component inside with {props.children} with this we can use different component like <View>,<Text> etc.. inside Card component */
    if (!weatherScreen) {
      text = (
        <View style={styles.homeScreen}>
          <Card style={styles.Card}>
            <Text style={styles.bigText}> {result.name} </Text>
            <View>
              <Text style={styles.smallText}>
                Latitude: {result.coord.lat}{" "}
              </Text>
              <Text style={styles.smallText}>
                Longitude: {result.coord.lon}{" "}
              </Text>
            </View>
          </Card>
          <View style={styles.button}>
            <Button title="WEATHER" onPress={screenNavigation} />
          </View>
        </View>
      );
    } else {
    /* when the weather button on the HomeScreen is clicked, the weather screen is displayed.
  On the weather screen we pass several values and weatherScreenNav method with props from App.js  
  */
      text = (
        <WEATHER
          city={result.name}
          temp={result.main.temp}
          feels={result.main.feels_like}
          description={result.weather[0].description}
          hum={result.main.humidity}
          min={result.main.temp_min}
          max={result.main.temp_max}
          screenNavigation={weatherScreenNav}
        />
      );
    }
  }

  return (
    <View style={styles.screen}>
      <Text>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: "#f7c08a",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  Card: {
    width: 300,
    height: 250,
    alignItems: "center",
    marginBottom: 25,
  },
  bigText: {
    fontSize: 25,
    marginBottom: "20%",
    fontWeight: "bold",
  },
  smallText: {
    fontWeight: "bold",
    paddingBottom: 10,
  },
});
