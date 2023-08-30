import { NextResponse } from 'next/server'

export async function GET(
  request: Request,
  { params }: { params: { slug: string } },
) {
  console.log(params.slug)
  const responseImei = await fetch(
    `https://api.scalefusion.com/api/v1/devices/search.json?imei_no=${params.slug}`,
    {
      headers: {
        Accept: 'application/json',
        Authorization: `Token ${process.env.TOKEN_SCALEFUSION}`,
      },
    },
  )

  const dataImei = await responseImei.json()

  const responseDevice = await fetch(
    `https://api.scalefusion.com/api/v2/devices/${dataImei.id}.json`,
    {
      headers: {
        Accept: 'application/json',
        Authorization: `Token ${process.env.TOKEN_SCALEFUSION}`,
      },
    },
  )

  const dataDevice = await responseDevice.json()

  return NextResponse.json({ dataDevice })
}
