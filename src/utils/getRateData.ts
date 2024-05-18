const getRateData = async (apiKey: string) => {
  const URL = 'https://api.currencybeacon.com/v1/latest?';
  const params = `api_key=${apiKey}&symbols=UAH`;
  const rawResponse = await fetch(URL + params);
  const { response } = await rawResponse.json();

  return response?.rates?.UAH as number;
};

export default getRateData;
