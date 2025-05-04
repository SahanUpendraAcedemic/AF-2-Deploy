function SearchFilter({ onSearch, onRegionChange }) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-center mb-10 gap-4">
      {/* Search Input */}
      <input
        type="text"
        placeholder="🔍 Search by country name..."
        onChange={(e) => onSearch(e.target.value)}
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
