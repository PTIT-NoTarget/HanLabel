import axios from "axios"
import constant from "../utils/Constants"

export const addNewBackground = (background: any) => {
  const formData = new FormData();
  for (const key in background) {
    formData.append(key, background[key]);
  }
  return axios.post(`${constant.API_URL}/background`, formData)
}

export const getAllBackgrounds = () => {
  return axios.get(`${constant.API_URL}/background`)
}

export const updateBackground = (backgroundId: any, background: any) => {
  const formData = new FormData();
  for (const key in background) {
    formData.append(key, background[key]);
  }
  return axios.put(`${constant.API_URL}/background/${backgroundId}`, formData)
}

export const deleteBackground = (backgroundId: any) => {
  return axios.delete(`${constant.API_URL}/background/${backgroundId}`)
}