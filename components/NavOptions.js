import { FlatList, Text, TouchableOpacity, View,Image } from 'react-native';
import React from 'react';
import tw from 'tailwind-react-native-classnames';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { selectOrigin } from '../slices/navSlice';

const data=[
    {
        "id":1,
        "title":"Get a ride",
        "image":"https://links.papareact.com/3pn",
        "screen":"MapScreen"
    },
    {
        "id":2,
        "title":"Order Food",
        "image":"https://links.papareact.com/28w",
        "screen":"EatsScreen"
    }
]

const NavOptions = () => {
    const origin=useSelector(selectOrigin)
    const navigation = useNavigation();

  return (
    <FlatList 
    data={data}
    horizontal  
    keyExtractor={(item)=>item.id}
    renderItem={({ item })=>(
            <TouchableOpacity style={tw`pl-6 p-2 pt-4 pb-8 bg-gray-200 m-2 w-40`} onPress={()=>navigation.navigate(item.screen)} disabled={!origin}>
                <View style={tw`${!origin && 'opacity-30'}`}>
                    <Image
                        style={{width:120,height:120,resizeMode:'contain'}}
                        source={{uri:item.image}}
                    />
                    <Text style={tw`mt-2 text-lg font-semibold`}>{item.title}</Text>
                    <Icon style={tw`p-2 bg-black rounded-full mt-4 w-10`} type='antdesign' color="white" name='arrowright'/>
                </View>
                
            </TouchableOpacity>
        )}
    />
        
  )
}

export default NavOptions
