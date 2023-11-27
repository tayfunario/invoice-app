import { InvoiceProps } from "../pages";

export const useSessionStorage = (key: string) => {
  const setItem = (value: InvoiceProps) => {
    window.sessionStorage.setItem(key, JSON.stringify(value));
  };

  const getItem = () => {
    const data = window.sessionStorage.getItem(key);
    return JSON.parse(data);
  };

  return { setItem, getItem };
};
