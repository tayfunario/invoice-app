import { useEffect, useState, useRef } from "react";
import { useSessionStorage } from "../../components/useSessionStorage";
import Layout from "../../components/Layout";
import Image from "next/image";
import { InvoiceProps } from "../index";
import Link from "next/link";
import Edit from "../../components/Edit";
import DeletionConfirmation from "../../components/DeletionConfirmation";

export default function Index() {
  const [windowInvoice, setWindowInvoice] = useState<InvoiceProps | null>(null);
  const [edit, setEdit] = useState<boolean>(false);
  const [deletion, setDeletion] = useState<boolean>(false);
  const { getItem, markAsPaid } = useSessionStorage();
  const statusRef = useRef<HTMLDivElement>(null);
  const colors: {
    [key: string]: string;
  } = {
    pending: "bg-orange-100 text-orange-500",
    paid: "bg-green-100 text-green-500",
    draft: "bg-gray-100 text-gray-500 dark:text-lightGray",
  };

  useEffect(() => {
    setWindowInvoice(getItem());
  }, [edit]);

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const handleDeletion = (value: boolean) => setDeletion(value);

  const handleEdit = () => setEdit(false);

  const handlePaidButton = () => {
    markAsPaid();
    statusRef.current.classList.remove("bg-orange-100", "text-orange-500");
    statusRef.current.classList.add("bg-green-100", "text-green-500");
    statusRef.current.innerHTML = `<span class="text-xl">•</span> Paid`;
  };

  return edit ? (
    <Edit handleEdit={handleEdit} windowInvoice={windowInvoice} />
  ) : (
    <Layout>
      {deletion && (
        <DeletionConfirmation
          handleDeletion={handleDeletion}
          id={windowInvoice?.id}
        />
      )}
      <Link
        href="/"
        className="flex justify-start items-baseline gap-x-4 dark:text-white font-bold px-6"
      >
        <Image
          src="/icon-arrow-left.svg"
          alt="left arrow"
          width={7}
          height={7}
        />
        Go back
      </Link>

      <div className="flex justify-between items-center bg-white dark:bg-dark py-6 px-5 mt-5 mx-6 rounded-md">
        <span className="text-fadedPurple dark:text-lightGray text-sm">
          Status
        </span>
        <div
          ref={statusRef}
          className={`flex justify-center items-center w-24 h-10 gap-x-1 font-semibold capitalize ${
            colors[windowInvoice?.status]
          } rounded-md dark:bg-transparent`}
        >
          <span className="text-xl">•</span> {windowInvoice?.status}
        </div>
      </div>

      <div className="grid grid-cols-2 bg-white dark:bg-dark p-4 my-10 mx-6 rounded-md shadow-md">
        <div className="col-span-2">
          <span className="text-fadedPurple">
            #
            <span className="font-bold text-black dark:text-white">
              {windowInvoice?.id}
            </span>
          </span>
          <p className="text-fadedPurple dark:text-lightGray text-sm">
            {windowInvoice?.description}
          </p>
        </div>

        <div
          id="address"
          className="col-span-2 mt-5 text-fadedPurple dark:text-lightGray"
        >
          <p className="text-sm">{windowInvoice?.senderAddress.street}</p>
          <p className="text-sm">{windowInvoice?.senderAddress.city}</p>
          <p className="text-sm">{windowInvoice?.senderAddress.postCode}</p>
          <p className="text-sm">{windowInvoice?.senderAddress.country}</p>
        </div>

        <div id="date" className="text-black1 dark:text-white mt-5">
          <p className="text-fadedPurple dark:text-lightGray text-sm">
            Invoice Date
          </p>
          <p className="font-bold">{formatDate(windowInvoice?.createdAt)}</p>
          <p className="mt-3 text-fadedPurple dark:text-lightGray text-sm">
            Payment Due
          </p>
          <p className="font-bold">{formatDate(windowInvoice?.paymentDue)}</p>
        </div>

        <div id="to" className="mt-5 text-fadedPurple dark:text-lightGray">
          <p className="text-sm">Bill To</p>
          <p className="font-bold text-black1 dark:text-white">
            {windowInvoice?.clientName}
          </p>
          <div id="address" className="mt-1">
            <p className="text-sm">{windowInvoice?.clientAddress.street}</p>
            <p className="text-sm">{windowInvoice?.clientAddress.city}</p>
            <p className="text-sm">{windowInvoice?.clientAddress.postCode}</p>
            <p className="text-sm">{windowInvoice?.clientAddress.country}</p>
          </div>
        </div>

        <div id="sentto" className="mt-3">
          <p className="text-fadedPurple dark:text-lightGray text-sm">
            Sent To
          </p>
          <p className="font-bold text-black1 dark:text-white">
            {windowInvoice?.clientEmail}
          </p>
        </div>

        <ul className="col-span-2 mt-5 pt-5 bg-[#F9FAFE] dark:bg-darkBlue rounded-t-md">
          {windowInvoice?.items.map((item, index) => (
            <li
              key={index}
              className="flex justify-between items-center px-5 mb-4"
            >
              <div>
                <h3 className="dark:text-white font-bold">{item.name}</h3>
                <p className="font-bold text-fadedPurple dark:text-darkerGray">
                  {item.quantity} x £ {item.price.toFixed(2)}{" "}
                </p>
              </div>
              <p className="text-black1 dark:text-white font-bold">£ {item.total.toFixed(2)}</p>
            </li>
          ))}
          <div
            id="total"
            className="flex justify-between items-center p-5 text-white bg-[#373B53] dark:bg-black1 rounded-b-md"
          >
            <p className="text-sm">Grand Total</p>
            <p className="font-bold text-2xl">
              £ {windowInvoice?.total.toFixed(2)}
            </p>
          </div>
        </ul>
      </div>

      <div className="flex justify-center py-5 bg-white dark:bg-dark">
        <button
          className="button-3"
          onClick={() => setEdit(!edit)}
        >
          Edit
        </button>
        <button
          className="button-5"
          onClick={() => handleDeletion(true)}
        >
          Delete
        </button>
        <button
          disabled={
            windowInvoice?.status === "paid" ||
            windowInvoice?.status === "draft"
          }
          className={`px-5 py-3 mx-1 ${
            windowInvoice?.status === "paid" ||
            windowInvoice?.status === "draft"
              ? "bg-gray-500"
              : "bg-customPurple hover:bg-customPurple2"
          } text-white text-sm font-semibold rounded-3xl`}
          onClick={() => handlePaidButton()}
        >
          Mark as paid
        </button>
      </div>
    </Layout>
  );
}
