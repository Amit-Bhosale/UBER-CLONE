import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, KeyboardAvoidingView } from 'react-native';
import { Provider } from 'react-redux'
import HomeScreen from './screens/HomeScreen';
import { store } from './store';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MapScreen from './screens/MapScreen';
import { Platform } from 'react-native';

// Step1: setup redux
// Used google distance, google places, google direction, google distance matrix api
export default function App() {
  const Stack= createNativeStackNavigator();

  return (
    <Provider store={store}>
      <NavigationContainer>
      <SafeAreaProvider>
        <KeyboardAvoidingView style={{flex:1}} behavior={Platform.OS === "ios" ? 'padding' : 'height'}>
        
          
          <Stack.Navigator>
            <Stack.Screen name='HomeScreen' component={HomeScreen} options={{
              headerShown:false,
            }}/>
            <Stack.Screen name='MapScreen' component={MapScreen} options={{
              headerShown:false,
            }}/>
          </Stack.Navigator>

        </KeyboardAvoidingView>

      </SafeAreaProvider>
      </NavigationContainer>
    </Provider>
  );
}

