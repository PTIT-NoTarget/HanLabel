import axios from "axios"

export const addNewBackground = (background: any) => {
  const formData = new FormData();
  for (const key in background) {
    formData.append(key, background[key]);
  }
  return axios.post(`${process.env.API_URL}/background`, formData)
}

export const getAllBackgrounds = () => {
  return axios.get(`${process.env.API_URL}/background`)
}

export const updateBackground = (backgroundId: any, background: any) => {
  const formData = new FormData();
  for (const key in background) {
    formData.append(key, background[key]);
  }
  return axios.put(`${process.env.API_URL}/background/${backgroundId}`, formData)
}

export const deleteBackground = (backgroundId: any) => {
  return axios.delete(`${process.env.API_URL}/background/${backgroundId}`)
}