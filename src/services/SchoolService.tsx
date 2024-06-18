import axios from "axios"
import constants from "../utils/Constants"

export const addNewSchool = (school: any) => {
  return axios.post(`${constants.API_URL}/school`, school)
}

export const getAllSchools = () => {
  return axios.get(`${constants.API_URL}/school`)
}

export const updateSchool = (schoolId: any, school: any) => {
  return axios.put(`${constants.API_URL}/school/${schoolId}`, school)
}

export const deleteSchool = (schoolId: any) => {
  return axios.delete(`${constants.API_URL}/school/${schoolId}`)
}