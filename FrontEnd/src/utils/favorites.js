// Utility for managing favorite product IDs in localStorage

const FAVORITES_KEY = 'favorite_spare_parts';

export function getFavorites() {
  try {
    return JSON.parse(localStorage.getItem(FAVORITES_KEY)) || [];
  } catch {
    return [];
  }
}

export function addFavorite(id) {
  const favs = getFavorites();
  if (!favs.includes(id)) {
    favs.push(id);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favs));
  }
}

export function removeFavorite(id) {
  const favs = getFavorites().filter(favId => favId !== id);
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favs));
}

export function isFavorite(id) {
  return getFavorites().includes(id);
}

export function toggleFavorite(id) {
  if (isFavorite(id)) {
    removeFavorite(id);
  } else {
    addFavorite(id);
  }
} 