import axios from "axios"
import { API_URL } from "../utils/Constant"

export const addNewSchool = (school: any) => {
  return axios.post(`${API_URL}/school`, school)
}

export const getAllSchools = () => {
  return axios.get(`${API_URL}/school`)
}

export const updateSchool = (schoolId: any, school: any) => {
  return axios.put(`${API_URL}/school/${schoolId}`, school)
}

export const deleteSchool = (schoolId: any) => {
  return axios.delete(`${API_URL}/school/${schoolId}`)
}