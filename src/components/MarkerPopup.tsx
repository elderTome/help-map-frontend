'use client'
import Leaflet from 'leaflet'
import { useEffect, useState } from 'react'
import { Popup, Marker } from 'react-leaflet'

const mapPinIcon = Leaflet.icon({
  iconUrl: '/icon.svg',
  iconSize: [50, 50],
  iconAnchor: [30, 30],
  popupAnchor: [-4, -4],
})

type Props = {
  help: {
    location: {
      lat: number
      lng: number
    }
    message: string
  }
}

type LocationData = {
  name: string
}

export default function MarkerPopup({ help }: Props) {
  const { location, message } = help
  const [locationData, setLocationData] = useState<LocationData | null>(null)

  useEffect(() => {
    ;(async function loadLocationData() {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${location.lng}%2C%20${location.lat}.json?access_token=${process.env.NEXT_PUBLIC_TOKEN_MAP_BOX}`,
      )

      const data = await response.json()

      setLocationData({ name: data.features[0].place_name })
    })()
  }, [location])

  return (
    <Marker position={[location.lat, location.lng]} icon={mapPinIcon}>
      <Popup closeButton={false}>
        <div className="flex flex-col gap-2">
          <span className="font-semibold">{locationData?.name}</span>
          <span>
            <strong className="font-semibold">Mensagem:</strong> {message}
          </span>
        </div>
      </Popup>
    </Marker>
  )
}
