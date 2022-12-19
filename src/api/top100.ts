import axios from "../utils/axios"

const getTop100 = async () => {
  try {
    const {data} = await axios.get<any, any>("/top100")
    return data
  } catch(err) {
    console.log(err)
  }
}

export { getTop100 }
