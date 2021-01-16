import Papa from "papaparse";

export const parseCsvResponse = async (response) => {
  const reader = response.body.getReader();
  const result = await reader.read();
  const decoder = new TextDecoder("utf-8");
  const csv = decoder.decode(result.value); // the csv text
  const results = Papa.parse(csv, { header: true }); // object with { data, errors, meta }
  return results.data;
};
const sanitizePossibleNumbers = (obj) => {
  const newObj = {};
  for (const key in obj) {
    const currentProcessedValue = parseFloat(obj[key]);
    newObj[key] = isNaN(currentProcessedValue)
      ? obj[key]
      : currentProcessedValue;
  }
  return newObj;
};

export const datasetLinks = {
  wwc_forecasts_link: process.env.PUBLIC_URL + "/dataset/wwc_forecasts.csv",
  twitter_followers_link:
    process.env.PUBLIC_URL + "/dataset/twitter_followers.csv",
  senate_state_link: process.env.PUBLIC_URL + "/dataset/senate_state.csv",
};

export const fetchAndProcessData = () =>
  Promise.all(
    Object.values(datasetLinks).map((link) => fetch(link)),
  ).then((values) =>
    Promise.all(values.map(parseCsvResponse)).then((parsedArrays) =>
      parsedArrays.map((arr) => arr.map(sanitizePossibleNumbers)),
    ),
  );
