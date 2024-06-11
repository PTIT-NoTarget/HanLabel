import axios from "axios"
import { API_URL } from "../utils/Constant"

export const addNewBackground = (background: any) => {
  const formData = new FormData();
  for (const key in background) {
    formData.append(key, background[key]);
  }
  return axios.post(`${API_URL}/background`, formData)
}

export const getAllBackgrounds = () => {
  return axios.get(`${API_URL}/background`)
}

export const updateBackground = (backgroundId: any, background: any) => {
  const formData = new FormData();
  for (const key in background) {
    formData.append(key, background[key]);
  }
  return axios.put(`${API_URL}/background/${backgroundId}`, formData)
}

export const deleteBackground = (backgroundId: any) => {
  return axios.delete(`${API_URL}/background/${backgroundId}`)
}