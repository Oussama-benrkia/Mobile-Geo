import React from 'react'
import { Text,View } from 'react-native'
import { useRoute } from '@react-navigation/native'; // Import useRoute hook


const Test2 = () => {
  const route = useRoute(); // Get the route object
  const scannedData = route.params?.scannedData;

  return (
    <View>
        <Text>
            hello 2
            Scanned Data: {scannedData.data}
        </Text>
       
    </View>
  )
}

export default Test2