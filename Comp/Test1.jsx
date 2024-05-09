import React from 'react';
import { Text, View, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook

const Test1 = () => {
  const navigation = useNavigation(); // Initialize navigation

  return (
    <View>
      <Text>
        hello 1
      </Text>
      <Button
        title="Go to Test2" // Button title
        onPress={() => navigation.navigate('Test2')} // Navigate to Test2 onPress
      />
    </View>
  );
};

export default Test1;
