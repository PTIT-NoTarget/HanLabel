import axios from "axios"
import constant from "../utils/Constants"

export const renderPdf = (id : any, data: any): Promise<any> => {
  return axios.post(`${constant.API_URL}/render/${id}`, data, {
    responseType: "blob",
  });
}