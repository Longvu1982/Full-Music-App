import React, { useEffect, useState } from "react"
import { getMV } from "../../api/mv"
import ReactPlayer from "react-player"

const VideoPlayer: React.FC<{id: string}> = ({id}) => {

  const [dataUrl, setDataUrl] = useState<{"360p": string, "480p": string, "720p": string}>()
  const [url, setUrl] = useState<string>()

  useEffect(() => {
    (
      async () => {
        const data:any = await getMV(`${id}`)
        setDataUrl(data.streaming.hls)
      }
    )()
  }, [id])

  return (
    <div className="relative w-full h-full">
      <div className="flex justify-center">
        <ReactPlayer
          url={
            url || dataUrl?.["720p"]
          }
          controls={true}
          width="100%"
          height="100%"
        />
      </div>
      <div className=" absolute flex justify-center mt-3">
        <button
          className="style__buttons text-[color:var(--color-text)] font-medium"
          onClick={() => {
            setUrl(dataUrl?.["360p"])
          }}
        >
          360p
        </button>
        <button
          className="style__buttons text-[color:var(--color-text)] font-medium"
          onClick={() => {
            setUrl(dataUrl?.["480p"])
          }}
        >
          480p
        </button>
        <button
          className="style__buttons text-[color:var(--color-text)] font-medium"
          onClick={() => {
            setUrl(dataUrl?.["720p"])
          }}
        >
          720p
        </button>
      </div>
    </div>
  )
}

export default VideoPlayer