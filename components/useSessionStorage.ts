import { data } from "../data";
import { InvoiceProps } from "../pages";

export const useSessionStorage = () => {
  const setItem = (value: InvoiceProps) => {
    window.sessionStorage.setItem("singleItem", JSON.stringify(value));
  };

  const getItem = () => {
    const data = window.sessionStorage.getItem("singleItem");
    return JSON.parse(data);
  };

  const setAllItems = () => {
    if (getItem()) return;
    window.sessionStorage.setItem("allItems", JSON.stringify(data));
  };

  const getAllItems = () => {
    const data = window.sessionStorage.getItem("allItems");
    return JSON.parse(data);
  };

  const updateAllItems = () => {
    const allItems = getAllItems();
    const item = getItem();

    const index = allItems.findIndex((invoice: InvoiceProps) => invoice.id === item.id);
    allItems[index] = item;
    window.sessionStorage.setItem("allItems", JSON.stringify(allItems));
  }

  return { setItem, getItem, setAllItems, getAllItems, updateAllItems };
};
