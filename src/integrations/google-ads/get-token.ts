import axios from "axios";
import dotenv from "dotenv";
import { callApi } from "./service-api";
dotenv.config();

type IACCESS_TOKEN_RESPONSE = {
  access_token: string;
  expires_in: number;
  token_type: string;
  scope: string;
};

export let ACCESS_TOKEN = "";
export const getGoogleAdsAccessToken = async () => {
  const url = "https://www.googleapis.com/oauth2/v3/token";
  const data: any = {
    client_id: process.env.GOOGLE_CLIENT_ID,
    client_secret: process.env.GOOGLE_CLIENT_SECRET,
    refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
    grant_type: "refresh_token",
  };
  const response: IACCESS_TOKEN_RESPONSE = await callApi(
    "POST",
    url,
    data,
    null
  );
  ACCESS_TOKEN = response.access_token;
  return response;
};
