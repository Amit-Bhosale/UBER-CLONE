import { View, Text,SafeAreaView, TouchableOpacity} from 'react-native'
import React from 'react'
import tw from 'tailwind-react-native-classnames'
import Map from '../components/Map'
import { createStackNavigator } from '@react-navigation/stack'
import NavigateCard from '../components/NavigateCard'
import RideOptionsCard from '../components/RideOptionsCard'
import { Icon } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'

const MapScreen = () => {
  const Stack= createStackNavigator()
  const navigation = useNavigation()

  return (
    <SafeAreaView>

      <View>
        <TouchableOpacity onPress={()=>navigation.navigate('HomeScreen')} style={tw`z-50 absolute top-9 left-5 p-3 rounded-full bg-gray-200 shadow-lg`}>
          <Icon name="home" />
        </TouchableOpacity>
      </View>

      <View style={tw`h-1/2`}>
        <Map/>
      </View>
      

      <View style={tw`h-1/2`}>
        <Stack.Navigator>
          <Stack.Screen
            name='NavigateCard'
            component={NavigateCard}
            options={{headerShown:false}}
          />
          <Stack.Screen
            name='RideOptionsCard'
            component={RideOptionsCard}
            options={{headerShown:false}}
          />
        </Stack.Navigator>
      </View>
    </SafeAreaView>
  )
}

export default MapScreen