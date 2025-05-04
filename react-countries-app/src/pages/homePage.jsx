import { useEffect, useState } from "react";
import SearchFilter from "../components/searchAndFilter";
import CountryCard from "../components/countryCard";
import { getFavorites } from "../utils/localStorageUtil";
import { fetchAllCountries } from "../services/api";

//icons
import { FiArrowRightCircle } from "react-icons/fi";
import { FiArrowLeftCircle } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import { GiGlobe } from "react-icons/gi";

function HomePage() {
  const [countries, setCountries] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [searchType, setSearchType] = useState("name");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12);

  useEffect(() => {
    fetchAllCountries()
      .then((data) => {
        setCountries(data);
        setFiltered(data);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const handleSearchTypeChange = (type) => {
    setSearchType(type);
  };

  const handleSearchValueChange = (searchTerm) => {
    const lower = searchTerm.toLowerCase();
    setFiltered(
      countries.filter((c) => {
        // Match based on the selected search type
        if (searchType === "name") {
          return c.name.common.toLowerCase().includes(lower);
        }
        if (searchType === "fullName") {
          return c.name.official.toLowerCase().includes(lower);
        }
        if (searchType === "capital") {
          return c.capital?.[0]?.toLowerCase().includes(lower);
        }
        if (searchType === "currency") {
          return Object.keys(c.currencies || {}).some((key) =>
            c.currencies[key].name.toLowerCase().includes(lower)
          );
        }
        if (searchType === "language") {
          return Object.values(c.languages || {}).some((lang) =>
            lang.toLowerCase().includes(lower)
          );
        }
        if (searchType === "demonym") {
          return c.demonym?.toLowerCase().includes(lower);
        }
        if (searchType === "code") {
          return c.cca3.toLowerCase().includes(lower);
        }
        if (searchType === "translation") {
          // Assuming there's a translations object
          return Object.values(c.translations || {}).some((t) =>
            t.toLowerCase().includes(lower)
          );
        }
        if (searchType === "subregion") {
          return c.subregion?.toLowerCase().includes(lower);
        }
        return false;
      })
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

  const totalPages = Math.ceil(displayed.length / itemsPerPage);
  const paginatedCountries = displayed.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="bg-gradient-to-b from-blue-50 to-white min-h-screen px-4 sm:px-8 py-8">
      <GiGlobe className="text-blue-600 text-6xl mx-auto mb-4" />
      <h1 className="text-4xl font-extrabold text-center mb-8 text-blue-800">
        Explora
      </h1>

      <SearchFilter
        onSearchTypeChange={handleSearchTypeChange}
        onSearchValueChange={handleSearchValueChange}
        onRegionChange={handleRegionChange}
      />

      <div className="flex justify-center mb-6">
        <button
          onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
          className="px-4 py-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition"
        >
          {showFavoritesOnly ? (
            "Show All"
          ) : (
            <div className="flex items-center gap-2">
              Show Favorites <FaHeart />
            </div>
          )}
        </button>
      </div>

      {error && <p className="text-red-500 text-center">{error}</p>}
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <img src="/icons8-globe.gif" alt="Loading..." className="w-16 h-16" />
        </div>
      ) : (
        <>
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {paginatedCountries.map((country) => (
              <CountryCard key={country.cca3} country={country} />
            ))}
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-center mt-8">
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              className="px-4 py-2 mx-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition disabled:opacity-50"
            >
              <FiArrowLeftCircle />
            </button>
            <span className="flex items-center justify-center text-lg">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="px-4 py-2 mx-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition disabled:opacity-50"
            >
              <FiArrowRightCircle />
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default HomePage;
