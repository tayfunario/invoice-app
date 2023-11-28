import { data } from "../../data";
import { useSessionStorage } from "../../components/useSessionStorage";
import Layout from "../../components/Layout";
import Image from "next/image";
import { useEffect, useState } from "react";
import { InvoiceProps } from "../index";
import Link from "next/link";
import Edit from "../../components/Edit";

export const getStaticPaths = async () => {
  const paths = data.map((invoice) => ({
    params: { slug: invoice.id },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async (context) => {
  const { slug } = context.params;
  return {
    props: { invoice: slug },
  };
};

export default function Slug({ invoice }) {
  const [windowInvoice, setWindowInvoice] = useState<InvoiceProps | null>(null);
  const [edit, setEdit] = useState<boolean>(false);
  const { getItem, setItem } = useSessionStorage("value");
  const formattedDate = new Date(windowInvoice?.paymentDue).toLocaleDateString(
    "en-GB",
    {
      day: "numeric",
      month: "short",
      year: "numeric",
    }
  );
  const colors: {
    [key: string]: string;
  } = {
    pending: "bg-orange-100 text-orange-500",
    paid: "bg-green-100 text-green-500",
    draft: "bg-gray-100 text-gray-500",
  };

  useEffect(() => {
    setWindowInvoice(getItem());
  }, [edit]);

  const handleEdit = () => setEdit(false);

  return edit ? (
    <Edit
      handleEdit={handleEdit}
      windowInvoice={windowInvoice}
      setWindow={setItem}
    />
  ) : (
    <Layout>
      <Link
        href="/"
        className="flex justify-start items-baseline gap-x-4 font-bold px-6"
      >
        <Image
          src="/icon-arrow-left.svg"
          alt="left arrow"
          width={7}
          height={7}
        />
        Go back
      </Link>

      <div className="flex justify-between items-center bg-white py-6 px-5 mt-5 mx-6 rounded-md">
        <span className="text-fadedPurple text-sm">Status</span>
        <div
          className={`flex justify-center items-center w-24 h-10 gap-x-1 font-semibold capitalize ${
            colors[windowInvoice?.status]
          } rounded-md`}
        >
          <span className="text-xl">•</span> {windowInvoice?.status}
        </div>
      </div>

      <div className="grid grid-cols-2 bg-white p-4 my-10 mx-6 rounded-md shadow-md">
        <div className="col-span-2">
          <span>
            #<span className="font-bold">{invoice}</span>
          </span>
          <p className="text-fadedPurple text-sm">
            {windowInvoice?.description}
          </p>
        </div>

        <div id="address" className="col-span-2 mt-5">
          <p className="text-fadedPurple text-sm">
            {windowInvoice?.senderAddress.street}
          </p>
          <p className="text-fadedPurple text-sm">
            {windowInvoice?.senderAddress.city}
          </p>
          <p className="text-fadedPurple text-sm">
            {windowInvoice?.senderAddress.postCode}
          </p>
          <p className="text-fadedPurple text-sm">
            {windowInvoice?.senderAddress.country}
          </p>
        </div>

        <div id="date" className="mt-5">
          <p className="text-fadedPurple text-sm">Invoice Date</p>
          <p className="font-bold">{windowInvoice?.createdAt}</p>
          <p className="mt-3 text-fadedPurple text-sm">Payment Due</p>
          <p className="font-bold">{windowInvoice?.paymentDue}</p>
        </div>

        <div id="to" className="mt-5">
          <p className="text-fadedPurple text-sm">Bill To</p>
          <p className="font-bold">{windowInvoice?.clientName}</p>
          <div id="address" className="mt-1">
            <p className="text-fadedPurple text-sm">
              {windowInvoice?.clientAddress.street}
            </p>
            <p className="text-fadedPurple text-sm">
              {windowInvoice?.clientAddress.city}
            </p>
            <p className="text-fadedPurple text-sm">
              {windowInvoice?.clientAddress.postCode}
            </p>
            <p className="text-fadedPurple text-sm">
              {windowInvoice?.clientAddress.country}
            </p>
          </div>
        </div>

        <div id="sentto" className="mt-3">
          <p className="text-fadedPurple text-sm">Sent To</p>
          <p className="font-bold text-black1">{windowInvoice?.clientEmail}</p>
        </div>

        <ul className="col-span-2 mt-5 pt-5 bg-[#F9FAFE] rounded-t-md">
          {windowInvoice?.items.map((item, index) => (
            <li
              key={index}
              className="flex justify-between items-center px-5 mb-4"
            >
              <div>
                <h3 className="font-bold">{item.name}</h3>
                <p className="font-bold text-fadedPurple">
                  {item.quantity} x £ {item.price.toFixed(2)}{" "}
                </p>
              </div>
              <p className="font-bold">£ {item.total.toFixed(2)}</p>
            </li>
          ))}
          <div
            id="total"
            className="flex justify-between items-center p-5 text-white bg-[#373B53] rounded-b-md"
          >
            <p className="text-sm">Grand Total</p>
            <p className="font-bold text-2xl">
              £ {windowInvoice?.total.toFixed(2)}
            </p>
          </div>
        </ul>
      </div>

      <div className="flex justify-center py-5 bg-white">
        <button
          className="bg-lightBG text-gray-500 text-sm font-semibold px-5 py-3 mx-1 rounded-3xl"
          onClick={() => setEdit(!edit)}
        >
          Edit
        </button>
        <button className="px-5 py-3 mx-1 bg-red text-white text-sm font-semibold rounded-3xl">
          Delete
        </button>
        <button className="px-5 py-3 mx-1 bg-customPurple text-white text-sm font-semibold rounded-3xl">
          Mark as paid
        </button>
      </div>
    </Layout>
  );
}
