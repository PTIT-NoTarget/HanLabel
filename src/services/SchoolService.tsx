import axios from "axios"

export const addNewSchool = (school: any) => {
  return axios.post(`${process.env.REACT_APP_API_URL}/school`, school)
}

export const getAllSchools = () => {
  return axios.get(`${process.env.REACT_APP_API_URL}/school`)
}

export const updateSchool = (schoolId: any, school: any) => {
  return axios.put(`${process.env.REACT_APP_API_URL}/school/${schoolId}`, school)
}

export const deleteSchool = (schoolId: any) => {
  return axios.delete(`${process.env.REACT_APP_API_URL}/school/${schoolId}`)
}