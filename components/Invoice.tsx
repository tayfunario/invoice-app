import { InvoiceProps } from "../pages";

interface InvoiceObjProps {
  invoice: InvoiceProps;
}

function Invoice({ invoice }: InvoiceObjProps) {
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
    <li className="mx-auto my-4 flex flex-col justify-between w-80 h-36 py-6 px-5 bg-white rounded-md">
      <div className="flex justify-between">
        <span>
          #<span className="font-bold">{invoice.id}</span>
        </span>
        <span className="text-gray-500 text-sm">{invoice.clientName}</span>
      </div>
      <div className="flex justify-between">
        <div>
          <p className="text-sm text-gray-500 mb-1">Due {formattedDate}</p>
          <span className="font-bold">£ {invoice.total}</span>
        </div>
        <div
          className={`grid place-content-center w-24 h-10 font-semibold capitalize ${colors[invoice.status]} rounded-md`}
        >
          •{invoice.status}
        </div>
      </div>
    </li>
  );
}

export default Invoice;
