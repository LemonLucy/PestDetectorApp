import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import axios from 'axios';

const backgroundImage = require('../assets/images/robot_background.png'); // Set your new image path here

const API_BASE_URL = "http://192.168.1.62:5000";

const RobotControl = () => {
  const sendCommand = (command: 'forward' | 'stop' | 'backward' | 'spray') => {
    axios.post(`${API_BASE_URL}/robot/control`, { command })
      .then(response => {
        console.log('Command sent successfully:', response.data);
      })
      .catch(error => {
        console.error('Error sending command:', error);
      });
  };

  return (
    <ImageBackground source={backgroundImage} style={styles.container}>
      {/* Button Group in Lower Third */}
      <View style={styles.lowerThird}>
        <View style={styles.buttonRow}>
          {/* Circular Up Button */}
          <TouchableOpacity style={styles.circularGreenButton} onPress={() => sendCommand('forward')}>
            <Text style={styles.buttonText}>↑</Text>
          </TouchableOpacity>

          {/* STOP Button */}
          <TouchableOpacity style={styles.redButton} onPress={() => sendCommand('stop')}>
            <Text style={styles.buttonText}>STOP</Text>
          </TouchableOpacity>

          {/* Circular Down Button */}
          <TouchableOpacity style={styles.circularGreenButton} onPress={() => sendCommand('backward')}>
            <Text style={styles.buttonText}>↓</Text>
          </TouchableOpacity>
        </View>

        {/* Spray Pesticide Button */}
        <TouchableOpacity style={styles.sprayButton} onPress={() => sendCommand('spray')}>
          <Text style={styles.buttonText}>Spray Pesticide</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  header: {
    fontSize: 24,
    color: '#2c6e49', // Dark green for title text
    textAlign: 'center',
    marginTop: 40,
    marginBottom: 20,
  },
  lowerThird: {
    position: 'absolute',
    bottom: 50,
    width: '100%',
    alignItems: 'center',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
    marginBottom: 20,
  },
  circularGreenButton: {
    backgroundColor: '#6dbb63',
    width: 60, // Set width and height equally for a circular shape
    height: 60,
    borderRadius: 30, // Half of width/height for a perfect circle
    justifyContent: 'center',
    alignItems: 'center',
  },
  redButton: {
    backgroundColor: 'red',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  sprayButton: {
    backgroundColor: '#4f9d69', // Green shade for spray button
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default RobotControl;
