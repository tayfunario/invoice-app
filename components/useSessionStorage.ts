import { InvoiceProps } from "../pages";
import { data } from "../data";

export const useSessionStorage = () => {
  const setItem = (value: InvoiceProps) => {
    window.sessionStorage.setItem("single", JSON.stringify(value));
  };

  const setInitial = (value: any) => {
    if (!getInitial())
      window.sessionStorage.setItem(value, JSON.stringify(data));
  };

  const getItem = () => {
    const data = window.sessionStorage.getItem("single");
    return JSON.parse(data);
  };

  const getInitial = () => {
    const data = window.sessionStorage.getItem("initial");
    return JSON.parse(data);
  };

  return { setItem, setInitial, getItem, getInitial };
};
