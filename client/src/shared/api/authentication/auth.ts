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


export const login = async (username: string, password: string) => {
    try {
        const response = await axios.post(BASE_URL + "api/login/", { username, password }, {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        });
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