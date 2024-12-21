export const saveToStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const loadFromStorage = (key) => {
  return JSON.parse(localStorage.getItem(key)) || [];
};

export const saveToSession = (key, value) => {
  sessionStorage.setItem(key, JSON.stringify(value));
};

export const loadFromSession = (key) => {
  return JSON.parse(sessionStorage.getItem(key)) || [];
};
