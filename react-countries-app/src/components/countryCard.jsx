import { useEffect, useState } from "react";
import { toggleFavorite, getFavorites } from "../utils/localStorageUtil";
import { Link } from "react-router-dom";

function CountryCard({ country }) {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const favs = getFavorites();
    setIsFavorite(favs.includes(country.cca3));
  }, [country.cca3]);

  const handleFavorite = (e) => {
    e.preventDefault(); // prevent navigating to detail view
    const updated = toggleFavorite(country.cca3);
    setIsFavorite(updated.includes(country.cca3));
  };

  return (
    <Link
      to={`/country/${country.cca3}`}
      className="w-full sm:w-[300px] relative"
    >
      <div className="bg-white rounded-2xl shadow-lg p-4 hover:shadow-xl transition-all duration-300 h-full flex flex-col">
        <button
          onClick={handleFavorite}
          className="absolute top-3 right-3 text-xl"
          title={isFavorite ? "Remove from Favorites" : "Add to Favorites"}
        >
          {isFavorite ? "❤️" : "🤍"}
        </button>

        <img
          src={country.flags.svg}
          alt={country.name.common}
          className="w-full h-40 object-cover rounded-xl mb-3"
        />
        <h2 className="text-lg font-semibold mb-1 text-blue-900">
          {country.name.common}
        </h2>
        <p className="text-sm">
          <strong>Capital:</strong> {country.capital?.[0]}
        </p>
        <p className="text-sm">
          <strong>Region:</strong> {country.region}
        </p>
        <p className="text-sm">
          <strong>Population:</strong> {country.population.toLocaleString()}
        </p>
      </div>
    </Link>
  );
}

export default CountryCard;
