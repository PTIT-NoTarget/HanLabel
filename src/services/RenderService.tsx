import axios from "axios"

export const renderPdf = (id : any, data: any): Promise<any> => {
  return axios.post(`${process.env.REACT_APP_API_URL}/render/${id}`, data, {
    responseType: "blob",
  });
}