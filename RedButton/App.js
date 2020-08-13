import React, { Component } from "react";
import { LinearGradient } from "expo-linear-gradient";
import * as Font from "expo-font";

import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Animated,
} from "react-native";
import { Audio } from "expo-av";

let customFonts = {
  "Decalk Bold": require("./assets/fonts/decalk.bold.ttf"),
};

export default class App extends Component {
  state = {
    animation: new Animated.Value(0),
    fontsLoaded: false,
  };

  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }

  componentDidMount() {
    this._loadFontsAsync();
  }

  handleSound = async () => {
    try {
      const sound = new Audio.Sound();
      await sound.loadAsync(require("./assets/buttonclick.mp3"));
      await sound.playAsync();

      Animated.timing(this.state.animation, {
        toValue: 1,
        duration: 20,
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

    if (this.state.fontsLoaded) {
      return (
        <View style={styles.container}>
          <LinearGradient
            colors={["#b8b8b8", "#dedede", "#ffffff", "#dedede", "#b8b8b8"]}
            style={styles.background}
          >
            <TouchableWithoutFeedback
              onPressIn={this.handleSound}
              onPressOut={this.buttonUp}
            >
              <View style={styles.button}>
                <View style={styles.outer}>
                  <Animated.View style={[styles.height, heightStyle]}>
                    <Animated.View style={innerStyle}>
                      <LinearGradient
                        colors={["#a10303", "#fc3838", "#a10303"]}
                        style={styles.inner}
                      />
                    </Animated.View>
                  </Animated.View>
                </View>
              </View>
            </TouchableWithoutFeedback>
            <Text style={styles.text}>DO NOT PRESS</Text>
          </LinearGradient>
        </View>
      );
    } else {
      return <Text>Didn't Work :(</Text>;
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  background: {
    flex: 1,
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
    backgroundColor: "#b5b5b5",
  },

  height: {
    borderRadius: 75,
    backgroundColor: "#850d0d",
  },

  inner: {
    alignItems: "center",
    justifyContent: "center",
    height: 130,
    width: 130,
    borderRadius: 65.5,
  },

  text: {
    paddingTop: 20,
    fontFamily: "Decalk Bold",
    fontSize: 30,
  },
});
