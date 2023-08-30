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

  const helps = [
    {
      id: 1,
      location: { lat: -3.7352796, lng: -38.556684 },
      message: 'Estou preso nessa casa, preciso de ajuda.',
    },
    {
      id: 2,
      location: { lat: -3.742256, lng: -38.5636555 },
      message: 'Socorro',
    },
    {
      id: 3,
      location: { lat: -3.72664, lng: -38.5339556 },
      message: 'Socorro',
    },
  ]

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
      {helps.map((help) => (
        <MarkerPopup key={help.id} help={help} />
      ))}
    </MapContainer>
  )
}
