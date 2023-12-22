import { StyleSheet, Text, View, SafeAreaView, Image } from 'react-native'
import React from 'react'
import tw from 'tailwind-react-native-classnames'
import NavOptions from '../components/NavOptions'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import {GOOGLE_MAP_API_KEY} from '@env'
import { useDispatch } from 'react-redux'
import { setDestination,setOrigin } from '../slices/navSlice'
import NavFavourites from '../components/NavFavourites'


const HomeScreen = () => {
  const dispatch = useDispatch()
  return (
    <SafeAreaView style={tw`h-full`}>
      <View style={tw`p-5`}>
        <Image 
            style={{width:100,height:100,resizeMode:'contain'}}
            source={{
                uri:"https://links.papareact.com/gzs"
            }}
        />

        <GooglePlacesAutocomplete 
          styles={{container:{flex:0},textInput:{fontSize:18}}}
          placeholder='Where from'

          nearbyPlacesAPI='GooglePlacesSearch'
          debounce={400}
          enablePoweredByContainer={false}
          query={
            {key:GOOGLE_MAP_API_KEY,language:'en'}
          }
          fetchDetails={true}
          onPress={(data,details=null)=>{
            dispatch(
              setOrigin(
                {location:details.geometry.location, description:data.description}
                )
              );

            dispatch(setDestination(null));
            }
          }
        />
        <NavOptions/>
        <NavFavourites/>
      </View>
    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({})