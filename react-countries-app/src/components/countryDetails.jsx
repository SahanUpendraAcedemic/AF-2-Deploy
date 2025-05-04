import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchCountryByCode } from "../services/api";

function CountryDetail() {
  const { code } = useParams();
  const [country, setCountry] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchCountryByCode(code)
      .then((data) => setCountry(data[0]))
      .catch((err) => setError(err.message));
  }, [code]);

  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!country) return <p className="text-center">Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-2xl mt-6">
      <Link
        to="/"
        className="text-blue-600 hover:text-blue-800 font-medium mb-6 inline-block transition duration-150"
      >
        ← Back to All Countries
      </Link>

      <div className="flex flex-col md:flex-row gap-8">
        <img
          src={country.flags.svg}
          alt={country.name.common}
          className="w-full md:w-1/2 h-auto rounded-xl shadow"
        />

        <div className="flex-1 space-y-4">
          <h1 className="text-3xl font-bold text-gray-800">
            {country.name.common}
          </h1>
          <p className="text-lg text-gray-600">
            <strong>Official Name:</strong> {country.name.official}
          </p>
          <p className="text-gray-600">
            <strong>Capital:</strong> {country.capital?.[0] || "N/A"}
          </p>
          <p className="text-gray-600">
            <strong>Region:</strong> {country.region}
          </p>
          <p className="text-gray-600">
            <strong>Subregion:</strong> {country.subregion}
          </p>
          <p className="text-gray-600">
            <strong>Languages:</strong>{" "}
            {country.languages
              ? Object.values(country.languages).join(", ")
              : "N/A"}
          </p>
          <p className="text-gray-600">
            <strong>Population:</strong> {country.population.toLocaleString()}
          </p>
          <p className="text-gray-600">
            <strong>Timezones:</strong> {country.timezones?.join(", ") || "N/A"}
          </p>
        </div>
      </div>
    </div>
  );
}

export default CountryDetail;
