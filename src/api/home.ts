import axios from "../utils/axios"

interface dataType {
  items: []
  sectionType: string
}

const getHomePlayList = async () => {
  try {
    const {data}:{data: dataType} =  await axios.get("/home")
    return data.items.filter((e:dataType) => e.sectionType === "playlist" )
  } catch(err) {
    console.log(err)
  }
}

export { getHomePlayList }
