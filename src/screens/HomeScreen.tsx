// src/screens/HomeScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ManageCropsScreenNavigationProp, RobotScreenNavigationProp,ManagePestScreenNavigationProp } from '../types/navigation';

const backgroundImage = require('../assets/images/robot_background.png'); // Set your new image path here

const HomeScreen: React.FC = () => {
  const crop_navigation = useNavigation<ManageCropsScreenNavigationProp>();
  const robot_navigation=useNavigation<RobotScreenNavigationProp>();
  const pest_navigation=useNavigation<ManagePestScreenNavigationProp>()

  return (
    <ImageBackground source={backgroundImage} style={styles.container}>
    <View style={styles.container}>
      <View style={styles.row}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => crop_navigation.navigate('ManageCrops')}
        >
          <Text style={styles.buttonText}>Manage Crops</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.button}
          onPress={() => pest_navigation.navigate('ManagePests')}
        >
          <Text style={styles.buttonText}>Pest Status</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Community</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}
          onPress={() => robot_navigation.navigate('RobotController')}>Robot Control</Text>
        </TouchableOpacity>
      </View>
    </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  button: {
    width: 150, // 정사각형 모양
    height: 150,
    borderRadius: 20, // 모서리 둥글게
    backgroundColor: '#E8F5E9', // 원하는 색상으로 변경
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    elevation: 5, // 그림자 효과 (Android)
    shadowColor: '#000', // 그림자 색상 (iOS)
    shadowOffset: { width: 0, height: 5 }, // 그림자 오프셋 (iOS)
    shadowOpacity: 0.2, // 그림자 불투명도 (iOS)
    shadowRadius: 5, // 그림자 반경 (iOS)
  },
  buttonText: {
    color: "#1B5E20",
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default HomeScreen;
