import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import CropInfo from '../components/CropInfo/CropInfo';
import PestInfo from '../components/CropInfo/PestInfo';
import DiseaseInfo from '../components/CropInfo/DiseaseInfo';
import HealthStatus from '../components/CropInfo/HealthStatus';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ManageCrops: React.FC = () => {
  const [cropData, setCropData] = useState<any | null>(null);
  const [selectedCrop, setSelectedCrop] = useState<any | null>(null);
  const API_BASE_URL = 'http://192.168.1.62:5000';

  useEffect(() => {
    const loadCropData = async () => {
      try {
        const storedData = await AsyncStorage.getItem('cropData');
        if (storedData) {
          setCropData(JSON.parse(storedData));
          console.log('로컬 스토리지에서 가져온 데이터:', JSON.parse(storedData));
          return;
        }

        const response = await fetch(`${API_BASE_URL}/fetch/crop-data`);
        if (!response.ok) {
          throw new Error('Failed to fetch crop data from server');
        }

        const jsonData = await response.json();
        setCropData(jsonData);

        await AsyncStorage.setItem('cropData', JSON.stringify(jsonData));
        console.log('서버에서 가져온 데이터:', jsonData);
      } catch (error) {
        console.error('로컬 스토리지에서 데이터를 가져오는 중 오류 발생:', error);
      }
    };

    loadCropData();
  }, []);

  if (!cropData) {
    return (
      <View style={styles.bgcontainer}>
        <View style={styles.container}>
          <Text style={styles.title}>Loading...</Text>
        </View>
      </View>
    );
  }

  if (selectedCrop) {
    return (
      <View style={styles.bgcontainer}>
        <View style={styles.container}>
          <Text style={styles.title}>{selectedCrop.crop_information?.name} Information</Text>
          <CropInfo crop={selectedCrop.crop_information} />
          <PestInfo pest={selectedCrop.pest_information} />
          <DiseaseInfo disease={selectedCrop.disease_information} />
          <HealthStatus health={selectedCrop.crop_health_information} />
          <TouchableOpacity style={styles.backButton} onPress={() => setSelectedCrop(null)}>
            <Text style={styles.buttonText}>Back</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.bgcontainer}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Current Managing Crops</Text>
        {cropData.map((crop: any, index: number) => {
          const isHealthy =
            crop.crop_health_information?.overall_health === 'Good' &&
            crop.pest_information?.pest_name === 'None' &&
            crop.disease_information?.severity === 'None';

          return (
            <TouchableOpacity
              key={index}
              style={[styles.cropButton, { backgroundColor: isHealthy ? '#4CAF50' : '#FF0000' }]} // Green for healthy, red otherwise
              onPress={() => setSelectedCrop(crop)}
            >
              <Text style={styles.buttonText}>
                {crop.crop_information?.name || 'Unnamed Crop'}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  bgcontainer: {
    flex: 1,
    backgroundColor: '#2E7D32', // Background with dark green
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flexGrow: 1,
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#FFFFFF',
  },
  cropButton: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: 200,
    height: 60,
    borderColor: '#000',
    borderWidth: 1,
  },
  backButton: {
    backgroundColor: 'red',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default ManageCrops;
