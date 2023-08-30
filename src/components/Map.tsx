'use client'
import { TileLayer, MapContainer } from 'react-leaflet'
import MarkerPopup from './MarkerPopup'
import 'leaflet/dist/leaflet.css'

export default function Map() {
  const STARTING_POSITION = {
    lat: -3.8315527,
    lng: -38.5895997,
  }
  const ZOOM = 12

  return (
    <MapContainer
      className="h-screen w-screen"
      center={[STARTING_POSITION.lat, STARTING_POSITION.lng]}
      zoom={ZOOM}
      scrollWheelZoom={true}
    >
      <TileLayer
        url={`https://api.mapbox.com/styles/v1/mapbox/outdoors-v12/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.NEXT_PUBLIC_TOKEN_MAP_BOX}`}
      />
      <MarkerPopup />
    </MapContainer>
  )
}
