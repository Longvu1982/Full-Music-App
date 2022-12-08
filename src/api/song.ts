import axios from "../utils/axios"

const getSong = async (id: string) => {
  try {
    const data = await axios.get<any, any>("/song", {
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

const getInfoSong = async (id: string) => {
  try {
    const data = await axios.get<any, any>("/infosong", {
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

export { getSong, getInfoSong }
