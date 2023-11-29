import { useState, useEffect, useRef } from "react";
import Header from "./Header";
import Input from "./Input";
import { InvoiceProps } from "../pages/index";
import { MdDelete } from "react-icons/md";
import { useSessionStorage } from "./useSessionStorage";

interface EditProps {
  handleEdit: () => void;
  windowInvoice: InvoiceProps | null;
}

interface ItemArrayProps {
  name: string;
  quantity: number;
  price: number;
  total: number;
}

function Edit({ handleEdit, windowInvoice }: EditProps) {
  const [items, setItems] = useState<ItemArrayProps[]>(windowInvoice?.items);
  const [inputs, setInputs] = useState<HTMLCollectionOf<HTMLInputElement>>(
    document.getElementsByTagName("input")
  );
  const [paymentTerms, setPaymentTerms] = useState<number>(
    windowInvoice?.paymentTerms
  );
  const { setItem, updateAllItems } = useSessionStorage();
  const allFieldAlert = useRef<HTMLParagraphElement>();
  const itemAlert = useRef<HTMLParagraphElement>();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    refreshBorder();
    setInputs(document.getElementsByTagName("input"));
  }, [items]);

  const handlePaymentTerms = (value: number) => {
    setPaymentTerms(value);
  };

  const refreshBorder = () => {
    for (let input of inputs) {
      input.classList.remove("border-red");
    }

    const spans = document.querySelectorAll("span");
    for (let span of spans) {
      span.classList.remove("text-green-600");
    }
  };

  const handleQtyChange = (value: string, index: number) => {
    const list = [...items];
    list[index].quantity = Number(value);
    list[index].total = Number(value) * list[index].price;
    setItems(list);
  };

  const handlePriceChange = (value: string, index: number) => {
    const list = [...items];
    list[index].price = Number(value);
    list[index].total = Number(value) * list[index].quantity;
    setItems(list);
  };

  const addNewItem = () => {
    setItems([...items, { name: "New Item", quantity: 1, price: 0, total: 0 }]);
  };

  const removeItem = (index: number) => {
    const list = [...items];
    list.splice(index, 1);
    setItems(list);
  };

  const showSpan = (elem: HTMLInputElement) => {
    elem.previousElementSibling.classList.remove("hidden");
    elem.previousElementSibling.classList.add("block");

    allFieldAlert.current.classList.remove("invisible");
    allFieldAlert.current.classList.add("visible");
  };

  const hideSpan = (elem: HTMLInputElement) => {
    elem.previousElementSibling.classList.remove("block");
    elem.previousElementSibling.classList.add("hidden");
    elem.classList.remove("border-red");

    allFieldAlert.current.classList.remove("visible");
    allFieldAlert.current.classList.add("invisible");
  };

  const save = () => {
    let save: boolean = true;
    outerLoop: for (let input of inputs) {
      switch (input.type) {
        case "text":
          const val = input.value.trim();
          if (val.length === 0) {
            input.classList.add("border-red");
            showSpan(input);
            save = false;
            break outerLoop;
          }
          break;
        case "email":
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(input.value)) {
            input.classList.add("border-red");
            showSpan(input);
            save = false;
            break outerLoop;
          }
          break;
        case "number":
          if (Number(input.value) <= 0) {
            input.classList.add("border-red");
            save = false;
            break outerLoop;
          }
          break;
        default:
          break;
      }
    }
    if (save) {
      writeSessionStorage();
      handleEdit();
    }
  };

  const writeSessionStorage = () => {
    const createdAtInput = document.getElementById("date") as HTMLInputElement;
    const createdAt = createdAtInput.value;

    const paymentDue = (): string => {
      const date = new Date(createdAt);
      date.setDate(date.getDate() + paymentTerms);
      return date.toString();
    };

    const descriptionInput = document.getElementById(
      "description"
    ) as HTMLInputElement;
    const description = descriptionInput.value;

    const clientNameInput = document.getElementById(
      "client-name"
    ) as HTMLInputElement;
    const clientName = clientNameInput.value;

    const clientEmailInput = document.getElementById(
      "client-email"
    ) as HTMLInputElement;
    const clientEmail = clientEmailInput.value;

    const senderStreetInput = document.getElementById(
      "street"
    ) as HTMLInputElement;
    const senderStreet = senderStreetInput.value;

    const senderCityInput = document.getElementById("city") as HTMLInputElement;
    const senderCity = senderCityInput.value;

    const senderPostCodeInput = document.getElementById(
      "post-code"
    ) as HTMLInputElement;
    const senderPostCode = senderPostCodeInput.value;

    const senderCountryInput = document.getElementById(
      "country"
    ) as HTMLInputElement;
    const senderCountry = senderCountryInput.value;

    const toStreetInput = document.getElementById(
      "tostreet"
    ) as HTMLInputElement;
    const toStreet = toStreetInput.value;

    const toCityInput = document.getElementById("tocity") as HTMLInputElement;
    const toCity = toCityInput.value;

    const toPostcodeInput = document.getElementById(
      "topost-code"
    ) as HTMLInputElement;
    const toPostcode = toPostcodeInput.value;

    const toCountryInput = document.getElementById(
      "tocountry"
    ) as HTMLInputElement;
    const toCountry = toCountryInput.value;

    const total: number = items.reduce((sum, item) => sum + item.total, 0);

    const invoice: InvoiceProps = {
      id: windowInvoice?.id,
      createdAt,
      paymentDue: paymentDue(),
      description,
      paymentTerms,
      clientName,
      clientEmail,
      status: "pending",
      senderAddress: {
        street: senderStreet,
        city: senderCity,
        postCode: senderPostCode,
        country: senderCountry,
      },
      clientAddress: {
        street: toStreet,
        city: toCity,
        postCode: toPostcode,
        country: toCountry,
      },
      items,
      total,
    };
    setItem(invoice);
    updateAllItems();
  };

  return (
    <div className="w-full h-screen top-0 bg-white">
      <Header />

      <form
        id="form1"
        className="mt-10 mx-5 pb-32"
        onSubmit={(e) => e.preventDefault()}
      >
        <h2 className="font-bold text-2xl">
          Edit <span className="text-darkerGray">#</span>
          {windowInvoice?.id}
        </h2>

        <fieldset className="mt-5">
          <legend className="font-bold text-customPurple">Bill From</legend>

          <div className="flex flex-wrap items-center justify-between mt-5">
            <label className="block text-fadedPurple text-sm" htmlFor="street">
              Street Address
            </label>
            <span className="hidden text-red text-xs">can't be empty</span>
            <input
              id="street"
              type="text"
              defaultValue={windowInvoice?.senderAddress.street}
              maxLength={30}
              className="w-full basis-full h-10 font-bold text-[15px] px-3 rounded-md border border-lightGray focus:outline-none focus:border-customPurple"
              onChange={(e) => hideSpan(e.target)}
            />
          </div>

          <div className="flex gap-x-4">
            <div className="flex flex-wrap items-center justify-between mt-5">
              <label className="block text-fadedPurple text-sm" htmlFor="city">
                City
              </label>
              <span className="hidden text-red text-xs">can't be empty</span>
              <input
                id="city"
                type="text"
                defaultValue={windowInvoice?.senderAddress.city}
                maxLength={20}
                className="w-full basis-full h-10 font-bold text-[15px] px-3 rounded-md border border-lightGray focus:outline-none focus:border-customPurple"
                onChange={(e) => hideSpan(e.target)}
              />
            </div>
            <div className="flex flex-wrap items-center justify-between mt-5">
              <label
                className="block text-fadedPurple text-sm"
                htmlFor="post-code"
              >
                Post Code
              </label>
              <span className="hidden text-red text-xs">can't be empty</span>
              <input
                id="post-code"
                type="text"
                defaultValue={windowInvoice?.senderAddress.postCode}
                maxLength={10}
                className="w-full basis-full h-10 font-bold text-[15px] px-3 rounded-md border border-lightGray focus:outline-none focus:border-customPurple"
                onChange={(e) => hideSpan(e.target)}
              />
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between mt-5">
            <label className="block text-fadedPurple text-sm" htmlFor="country">
              Country
            </label>
            <span className="hidden text-red text-xs">can't be empty</span>
            <input
              id="country"
              type="text"
              defaultValue={windowInvoice?.senderAddress.country}
              maxLength={20}
              className="w-full basis-full h-10 font-bold text-[15px] px-3 rounded-md border border-lightGray focus:outline-none focus:border-customPurple"
              onChange={(e) => hideSpan(e.target)}
            />
          </div>
        </fieldset>

        <fieldset className="mt-10">
          <legend className="font-bold text-customPurple">Bill To</legend>

          <div className="flex flex-wrap items-center justify-between mt-5">
            <label
              className="block text-fadedPurple text-sm"
              htmlFor="client-name"
            >
              Client's Name
            </label>
            <span className="hidden text-red text-xs">can't be empty</span>
            <input
              id="client-name"
              type="text"
              defaultValue={windowInvoice?.clientName}
              maxLength={20}
              className="w-full h-10 font-bold text-[15px] px-3 rounded-md border border-lightGray focus:outline-none focus:border-customPurple"
              onChange={(e) => hideSpan(e.target)}
            />
          </div>

          <div className="flex flex-wrap items-center justify-between mt-5">
            <label
              className="block text-fadedPurple text-sm"
              htmlFor="client-email"
            >
              Client's Email
            </label>
            <span className="hidden text-red text-xs">
              can't be empty or invalid
            </span>
            <input
              id="client-email"
              type="email"
              defaultValue={windowInvoice?.clientEmail}
              maxLength={35}
              className="w-full h-10 font-bold text-[15px] px-3 rounded-md border border-lightGray focus:outline-none focus:border-customPurple"
              onChange={(e) => hideSpan(e.target)}
            />
          </div>

          <div className="flex flex-wrap items-center justify-between mt-5">
            <label
              className="block text-fadedPurple text-sm"
              htmlFor="tostreet"
            >
              Street Address
            </label>
            <span className="hidden text-red text-xs">can't be empty</span>
            <input
              id="tostreet"
              type="text"
              defaultValue={windowInvoice?.clientAddress.street}
              maxLength={25}
              className="w-full h-10 font-bold text-[15px] px-3 rounded-md border border-lightGray focus:outline-none focus:border-customPurple"
              onChange={(e) => hideSpan(e.target)}
            />
          </div>

          <div className="flex gap-x-4">
            <div className="flex basis-1/2 flex-wrap items-center justify-between mt-5">
              <label
                className="block text-fadedPurple text-sm"
                htmlFor="tocity"
              >
                City
              </label>
              <span className="hidden text-red text-xs">can't be empty</span>
              <input
                id="tocity"
                type="text"
                defaultValue={windowInvoice?.clientAddress.city}
                maxLength={20}
                className="w-full h-10 font-bold text-[15px] px-3 rounded-md border border-lightGray focus:outline-none focus:border-customPurple"
                onChange={(e) => hideSpan(e.target)}
              />
            </div>
            <div className="flex basis-1/2 flex-wrap items-center justify-between mt-5">
              <label
                className="block text-fadedPurple text-sm"
                htmlFor="topost-code"
              >
                Post Code
              </label>
              <span className="hidden text-red text-xs">can't be empty</span>
              <input
                id="topost-code"
                type="text"
                defaultValue={windowInvoice?.clientAddress.postCode}
                maxLength={10}
                className="w-full h-10 font-bold text-[15px] px-3 rounded-md border border-lightGray focus:outline-none focus:border-customPurple"
                onChange={(e) => hideSpan(e.target)}
              />
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between mt-5">
            <label
              className="block text-fadedPurple text-sm"
              htmlFor="tocountry"
            >
              Country
            </label>
            <span className="hidden text-red text-xs">can't be empty</span>
            <input
              id="tocountry"
              type="text"
              defaultValue={windowInvoice?.clientAddress.country}
              maxLength={20}
              className="w-full h-10 font-bold text-[15px] px-3 rounded-md border border-lightGray focus:outline-none focus:border-customPurple"
              onChange={(e) => hideSpan(e.target)}
            />
          </div>

          <label
            className="block mt-10 text-fadedPurple text-sm"
            htmlFor="date"
          >
            Invoice Date
          </label>
          <input
            disabled
            type="date"
            id="date"
            defaultValue={windowInvoice?.createdAt}
            className="w-full h-10 font-bold text-[15px] px-3 rounded-md border border-lightGray focus:outline-none focus:border-customPurple"
          />

          <label
            id="payment-terms-label"
            className="block mt-5 text-fadedPurple text-sm"
          >
            Payment Terms
          </label>
          <Input
            paymentTerms={paymentTerms}
            handlePaymentTerms={handlePaymentTerms}
          />

          <div className="flex flex-wrap items-center justify-between mt-5">
            <label
              className="block text-fadedPurple text-sm"
              htmlFor="description"
            >
              Project Description
            </label>
            <span className="hidden text-red text-xs">can't be empty</span>
            <input
              id="description"
              type="text"
              defaultValue={windowInvoice?.description}
              className="w-full h-10 font-bold text-[15px] px-3 rounded-md border border-lightGray focus:outline-none focus:border-customPurple"
              onChange={(e) => hideSpan(e.target)}
            />
          </div>
        </fieldset>

        <fieldset className="mt-10">
          <legend className="font-bold text-customPurple">Item List</legend>

          {items.map((item, index) => (
            <div key={item.name} className="mb-12">
              <div className="flex flex-wrap items-center justify-between mt-5">
                <label
                  key={index}
                  className="block mb-2 text-fadedPurple text-sm"
                  htmlFor={`item-${index + 1}`}
                >
                  Item Name
                </label>
                <span className="hidden text-red text-xs">can't be empty</span>
                <input
                  id={`item-${index + 1}`}
                  type="text"
                  defaultValue={item.name}
                  className="w-full h-10 font-bold text-[15px] px-3 rounded-md border border-lightGray focus:outline-none focus:border-customPurple"
                  onChange={(e) => hideSpan(e.target)}
                />
              </div>

              <div className="grid grid-cols-6 gap-x-2 mt-5">
                <div>
                  <label
                    className="block mb-1 text-fadedPurple text-sm"
                    htmlFor={`quantity-${index + 1}`}
                  >
                    Qty.
                  </label>
                  <input
                    type="number"
                    id={`quantity-${index + 1}`}
                    defaultValue={item.quantity}
                    className="w-full h-10 font-bold text-[15px] px-3 rounded-md border border-lightGray focus:outline-none focus:border-customPurple"
                    onChange={(e) => handleQtyChange(e.target.value, index)}
                  />
                </div>

                <div className="col-span-2">
                  <label
                    className="block mb-1 text-fadedPurple text-sm"
                    htmlFor={`price-${index + 1}`}
                  >
                    Price
                  </label>
                  <input
                    type="number"
                    id={`price-${index + 1}`}
                    defaultValue={item.price}
                    className="w-full h-10 font-bold text-[15px] px-3 rounded-md border border-lightGray focus:outline-none focus:border-customPurple"
                    onChange={(e) => handlePriceChange(e.target.value, index)}
                  />
                </div>

                <div className="col-span-2">
                  <p className="mb-1 text-fadedPurple text-sm">Total</p>
                  <div className="flex items-center h-10 text-darkerGray font-bold text-[15px]">
                    {item.total.toFixed(2)}
                  </div>
                </div>

                <button
                  className="remove-item-btn grid place-items-center self-center h-10"
                  onClick={() => removeItem(index)}
                >
                  <MdDelete className="remove-icon w-6 h-6 text-darkerGray" />
                </button>
              </div>
            </div>
          ))}

          <button
            className="flex justify-center items-center gap-x-2 w-full mt-10 text-[15px] font-bold rounded-3xl bg-lightBG text-fadedPurple py-[14px] px-4 tracking-tight"
            onClick={() => addNewItem()}
          >
            <img src="/icon-plus.svg" />
            Add New Item
          </button>

          <p
            ref={allFieldAlert}
            className="invisible mt-7 text-red text-sm font-semibold"
          >
            -All fields must be added
          </p>
          {!items.length && (
            <p ref={itemAlert} className="text-red text-sm font-semibold">
              -An item must be added
            </p>
          )}
        </fieldset>
      </form>

      <div className="fixed bottom-0 flex justify-end items-center gap-x-2 w-full h-20 px-5 custom-shadow bg-white">
        <button
          className="text-sm font-semibold rounded-3xl bg-lightBG text-fadedPurple py-[14px] px-4 tracking-tight"
          onClick={handleEdit}
        >
          Cancel
        </button>
        <button
          className="text-sm font-semibold rounded-3xl bg-customPurple text-white py-[14px] px-4 tracking-tight"
          onClick={() => save()}
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}

export default Edit;
