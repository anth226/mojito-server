import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

// Create a function to handle API requests
async function callApi<T>(
  method: string,
  url: string,
  data: any = null,
  headers: any = {}
) {
  try {
    const config: AxiosRequestConfig = {
      method,
      url,
      data,
      headers,
    };

    const response: AxiosResponse<T> = await axios(config);

    return response.data;
  } catch (error: any) {
    // Handle errors or throw an exception
    console.log(error);

    throw error.response?.data?.error;
  }
}

export { callApi };
