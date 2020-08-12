import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Animated,
} from "react-native";
import { Audio } from "expo-av";

export default class App extends Component {
  state = {
    animation: new Animated.Value(0),
  };

  handleSound = async () => {
    try {
      const sound = new Audio.Sound();
      await sound.loadAsync(require("./assets/buttonclick.mp3"));
      await sound.playAsync();

      Animated.timing(this.state.animation, {
        toValue: 1,
        duration: 100,
        useNativeDriver: false,
      }).start();
    } catch (e) {}
  };

  buttonUp = () => {
    Animated.timing(this.state.animation, {
      toValue: 0,
      duration: 20,
      useNativeDriver: false,
    }).start();
  };

  render() {
    const innerStyle = {
      borderRadius: this.state.animation.interpolate({
        inputRange: [0, 1],
        outputRange: [120, 75],
      }),
    };

    const heightStyle = {
      marginTop: this.state.animation.interpolate({
        inputRange: [0, 1],
        outputRange: [-15, 0],
      }),
      paddingBottom: this.state.animation.interpolate({
        inputRange: [0, 1],
        outputRange: [15, 0],
      }),
    };

    return (
      <View style={styles.container}>
        <TouchableWithoutFeedback
          onPressIn={this.handleSound}
          onPressOut={this.buttonUp}
        >
          <View style={styles.button}>
            <View style={styles.outer}>
              <Animated.View style={[styles.height, heightStyle]}>
                <Animated.View
                  style={[styles.inner, innerStyle]}
                ></Animated.View>
              </Animated.View>
            </View>
          </View>
        </TouchableWithoutFeedback>
        <Text style={styles.text}>DO NOT PRESS</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  button: {
    height: 150,
    width: 150,
  },

  outer: {
    flex: 1,
    padding: 10,
    borderRadius: 75,
    backgroundColor: "#9e9d9d",
  },

  height: {
    borderRadius: 75,
    backgroundColor: "#cc2b2b",
  },

  inner: {
    backgroundColor: "#fc3838",
    alignItems: "center",
    justifyContent: "center",
    height: 130,
  },

  text: {
    paddingTop: 20,
  },
});
