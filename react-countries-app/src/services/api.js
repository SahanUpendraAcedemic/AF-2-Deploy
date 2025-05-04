const BASE_URL = "https://restcountries.com/v3.1";

export const fetchAllCountries = async () => {
  const res = await fetch(`${BASE_URL}/all`);
  if (!res.ok) throw new Error("Failed to fetch countries");
  return await res.json();
};

export const fetchCountryByCode = async (code) => {
  const res = await fetch(`${BASE_URL}/alpha/${code}`);
  if (!res.ok) throw new Error("Failed to fetch country details");
  return await res.json();
};