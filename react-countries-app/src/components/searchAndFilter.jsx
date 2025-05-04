import { useState } from "react";

function SearchFilter({
  onSearchTypeChange,
  onSearchValueChange,
  onRegionChange,
}) {
  const [searchType, setSearchType] = useState("name");

  const handleSearchTypeChange = (e) => {
    const type = e.target.value;
    setSearchType(type);
    onSearchTypeChange(type);
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center mb-10 gap-4">
      {/* Search Type Dropdown */}
      <select
        value={searchType}
        onChange={handleSearchTypeChange}
        className="p-3 border border-gray-300 rounded-md w-full sm:w-1/4 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
      >
        <option value="name">Name</option>
        <option value="fullName">Full Name</option>
        <option value="capital">Capital</option>
        <option value="currency">Currency</option>
        <option value="language">Language</option>
        <option value="demonym">Demonym</option>
        <option value="code">Country Code</option>
        <option value="translation">Translation</option>
        <option value="subregion">Subregion</option>
      </select>

      {/* Search Value Input */}
      <input
        type="text"
        placeholder={`🔍 Search by ${searchType}...`}
        onChange={(e) => onSearchValueChange(e.target.value)}
        className="p-3 border border-gray-300 rounded-md w-full sm:w-1/2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
      />

      {/* Region Dropdown */}
      <select
        onChange={(e) => onRegionChange(e.target.value)}
        className="p-3 border border-gray-300 rounded-md w-full sm:w-1/4 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
      >
        <option value="">🌐 Filter by Region</option>
        <option value="Africa">Africa</option>
        <option value="Americas">Americas</option>
        <option value="Asia">Asia</option>
        <option value="Europe">Europe</option>
        <option value="Oceania">Oceania</option>
      </select>
    </div>
  );
}

export default SearchFilter;
