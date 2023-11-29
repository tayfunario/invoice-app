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

    const index = allItems.findIndex(
      (invoice: InvoiceProps) => invoice.id === item.id
    );
    allItems[index] = item;
    window.sessionStorage.setItem("allItems", JSON.stringify(allItems));
  };

  const markAsPaid = () => {
    const allItems = getAllItems();
    const item = getItem();
    const index = allItems.findIndex(
      (invoice: InvoiceProps) => invoice.id === item.id
    );
    allItems[index].status = "paid";
    window.sessionStorage.setItem("allItems", JSON.stringify(allItems));
    window.sessionStorage.setItem(
      "singleItem",
      JSON.stringify(allItems[index])
    );
  };

  const removeItem = () => {
    const allItems = getAllItems();
    const item = getItem();

    const index = allItems.findIndex((elem) => elem.id === item.id);

    allItems.splice(index, 1);
    window.sessionStorage.setItem("allItems", JSON.stringify(allItems));
  };

  return {
    setItem,
    getItem,
    setAllItems,
    getAllItems,
    updateAllItems,
    markAsPaid,
    removeItem,
  };
};
