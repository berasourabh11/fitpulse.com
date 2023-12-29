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

export const booksession = async (activityName: string, activityId: number, date: string, time: string) => {
  try {
    console.log(activityName, activityId, date, time);
    const response = await axios.post(BASE_URL + "api/bookSession/", {
      activityName,
      activityId,
      sessionTime: {
        date,
        hours: Number(time.split(":")[0]),
        minutes:Number( time.split(":")[1].split(" ")[0]),
        seconds: 0,
        am_pm: time.split(":")[1].split(" ")[1]
      }
    }, {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return {statusCode: 200, data: response.data};
  } catch (error) {
    if(axios.isAxiosError(error) && error.response){
      console.log(error.response.data[0])
      if(error.response.status===401){
        return {statusCode: 401, data: error.response.data}
      }
      if(error.response.status===400){
        return {statusCode: 400, data: error.response.data[0]}
      }
      if(error.response.status===409){
        return {statusCode: 409, data: error.response.data}
      }
        return {statusCode: 500, data: error.response.data}
    }else{
      return {statusCode: 500, data: "Network Error"}
    }
  }
}

