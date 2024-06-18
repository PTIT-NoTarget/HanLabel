import axios from "axios"
import constant from "../utils/Constants"

export const addNewLabel = (label: any) => {
  return axios.post(`${constant.API_URL}/label`, label)
}

export const getAllLabels = () => {
  return axios.get(`${constant.API_URL}/label`)
}

export const updateLabel = (labelId: any, label: any) => {
  return axios.put(`${constant.API_URL}/label/${labelId}`, label)
}

export const deleteLabel = (labelId: any) => {
  return axios.delete(`${constant.API_URL}/label/${labelId}`)
}

export const getLabelsByGrade = (grade: any) => {
  return axios.get(`${constant.API_URL}/label/grade/${grade}`)
}

export const renderPdf = (data: any): Promise<any> => {
  return axios.post(`${constant.API_URL}/label/render`, data, {
    responseType: "blob",
  });
}
