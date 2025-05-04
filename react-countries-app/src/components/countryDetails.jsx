import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

function CountryDetail() {
  const { code } = useParams();
  const [country, setCountry] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchAllCountries()
      .then((data) => {
        console.log("Fetched:", data);
        const valid = data.filter((c) => c && c.cca3);
        setCountries(valid);
        setFiltered(valid);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!country) return <p className="text-center">Loading...</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <Link to="/" className="text-blue-500 underline mb-4 inline-block">
        ← Back
      </Link>
      <h1 className="text-2xl font-bold mb-4">{country.name.common}</h1>
      <img
        src={country.flags.svg}
        alt={country.name.common}
        className="w-full max-h-60 object-cover rounded mb-4"
      />
      <p>
        <strong>Official Name:</strong> {country.name.official}
      </p>
      <p>
        <strong>Capital:</strong> {country.capital?.[0]}
      </p>
      <p>
        <strong>Region:</strong> {country.region}
      </p>
      <p>
        <strong>Subregion:</strong> {country.subregion}
      </p>
      <p>
        <strong>Languages:</strong>{" "}
        {country.languages && Object.values(country.languages).join(", ")}
      </p>
      <p>
        <strong>Population:</strong> {country.population.toLocaleString()}
      </p>
      <p>
        <strong>Timezones:</strong> {country.timezones.join(", ")}
      </p>
    </div>
  );
}

export default CountryDetail;
