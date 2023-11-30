import Link from "next/link";
import { InvoiceProps } from "../pages";

interface InvoiceObjProps {
  invoice: InvoiceProps;
  setItem: (value: InvoiceProps) => void;
}

function Invoice({ invoice, setItem }: InvoiceObjProps) {
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
    draft: "bg-gray-100 text-gray-500",
  };

  return (
    <Link
      href={"/invoice"}
      onClick={() => setItem(invoice)}
      className="mx-auto my-4 flex flex-col justify-between w-80 h-36 py-6 px-5 bg-white rounded-md"
    >
      <div className="flex justify-between">
        <span className="text-fadedPurple">
          #<span className="text-black font-bold">{invoice.id}</span>
        </span>
        <span className="text-gray-500 text-sm">{invoice.clientName}</span>
      </div>
      <div className="flex justify-between">
        <div>
          {formattedDate !== "Invalid Date" && (
            <p className="text-sm text-fadedPurple mb-1">Due {formattedDate}</p>
          )}
          <span className="font-bold">£ {invoice.total}</span>
        </div>
        <div
          className={`flex justify-center items-center w-24 h-10 gap-x-1 font-semibold capitalize ${
            colors[invoice.status]
          } rounded-md`}
        >
          <span className="text-xl">•</span> {invoice.status}
        </div>
      </div>
    </Link>
  );
}

export default Invoice;
