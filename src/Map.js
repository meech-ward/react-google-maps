import {useState, useEffect} from 'react'
import GoogleMapReact from "google-map-react"
import { geolocated } from "react-geolocated"
import styled from "styled-components"


const MapCont = styled.div`
  height: 65vh;
  min-width: 300px;
  width: 80%;
  margin: auto;
  border: solid 5px;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 1px 4px 5px 4px rgba(0, 0, 0, 0.3);
  z-index: 0;
`

let directionsService, directionsRenderer, maps, map

function Map({ coords, destination }) {

  const [center, setCenter] = useState({})

  useEffect(() => {
    if (coords && destination && maps) {
      calcRoute()
      return 
    }
    if (coords) {
      setCenter({
        lat: coords?.latitude,
        lng: coords?.longitude
      })
    }
  }, [coords, destination])

  function calcRoute() {
    console.log("calculate the route")

    const start = new maps.LatLng(coords.latitude, coords.longitude)
    const end = new maps.LatLng(destination.latitude, destination.longitude)

    const request = {
      origin: start,
      destination: end,
      travelMode: "TRANSIT"
    }

    directionsService.route(request, function (result, status) {
      if (status == "OK") {
        directionsRenderer.setDirections(result)
      }

      if (status != "OK") {
        console.log("Something went wrong with routing")
      }
    })
  }


  function handleGoogleMapApi(details) {

    maps = details.maps
    map = details.map

    directionsService = new maps.DirectionsService()
    directionsRenderer = new maps.DirectionsRenderer()
    directionsRenderer.setMap(map)
  }

  return (
    <MapCont>
      {coords ? (
        <GoogleMapReact
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={handleGoogleMapApi}
          bootstrapURLKeys={{ key: process.env.GOOGLE_API_KEY }}
          center={center}
          defaultZoom={15}
        ></GoogleMapReact>
      ) : (
        <div>Getting Location...</div>
      )}
    </MapCont>
  )
}

export default geolocated({
  positionOptions: {
    enableHighAccuracy: false
  },
  userDecisionTimeout: 5000,
  watchPosition: true
})(Map)