import { useEffect, useState } from "react";
import SearchFilter from "../components/searchAndFilter";
import CountryCard from "../components/countryCard";
import { getFavorites } from "../utils/localStorageUtil";
import { fetchAllCountries } from "../services/api";

function HomePage() {
  const [countries, setCountries] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  useEffect(() => {
    fetchAllCountries()
      .then((data) => {
        setCountries(data);
        setFiltered(data);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const handleSearch = (searchTerm) => {
    const lower = searchTerm.toLowerCase();
    setFiltered(
      countries.filter((c) => c.name.common.toLowerCase().includes(lower))
    );
  };

  const handleRegionChange = (region) => {
    if (!region) {
      setFiltered(countries);
    } else {
      setFiltered(countries.filter((c) => c.region === region));
    }
  };

  const displayed = showFavoritesOnly
    ? filtered.filter((c) => getFavorites().includes(c.cca3))
    : filtered;

  return (
    <div className="bg-gradient-to-b from-blue-50 to-white min-h-screen px-4 sm:px-8 py-8">
      <h1 className="text-4xl font-extrabold text-center mb-8 text-blue-800">
        🌍 Explora
      </h1>

      <SearchFilter
        onSearch={handleSearch}
        onRegionChange={handleRegionChange}
      />

      <div className="flex justify-center mb-6">
        <button
          onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
          className="px-4 py-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition"
        >
          {showFavoritesOnly ? "Show All" : "Show Favorites ❤️"}
        </button>
      </div>

      {error && <p className="text-red-500 text-center">{error}</p>}
      {loading ? (
        <p className="text-center text-blue-600 text-lg">
          Loading countries...
        </p>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {displayed.map((country) => (
            <CountryCard key={country.cca3} country={country} />
          ))}
        </div>
      )}
    </div>
  );
}

export default HomePage;
