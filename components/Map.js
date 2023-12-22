import { View, Text } from 'react-native'
import React, { useEffect,useRef } from 'react'
import MapView,{Marker} from 'react-native-maps'
import tw from 'tailwind-react-native-classnames'
import { useDispatch, useSelector } from 'react-redux'
import { selectDestination, selectOrigin, setTravelTimeInformation } from '../slices/navSlice'
import MapViewDirections from 'react-native-maps-directions'
import {GOOGLE_MAP_API_KEY} from '@env'

const Map = () => {
    const origin = useSelector(selectOrigin);
    const destination= useSelector(selectDestination)
    const dispatch=useDispatch()
    const mapRef = useRef(null)

    useEffect(()=>{
        if(!origin || !destination) return ;
        mapRef.current.fitToSuppliedMarkers(["origin","destination"],{edgePadding:{top:50,right:50,bottom:50,left:50}})
    },[origin,destination]);

    useEffect(()=>{
        if (!origin || !destination) return;

        const getTraveTime= async()=>{
            fetch(`https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=${origin.description}&destinations=${destination.description}&key=${GOOGLE_MAP_API_KEY}`)
            .then(res=>res.json())
            .then(data =>{
                dispatch(setTravelTimeInformation(data.rows[0].elements[0])
                    );
            })
        }
        getTraveTime();
    },[origin,destination,GOOGLE_MAP_API_KEY])

  return (
   
      <MapView
        ref={mapRef}
        mapType="mutedStandard"
        style={tw`flex-1`}
        initialRegion={{
            latitude: origin.location.lat,
            longitude: origin.location.lng,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
        }}
    >
        {origin&&destination&& (
            <MapViewDirections
                origin={origin.description}
                destination={destination.description}
                apikey={GOOGLE_MAP_API_KEY}
                strokeColor='black'
                strokeWidth={3}
            />
        )}

        {origin?.location && (
            <Marker
                coordinate={
                    { 
                        latitude:origin.location.lat,
                        longitude:origin.location.lng
                    }
                }
                title='Origin'
                description={origin.description.slice(0,40)+'...'}
                identifier="origin"
            />
        )}

        {destination?.location && (
            <Marker
                coordinate={
                    { 
                        latitude:destination.location.lat,
                        longitude:destination.location.lng
                    }
                }
                title='Destination'
                description={destination.description.slice(0,40)+'...'}
                identifier="destination"
            />
        )}

    </MapView>
    
  )
}

export default Map