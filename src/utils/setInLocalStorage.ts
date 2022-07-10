export const setInLocalStorage = (key: string, localStorageItem: any) => {
  localStorage.setItem(key, JSON.stringify(localStorageItem));
}