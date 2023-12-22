import { View, Text, SafeAreaView, TouchableOpacity, ScrollView, FlatList, Image } from 'react-native'
import React, { useState } from 'react'
import tw from 'tailwind-react-native-classnames'
import { Icon } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { selectTravelTimeInformation } from '../slices/navSlice'

const data=[
  {
    id:123,
    title:'UberX',
    multiplier: 1, 
    image:"https://links.papareact.com/3pn"
  },
  {
    id:456,
    title:'Uber XL',
    multiplier: 1.2, 
    image:"https://links.papareact.com/5w8"
  },
  {
    id:789,
    title:'Uber LUX',
    multiplier: 1.75, 
    image:"https://links.papareact.com/7pf"
  },
]

const RideOptionsCard = () => {
  const navigation= useNavigation();
  const travelTimeInformation=useSelector(selectTravelTimeInformation);
  const [selected, setSelected] = useState(null);

  return (
    <SafeAreaView style={tw`bg-white flex-grow`}>
      <View>
        <TouchableOpacity onPress={()=>navigation.navigate('NavigateCard')} style={tw`z-50 absolute top-4 left-5 p-3 rounded-full`}>
          <Icon size={15} name="chevron-left" type='font-awesome'/>
        </TouchableOpacity>
      <Text style={tw`text-center text-xl py-5`}>Select a Ride - {travelTimeInformation?.distance?.text}</Text>
      </View>

      <FlatList
        data={data}
        scrollEnabled={true}
        keyExtractor={(item)=>item.id}
        renderItem={({item:{id,title,image,multiplier},item})=>(
          <TouchableOpacity style={tw`flex-row justify-between items-center px-10 ${id === selected?.id && "bg-gray-200"}`} onPress={()=>setSelected(item)}>
            <Image
              style={{
                width:100,
                height:100,
                resizeMode:'contain'
              }}
              source={{uri:item.image}}
            />
            <View style={tw`-ml-6`}>
              <Text style={tw`text-xl font-semibold`}>{title}</Text>
              <Text>{travelTimeInformation?.duration?.text}</Text>
            </View>
            <Text style={tw`text-lg`}>{new Intl.NumberFormat('en-gb',{style:'currency',currency:"INR"}).format(
              (travelTimeInformation?.duration?.value * multiplier)/100)}</Text>
          </TouchableOpacity>
        )}
        />

      <View>
        <TouchableOpacity disabled={!selected} style={tw`bg-black py-3 mb-10 ${!selected && "bg-gray-300"}`}>
          <Text style={tw`text-center text-white text-xl`}>Choose {selected?.title}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default RideOptionsCard