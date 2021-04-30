import React from "react";
import { View, StyleSheet } from "react-native";

/*on the homeScreen and weather Screen there is a Card component which is the white box on the screen.
 This component has its own styling and it is getting this value from ...styles.card. 
 If we want to add more styling we are able to add more styling with  ...props.style and
 it also accepts different components inside with {props.children} like <View>,<Text> etc.. inside the Card component */
const Card = (props) => {
  return (
    <View style={{ ...styles.card, ...props.style }}>{props.children}</View>
  );
};

const styles = StyleSheet.create({
  card: {
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.26,
    elevation: 8,
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
  },
});

export default Card;
