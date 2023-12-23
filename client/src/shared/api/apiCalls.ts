import axios from "axios"
import { BASE_URL } from "../../config/properties"


export const getSessionsTitles = async () => {
  const response = await axios.get(BASE_URL + "api/getAllActivities/")
  return response.data;
}

export const getSessionsByDate = async (activityName: string, activityId: number, date: string) => {
  try {
    const requestBody = {
      activityName,
      activityId,
      date
    }
    const response = await axios.post(BASE_URL + "api/getSessionsByDate/", requestBody, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
}