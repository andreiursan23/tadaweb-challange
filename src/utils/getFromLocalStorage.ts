export const getFromLocalStorage = (localStorageKey: string) => {
  const value: any = localStorage.getItem(localStorageKey);
  return JSON.parse(value);
}