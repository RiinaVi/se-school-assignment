import * as process from 'node:process';

const getRateData = async () => {
  const URL = "https://api.currencybeacon.com/v1/latest?";
  const params = `api_key=${process.env.CURRENCY_BEACON_API_KEY}&symbols=UAH`;
  const rawResponse = await fetch(URL + params);
  const { response } = await rawResponse.json();

  return response.rates.UAH as number;
}

export default getRateData;