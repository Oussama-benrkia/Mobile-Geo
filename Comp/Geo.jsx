  import React, { useState, useEffect } from 'react';
  import { StyleSheet, Text, View, Dimensions, TouchableOpacity, Modal } from 'react-native';
  import * as Location from 'expo-location';
  import { FontAwesome6 } from '@expo/vector-icons';
  import Ionicons from '@expo/vector-icons/Ionicons';
  import MaterialIcons from '@expo/vector-icons/MaterialIcons';

  const Geo = () => {
    const [sts, setSts] = useState(0); // Initialize sts with a default value
    const [positions, setPositions] = useState([]);
    const [errorMsg, setErrorMsg] = useState(null);
    const [mounted, setMounted] = useState(true);
    

    const handleButtonClick = async () => {      
      if (!mounted) {
        try {
          let { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== 'granted') {
            throw new Error('Permission to access location was denied');
          }
          startLocationUpdates();
        } catch (error) {
          setErrorMsg(error.message);
        }
      };
    
      try {
        if (sts === 0) {
          setSts(1);
          startLocationUpdates()
        } else {
          setPositions([])
          setErrorMsg(null)
          setSts(0);
          stopLocationUpdates(); 
          }
      } catch (error) {
        setErrorMsg(error.message);
        console.error("Error:", error);
      }
    };

    const handleButtonClick2 = () => {
      if (sts === 1) {
        setSts(3);
      } else {
        setSts(1);
      }
    };
    const stopLocationUpdates = async () => {
      await Location.stopLocationUpdatesAsync();
      setLocationUpdatesActive(false);
    };
    const startLocationUpdates = async () => {
      try {
        Location.watchPositionAsync(
          { accuracy: Location.Accuracy.BestForNavigation, distanceInterval: 1 },
          handleLocationUpdate
        );
      } catch (error) {
        setErrorMsg(error.message);
      }
    };

    const handleLocationUpdate = (location) => {
      if (mounted) {
        setPositions(prevPositions => [...prevPositions, location.coords]);
      }
    };
    const handleButtonClick3=()=>{
      console.log('hello')
    }
    useEffect(() => {
      return () => {
        if (mounted) {
          Location.stopLocationUpdatesAsync('geo');
          setMounted(false);
        }
      };
    }, [mounted]);

    return (
      <View style={styles.fullScreen}>
        <View style={styles.A}>
          {errorMsg ? (
            <Text style={styles.errorText}>{errorMsg}</Text>
          ) : (
            positions.length > 0 && (
              <Text style={styles.paragraph}>
                Latitude: {positions[positions.length - 1].latitude.toFixed(6)}, Longitude: {positions[positions.length - 1].longitude.toFixed(6)}
              </Text>
            )
          )}
        </View>
        <View style={styles.b}>
          <TouchableOpacity style={[styles.BU,{backgroundColor:(sts==0)?'rgb(106, 90, 205)':(sts==1)?'#28B463':'#B03A2E'}]} onPress={handleButtonClick}>
            <FontAwesome6 name="location-crosshairs" size={200} color="#E7E7E7" />
          </TouchableOpacity>
        </View>
        <View style={styles.c}>
          <TouchableOpacity style={[styles.red,styles.buttonContainer]}onPress={handleButtonClick2}>
            <Text style={[styles.buttonText]}>Probleme</Text>
            <MaterialIcons name="report-problem" size={24} color="#E7E7E7" />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.buttonContainer,styles.blue]} onPress={handleButtonClick3}>
            <Text style={styles.buttonText}>Exit</Text>
            <Ionicons name="exit" size={24} color="#E7E7E7"/>
          </TouchableOpacity>
        </View>
      </View>
    );
    
  };

  const styles = StyleSheet.create({
    red:{
      backgroundColor:'rgb(255, 100, 120)',
    },
    blue:{
      backgroundColor:'rgb(100, 120, 255)',
    },
    buttonContainer: {
      borderRadius: 10,
      padding: 10, 
      marginHorizontal: 5, 
      flexDirection: 'row', 
      alignItems: 'center', 
    },
    buttonText: {
      color: '#E7E7E7', 
      marginRight: 5, 
    },
    fullScreen: { 
      width: Dimensions.get('window').width, 
      height: Dimensions.get('window').height,
      backgroundColor: 'rgba(0, 0, 0,0.1)',
      marginTop:20

    },A:{
      height: Dimensions.get('window').height*0.1,
      alignItems: 'center',
      justifyContent: 'center',
    }
    ,b:{
      height: Dimensions.get('window').height*0.8,
      alignItems: 'center',
      justifyContent: 'center',

    },
    c:{
      height: Dimensions.get('window').height*0.1,
      alignItems: 'center',
      flexDirection: 'row', // Arrange buttons horizontally
      justifyContent: 'center', 
    },
    BU:{
      padding:50,
      width:'78%',
      height:'50%',
      alignItems: 'center',
      justifyContent: 'center',
      margin:'auto',
      borderRadius:2500
    }
    , container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20,
    },
    paragraph: {
      fontSize: 18,
      textAlign: 'center',
      marginVertical: 5,
    },
    errorText: {
      fontSize: 18,
      textAlign: 'center',
      color: 'red',
      marginVertical: 5,
    },
  });

  export default Geo;
