import Link from "next/link";
import { InvoiceProps } from "../pages";
import { useWindowSize } from "./useWindowSize";

interface InvoiceObjProps {
  invoice: InvoiceProps;
  setItem: (value: InvoiceProps) => void;
}

function Invoice({ invoice, setItem }: InvoiceObjProps) {
  const { windowSize } = useWindowSize();
  const formattedDate = new Date(invoice.paymentDue).toLocaleDateString(
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
    draft: "bg-gray-100 text-gray-500 dark:text-lightGray",
  };

  return windowSize.width > 640 ? (
    <Link
      href={"/invoice"}
      onClick={() => setItem(invoice)}
      className="relative grid grid-cols-5 items-center mx-auto my-4 h-20 py-6 px-5 border border-transparent hover:border-customPurple bg-white dark:bg-dark rounded-md"
    >
      <span className="text-fadedPurple">
        #
        <span className="text-black dark:text-white font-bold">
          {invoice.id}
        </span>
      </span>

      {formattedDate !== "Invalid Date" && (
        <p className="text-sm text-fadedPurple dark:text-lightGray">
          Due {formattedDate}
        </p>
      )}

      <span className="text-gray-500 dark:text-white text-sm">
        {invoice.clientName}
      </span>

      <span className="text-black1 dark:text-white font-bold">
        £ {invoice.total.toLocaleString("en-US")}
      </span>

      <div
        className={`flex justify-center items-center w-24 h-10 gap-x-1 font-semibold capitalize ${
          colors[invoice.status]
        } rounded-md dark:bg-transparent`}
      >
        <span className="text-xl">•</span> {invoice.status}
      </div>

      <img src="/icon-arrow-right.svg" className="absolute right-5" alt="arrow" />
    </Link>
  ) : (
    <Link
      href={"/invoice"}
      onClick={() => setItem(invoice)}
      className="mx-auto my-4 flex flex-col justify-between h-36 py-6 px-5 bg-white dark:bg-dark rounded-md"
    >
      <div className="flex justify-between">
        <span className="text-fadedPurple">
          #
          <span className="text-black dark:text-white font-bold">
            {invoice.id}
          </span>
        </span>
        <span className="text-gray-500 dark:text-white text-sm">
          {invoice.clientName}
        </span>
      </div>
      <div className="flex justify-between">
        <div>
          {formattedDate !== "Invalid Date" && (
            <p className="text-sm text-fadedPurple dark:text-lightGray mb-1">
              Due {formattedDate}
            </p>
          )}
          <span className="text-black1 dark:text-white font-bold">
            £ {invoice.total.toLocaleString("en-US")}
          </span>
        </div>
        <div
          className={`flex justify-center items-center w-24 h-10 gap-x-1 font-semibold capitalize ${
            colors[invoice.status]
          } rounded-md dark:bg-transparent`}
        >
          <span className="text-xl">•</span> {invoice.status}
        </div>
      </div>
    </Link>
  );
}

export default Invoice;
