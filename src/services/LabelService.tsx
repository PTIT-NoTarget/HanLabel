import axios from "axios"
import { API_URL } from "../utils/Constant"

export const addNewLabel = (label: any) => {
  return axios.post(`${API_URL}/label`, label)
}

export const getAllLabels = () => {
  return axios.get(`${API_URL}/label`)
}

export const updateLabel = (labelId: any, label: any) => {
  return axios.put(`${API_URL}/label/${labelId}`, label)
}

export const deleteLabel = (labelId: any) => {
  return axios.delete(`${API_URL}/label/${labelId}`)
}

export const getLabelsByGrade = (grade: any) => {
  return axios.get(`${API_URL}/label/grade/${grade}`)
}

export const renderPdf = (data: any): Promise<any> => {
  return axios.post(`${API_URL}/label/render`, data, {
    responseType: "blob",
  });
}
