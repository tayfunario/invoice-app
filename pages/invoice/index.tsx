import { useEffect, useState, useRef } from "react";
import { useSessionStorage } from "../../components/useSessionStorage";
import Image from "next/image";
import { InvoiceProps } from "../index";
import Link from "next/link";
import Edit from "../../components/Edit";
import DeletionConfirmation from "../../components/DeletionConfirmation";
import Header from "../../components/Header";
import { useWindowSize } from "../../components/useWindowSize";

export default function Index() {
  const [windowInvoice, setWindowInvoice] = useState<InvoiceProps | null>(null);
  const [edit, setEdit] = useState<boolean>(false);
  const [deletion, setDeletion] = useState<boolean>(false);
  const { getItem, markAsPaid } = useSessionStorage();
  const { windowSize } = useWindowSize();
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

  return windowSize.width > 768 ? (
    <>
      {edit && <Edit handleEdit={handleEdit} windowInvoice={windowInvoice} />}
      <Header />
      <div className="py-10 xl:px-64 lg:px-36 md:px-12 sm:px-8 px-6 bg-lightBG dark:bg-black2">
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

        {/* status div */}
        <div className="flex justify-between items-center bg-white dark:bg-dark py-3 px-5 mt-5 mx-6 rounded-md">
          <div className="flex items-center gap-x-6">
            <span className="text-fadedPurple dark:text-lightGray text-sm">
              Status
            </span>
            <div
              data-cy="status-div"
              ref={statusRef}
              className={`flex justify-center items-center w-24 h-10 gap-x-1 font-semibold capitalize ${
                colors[windowInvoice?.status]
              } rounded-md dark:bg-transparent capitalize`}
            >
              <span className="text-xl">•</span> {windowInvoice?.status}
            </div>
          </div>

          <div className="flex justify-center items-center py-3 bg-white dark:bg-dark">
            <button className="button-3" onClick={() => setEdit(!edit)}>
              Edit
            </button>
            <button
              data-cy="delete-btn"
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
        </div>

        {/* details div */}
        <div className="bg-white dark:bg-dark md:px-8 md:pt-10 p-4 mt-10 mx-6 rounded-md shadow-md">
          {/* top */}
          <div className="col-span-2 flex justify-between">
            <div>
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
              className="col-span-2 text-fadedPurple dark:text-lightGray"
            >
              <p className="text-sm">{windowInvoice?.senderAddress.street}</p>
              <p className="text-sm">{windowInvoice?.senderAddress.city}</p>
              <p className="text-sm">{windowInvoice?.senderAddress.postCode}</p>
              <p className="text-sm">{windowInvoice?.senderAddress.country}</p>
            </div>
          </div>

          {/* middle */}
          <div className="grid grid-cols-3 mt-3">
            <div id="date" className="text-black1 dark:text-white">
              <p className="text-fadedPurple dark:text-lightGray text-sm">
                Invoice Date
              </p>
              <p className="font-bold">
                {formatDate(windowInvoice?.createdAt)}
              </p>
              <p className="mt-3 text-fadedPurple dark:text-lightGray text-sm">
                Payment Due
              </p>
              <p className="font-bold">
                {formatDate(windowInvoice?.paymentDue)}
              </p>
            </div>

            <div id="to" className="text-fadedPurple dark:text-lightGray">
              <p className="text-sm">Bill To</p>
              <p className="font-bold text-black1 dark:text-white">
                {windowInvoice?.clientName}
              </p>
              <div id="address" className="mt-1">
                <p className="text-sm">{windowInvoice?.clientAddress.street}</p>
                <p className="text-sm">{windowInvoice?.clientAddress.city}</p>
                <p className="text-sm">
                  {windowInvoice?.clientAddress.postCode}
                </p>
                <p className="text-sm">
                  {windowInvoice?.clientAddress.country}
                </p>
              </div>
            </div>

            <div id="sentto" className="">
              <p className="text-fadedPurple dark:text-lightGray text-sm">
                Sent To
              </p>
              <p className="font-bold text-black1 dark:text-white">
                {windowInvoice?.clientEmail}
              </p>
            </div>
          </div>

          {/* sum */}
          <ul className="mt-5 pt-5 bg-[#F9FAFE] dark:bg-darkBlue rounded-t-md">
            <div className="flex justify-between px-5 mb-4 text-fadedPurple dark:text-lightGray">
              <span className="grow text-sm">Item Name</span>
              <div className="grow grid grid-cols-3">
                <span className="text-center text-sm">QTY.</span>
                <span className="text-end text-sm">Price</span>
                <span className="text-end text-sm">Total</span>
              </div>
            </div>

            {windowInvoice?.items.map((item, index) => (
              <li key={index} className="flex justify-between px-5 mb-4">
                <h3 className="basis-1/2 dark:text-white font-bold">
                  {item.name}
                </h3>

                <div className="basis-1/2 grid grid-cols-3">
                  <span className="text-fadedPurple dark:text-lightGray text-center font-bold">
                    {item.quantity}
                  </span>
                  <span className="text-fadedPurple dark:text-lightGray text-end font-bold">
                    £ {item.price.toFixed(2)}
                  </span>

                  <span className="text-end text-black1 dark:text-white font-bold">
                    £ {item.total.toFixed(2)}
                  </span>
                </div>
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
      </div>
    </>
  ) : edit ? (
    <Edit handleEdit={handleEdit} windowInvoice={windowInvoice} />
  ) : (
    <>
      <Header />
      <div className="py-10 xl:px-64 lg:px-36 md:px-20 sm:px-8 px-6 bg-lightBG dark:bg-black2">
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

        <div className="grid grid-cols-2 bg-white dark:bg-dark p-4 mt-10 mx-6 rounded-md shadow-md">
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
                <p className="text-black1 dark:text-white font-bold">
                  £ {item.total.toFixed(2)}
                </p>
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
      </div>

      <div className="flex justify-center items-center py-3 bg-white dark:bg-dark">
        <button className="button-3" onClick={() => setEdit(!edit)}>
          Edit
        </button>
        <button className="button-5" onClick={() => handleDeletion(true)}>
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
    </>
  );
}
