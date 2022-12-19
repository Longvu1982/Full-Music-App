import axios from "../utils/axios"

const getDetailPlaylist = async (id: string) => {
  try {
    const {data} = await axios.get<any, any>("/detailplaylist", {
        params: {
          id: id
        }
      }
    )
    return data
  } catch(err) {
    console.log(err)
  }
}

export { getDetailPlaylist }
