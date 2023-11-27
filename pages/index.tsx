import { useState, useEffect } from "react";
import Invoice from "../components/Invoice";
import Top from "../components/Top";
import Blank from "../components/Blank";
import { useSessionStorage } from "../components/useSessionStorage";
import { data } from "../data.js";
import Layout from "../components/Layout";

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
  const { setItem, getItem } = useSessionStorage("value");
  
  return (
    <Layout>
      <Top invNum={invoices.length} />

      <main>
        <section>
          {invoices.length ? (
            <ul className="pt-4 pb-10">
              {invoices.map((invoice) => (
                <li key={invoice.id}>
                  <Invoice invoice={invoice} setItem={setItem} />
                </li>
              ))}
            </ul>
          ) : (
            <Blank />
          )}
        </section>
      </main>
    </Layout>
  );
}
