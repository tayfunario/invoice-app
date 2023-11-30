import Link from "next/link";
import Image from "next/image";
import Header from "./Header";
import { useState, useRef } from "react";
import Input from "./Input";

interface CreateInvoiceProps {
  handleCreate: (val: boolean) => void;
}

function CreateInvoice({ handleCreate }: CreateInvoiceProps) {
  const [paymentTerms, setPaymentTerms] = useState<number>();
  const allFieldAlert = useRef<HTMLParagraphElement>();

  const hideSpan = (elem: HTMLInputElement) => {
    elem.previousElementSibling.classList.remove("block");
    elem.previousElementSibling.classList.add("hidden");
    elem.classList.remove("border-red");

    allFieldAlert.current.classList.remove("visible");
    allFieldAlert.current.classList.add("invisible");
  };

  const handlePaymentTerms = (value: number) => {
    setPaymentTerms(value);
  };

  return (
    <div className="w-full h-screen">
      <Header />

      <Link
        href="/"
        className="flex justify-start items-baseline gap-x-4 mt-8 font-bold px-6"
        onClick={() => handleCreate(false)}
      >
        <Image
          src="/icon-arrow-left.svg"
          alt="left arrow"
          width={7}
          height={7}
        />
        Go back
      </Link>

      <form
        id="form1"
        className="mt-5 mx-5 pb-32"
        onSubmit={(e) => e.preventDefault()}
      >
        <h2 className="font-bold text-2xl tracking-tight">New Invoice</h2>

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
              maxLength={30}
              className="custom-input"
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
                maxLength={20}
                className="custom-input"
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
                maxLength={10}
                className="custom-input"
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
              maxLength={20}
              className="custom-input"
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
              maxLength={20}
              className="custom-input"
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
              maxLength={35}
              className="custom-input"
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
              maxLength={25}
              className="custom-input"
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
                maxLength={20}
                className="custom-input"
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
                maxLength={10}
                className="custom-input"
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
              maxLength={20}
              className="custom-input"
              onChange={(e) => hideSpan(e.target)}
            />
          </div>

          <label
            className="block mt-10 text-fadedPurple text-sm"
            htmlFor="date"
          >
            Invoice Date
          </label>
          <input type="date" id="date" className="custom-input" />

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
              className="custom-input"
              onChange={(e) => hideSpan(e.target)}
            />
          </div>
        </fieldset>
      </form>

      <div className="fixed bottom-0 flex justify-end items-center gap-x-2 w-full h-20 px-5 custom-shadow bg-white">
        <button className="button-3" onClick={() => handleCreate(false)}>
          Cancel
        </button>
        <button className="button-2">Save Changes</button>
      </div>
    </div>
  );
}

export default CreateInvoice;
