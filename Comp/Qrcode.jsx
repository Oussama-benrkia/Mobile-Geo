import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity, BackHandler } from 'react-native';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { Camera, FlashMode} from "expo-camera";
import { useNavigation } from '@react-navigation/native';
import { Alert } from 'react-native';

export default function Qrcode() {
    const navigation = useNavigation();
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [flashEnabled, setFlashEnabled] = useState(false);
    const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
; // State to manage flashlight

    useEffect(() => {
      const getCameraPermissions = async () => {
        const { status } = await Camera.requestCameraPermissionsAsync();
        setHasPermission(status === "granted");
      };
  
      getCameraPermissions();
    }, []);
  

    const handleBarCodeScanned = ({ type, data }) => {
      setScanned(true);
      Alert.alert(
        `Bar code with type ${type} and data ${data} has been scanned!`,
        'Do you want to navigate to Test2?',
        [
          {
            text: 'Cancel',
            onPress: () => {
              setScanned(false);
            },
            style: 'cancel',
          },
          {
            text: 'OK',
            onPress: () => {
              // Navigate to Test2 and pass data
              navigation.navigate('Geo', { scannedData: data });
            },
          },
        ],
        { cancelable: false }
      );
    };
    
    const toggleFlash = () => {
      setFlashEnabled(!flashEnabled);
    };

    const toggleCameraType = () => {
      setCameraType(
        cameraType === Camera.Constants.Type.back
          ? Camera.Constants.Type.front
          : Camera.Constants.Type.back
      );
    };

    if (hasPermission === null) {
      return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
      return <Text>No access to camera</Text>;
    }
    
    return (
      <View style={styles.fullScreen}>
        <Camera
       style={styles.fullScreen}
       type={cameraType}
       flashMode={flashEnabled ? Camera.Constants.FlashMode.torch : Camera.Constants.FlashMode.off}
       onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        />
        <View style={styles.viewtext}>
          <Text style={styles.text}>
            Scannez le code QR pour les voitures
          </Text>
        </View>
        <View style={styles.btn_sw}>
          <TouchableOpacity style={styles.btn} onPress={toggleCameraType}>
            <Ionicons name="camera-reverse" size={30} color="white" />
          </TouchableOpacity>
        </View> 
        <View style={styles.btn_fl}>
          <TouchableOpacity style={styles.btn} onPress={toggleFlash}>
            <Ionicons name="flashlight" size={30} color="white" />
          </TouchableOpacity>
        </View>
        <View style={styles.btn_cl}>
          <TouchableOpacity style={styles.btn} onPress={() => BackHandler.exitApp()}>
            <FontAwesome style={styles.icon} name="close" size={30} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    );
};

const styles = StyleSheet.create({
  fullScreen: { 
    width: Dimensions.get('window').width, 
    height: Dimensions.get('window').height,
  }, 
  viewtext: {
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0,0.5)',
    borderRadius: 20,
    top: 20,
    alignSelf: 'center',
    marginTop: 40,
  },
  text: {
    color: 'white',
    paddingHorizontal: 25,
    paddingVertical: 15,
    fontSize: 15,
    fontWeight: 'bold',
  },
  btn_sw: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: 50,
    left: 40,
  },
  btn_fl: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: 50,
  },
  btn_cl: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: 50,
    right: 40,
  },
  btn: {
    width: 60,
    height: 60,
    borderRadius: 50,
    paddingBottom: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
