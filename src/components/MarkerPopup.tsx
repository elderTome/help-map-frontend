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

type Data = {
  name: string
  location: {
    lat: number
    lng: number
    address: string
  }
  battery_status: number
}

export default function MarkerPopup() {
  const [data, setData] = useState<Data | null>(null)
  const imei = 356132115371941

  useEffect(() => {
    ;(async function loadLocationData() {
      const response = await fetch(`/api/scalefusion/${imei}`)
      const data = await response.json()

      setData(data.dataDevice)
    })()
  }, [])

  return (
    <>
      {data && (
        <Marker
          position={[data.location.lat, data.location.lng]}
          icon={mapPinIcon}
        >
          <Popup closeButton={false}>
            <div className="flex flex-col gap-2">
              <span className="font-semibold">{data?.location.address}</span>
              <span>
                <strong className="font-semibold">Nome:</strong> {data?.name}
              </span>
              <span className="flex gap-8">
                <div>
                  <strong className="font-semibold">Bateria:</strong>{' '}
                  {`${data.battery_status}%`}
                </div>
                <div>
                  <strong className="font-semibold">
                    Horário da ocorrência:
                  </strong>{' '}
                  {'16:40'}
                </div>
              </span>
              <span>
                <strong className="font-semibold">Mensagem:</strong>{' '}
                {'Estou presa nessa casa, preciso de ajuda.'}
              </span>
            </div>
          </Popup>
        </Marker>
      )}
    </>
  )
}
