'use client'
import { LatLngExpression } from 'leaflet'
import { useState } from 'react'
import { Marker, Popup, TileLayer, MapContainer } from 'react-leaflet'

export default function Map() {
  const [position, setPosition] = useState<LatLngExpression>([51.505, -0.09])

  return (
    <MapContainer
      className="w-full h-full"
      center={position}
      zoom={14}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  )
}
