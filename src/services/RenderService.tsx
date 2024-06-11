import axios from "axios"
import { API_URL } from "../utils/Constant"

export const renderPdf = (id : any, data: any): Promise<any> => {
  return axios.post(`${API_URL}/render/${id}`, data, {
    responseType: "blob",
  });
}