import { callApi } from "./../service-api";
import { ACCESS_TOKEN, getGoogleAdsAccessToken } from "./../get-token";
import dotenv from "dotenv";
dotenv.config();

// Example usage
async function fetchCutomers(): Promise<void> {
  const url = `https://googleads.googleapis.com/v${process.env.API_VERSION}/customers:listAccessibleCustomers`;
  if (ACCESS_TOKEN === "") {
    await getGoogleAdsAccessToken();
  }
  console.log(url);

  const headers = {
    Authorization: `Bearer ${ACCESS_TOKEN}`,
    "developer-token": process.env.GOOGLE_DEVELOPER_TOKEN,
  };
  console.log(headers);
  try {
    const campaigns = await callApi("GET", url, null, headers);
    console.log(campaigns);
  } catch (error) {
    console.error(error);
  }
}
export { fetchCutomers };
