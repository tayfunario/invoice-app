import { useState } from "react";
import Header from "../components/Header";
import Invoice from "../components/Invoice";
import Top from "../components/Top";
import { data } from "../data.js";

export interface InvoiceProps {
  id: string;
  createdAt: string;
  paymentDue: string;
  description: string;
  paymentTerms: number;
  clientName: string;
  clientEmail: string;
  status: string;
  senderAddress: {
    street: string;
    city: string;
    postCode: string;
    country: string;
  };
  clientAddress: {
    street: string;
    city: string;
    postCode: string;
    country: string;
  };
  items: {
    name: string;
    quantity: number;
    price: number;
    total: number;
  }[];
  total: number;
}

export default function Home() {
  const [invoices, setInvoices] = useState<InvoiceProps[]>(data);

  return (
    <div className="min-h-screen bg-lightBG">
      <Header />
      <main>
        <Top />

        <section>
          <ul className="pt-4 pb-10">
            {invoices.map((invoice) => (
              <Invoice key={invoice.id} invoice={invoice} />
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}
