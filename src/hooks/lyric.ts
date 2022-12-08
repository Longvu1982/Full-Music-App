import { useEffect, useState } from "react"
import { getLyric } from "../api/lyric"

const useLyric = ( songId:string | null): any => {

  const [lyr, setLyr] = useState<Array<{ data: string }>>()

  useEffect(() => {
    (
      async () => {
        if(songId !== null && songId !== "") {

          const dataLyric:any = await getLyric(songId)

          let customLyr:{ startTime: number, endTime: number,data: string }[] = []

          dataLyric.sentences &&
          dataLyric.sentences.forEach((e:{words: []}, i:number) => {
            let lineLyric:string = ""
            let sTime: number = 0
            let eTime: number = 0

            e.words.forEach((element: {data: string, startTime: number, endTime: number}, index:number) => {
              if(index === 0) {
                sTime = element.startTime
              }
              if(index === e.words.length - 1) {
                eTime = element.endTime
              }
              lineLyric = lineLyric + element.data + " "
            })
            customLyr.push({
              startTime: sTime,
              endTime: eTime,
              data: lineLyric
            })
          })

          setLyr(customLyr)

        }
      }
    )()
  }, [songId])

  return lyr

}

export default useLyric
