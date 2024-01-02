import axios from "axios"
import { BASE_URL } from "../../../config/properties"

export const signUp = async (firstname: string, lastname: string, username: string, email: string, password: string) => {
    try {
        const requestBody = {
            email,
            password,
            firstname,
            lastname,
            username
        };
        const response = await axios.post(BASE_URL + "api/signUp/", requestBody, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return { statusCode: response.status, data: response.data };
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            // Check if the error is an Axios error and has a response
            if (error.response.status === 409) {
                // Handle the specific case of a 409 status
                return { statusCode: 409, data: error.response.data };
            }
            console.log('Error during signUp:', error.response);
            return { statusCode: error.response.status, data: error.response.data };
        } else {
            // For non-Axios errors or network errors
            console.log('Error during signUp:', error);
            return { statusCode: 500, data: 'An unexpected error occurred' };
        }
    }
}


export const login = async (usernameorEmail: string, password: string) => {
    try {
        const response = await axios.post(BASE_URL + "api/login/", { usernameorEmail, password }, {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        });
        return { statusCode: response.status, data: response.data };
    }catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            // Check if the error is an Axios error and has a response
            if (error.response.status === 409) {
                // Handle the specific case of a 409 status
                return { statusCode: 409, data: error.response.data };
            }
            console.log('Error during signUp:', error.response);
            return { statusCode: error.response.status, data: error.response.data };
        } else {
            // For non-Axios errors or network errors
            console.log('Error during signUp:', error);
            return { statusCode: 500, data: 'An unexpected error occurred' };
        }
    }


}

export const checkLogin=async () => {
    try{
        const response=await axios.get(BASE_URL+"api/loginCheck",{
            withCredentials: true
          });
        return {statusCode: response.status, data: response.data};       
    }catch (e){
        if (axios.isAxiosError(e) && e.response) {
            // Check if the error is an Axios error and has a response
            if (e.response.status === 401) {
                // Handle the specific case of a 409 status
                return { statusCode: 409 , data: e.response.data};
            }
            console.log('Error during signUp:', e.response);
            return { statusCode: e.response.status, data: e.response.data };
        } else {
            // For non-Axios errors or network errors
            console.log('Error during signUp:', e);
            return { statusCode: 500 , data: 'An unexpected error occurred' };
        }
    }
}


export const logout=async () => {
    try{
        const response=await axios.get(BASE_URL+"api/logout",{
            withCredentials: true
          });
        return {statusCode: response.status, data: response.data};       
    }catch (e){
        console.log(e);
        return { statusCode: 500 , data: 'An unexpected error occurred' };
    }
}
