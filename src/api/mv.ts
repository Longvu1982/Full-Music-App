import axios from "../utils/axios"

const getMV = async (id: string) => {
  try {
    const {data} = await axios.get<any, any>("/video", {
      params: {
        id: id
      }
    })
    return data
  } catch(err) {
    console.log(err)
  }
}

const getlistMV = async (id: string, page: number, count: number) => {
  try {
    const {data} = await axios.get<any, any>("/listmv", {
      params: {
        id: id,
        page: page,
        count: count
      }
    })
    return data
  } catch(err) {
    console.log(err)
  }
}

export { getMV, getlistMV }

