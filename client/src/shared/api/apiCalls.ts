import axios from "axios"
import { BASE_URL } from "../../config/properties"


export const getSessionsTitles = async () => {
  const response = await axios.get(BASE_URL+"api/getAllActivities/")
  return response.data;
}