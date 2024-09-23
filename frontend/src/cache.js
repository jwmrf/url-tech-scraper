export function loadCache() {
    try {
      const data = localStorage.getItem('cache');
      return JSON.parse(data);
    } catch (error) {
      return {};
    }
  }
  
  export function saveCache(data) {
    localStorage.setItem('cache', JSON.stringify(data));
  }