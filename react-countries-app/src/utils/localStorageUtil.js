export const getFavorites = () => {
    const data = localStorage.getItem('favorites');
    return data ? JSON.parse(data) : [];
  };
  
  export const saveFavorites = (list) => {
    localStorage.setItem('favorites', JSON.stringify(list));
  };
  
  export const toggleFavorite = (code) => {
    const current = getFavorites();
    let updated;
    if (current.includes(code)) {
      updated = current.filter((item) => item !== code);
    } else {
      updated = [...current, code];
    }
    saveFavorites(updated);
    return updated;
  };
  