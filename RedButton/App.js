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
    count: 0,
    text: "Do not press",
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

  changeText = () => {
    switch (this.state.count) {
      case 0:
        this.setState({
          text: "No seriously",
        });
        break;

      case 1:
        this.setState({
          text: "Stop it",
        });
        break;

      case 2:
        this.setState({
          text: "Are you blind",
        });
        break;

      case 3:
        this.setState({
          text: "Grrr...",
        });
        break;

      case 4:
        this.setState({
          text: "Do not press the red button",
        });
        break;

      case 5:
        this.setState({
          text: "Can you even read?",
        });
        break;

      case 6:
        this.setState({
          text: "Do you want to explode?",
        });
        break;

      case 7:
        this.setState({
          text: "I can make you explode",
        });
        break;

      case 8:
        this.setState({
          text: "I'll do it",
        });
        break;

      case 9:
        this.setState({
          text: "Ok fine",
        });
        break;

      case 10:
        this.setState({
          text: "Keep pressing the button",
        });
        break;

      case 11:
        this.setState({
          text: "I don't care anymore",
        });
        break;

      case 12:
        this.setState({
          text: "I'm completely fine",
        });
        break;

      case 13:
        this.setState({
          text: "Not annoyed at all",
        });
        break;

      case 14:
        this.setState({
          text: "Ok that's it",
        });
        break;
    }
  };

  increment = () => {
    this.setState({
      count: this.state.count + 1,
    });
    this.changeText();
  };

  reset = () => {
    this.setState({
      count: 0,
    });
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
              onPress={this.increment}
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
            <Text style={styles.text}>{this.state.text}</Text>
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
    paddingTop: 40,
    fontFamily: "Decalk Bold",
    fontSize: 22,
    textAlign: "center",
  },
});
