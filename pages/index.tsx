import { useState, useEffect } from "react";
import Invoice from "../components/Invoice";
import Top from "../components/Top";
import Blank from "../components/Blank";
import { useSessionStorage } from "../components/useSessionStorage";
import Layout from "../components/Layout";
import CreateInvoice from "../components/CreateInvoice";

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
  const [create, setCreate] = useState<boolean>(false);
  const [filter, setFilter] = useState<"total" | "paid" | "pending" | "draft">(
    "total"
  );
  const [filteredInvoices, setFilteredInvoices] = useState<InvoiceProps[]>();
  const { setItem, setAllItems, getAllItems } = useSessionStorage();

  useEffect(() => {
    setAllItems();
  }, []);

  useEffect(() => {
    setFilteredInvoices(getAllItems());
  }, [create]);

  const handleCreate = (val: boolean) => {
    setCreate(val);
  };

  const handleFilter = (val: "total" | "paid" | "pending" | "draft") => {
    setFilter(val);
    if (val === "total") {
      setFilteredInvoices(getAllItems());
    } else {
      setFilteredInvoices(
        getAllItems().filter((invoice) => invoice.status === val)
      );
    }
  };

  return create ? (
    <CreateInvoice handleCreate={handleCreate} />
  ) : (
    <Layout>
      <Top
        invNum={filteredInvoices?.length}
        handleCreate={handleCreate}
        filter={filter}
        handleFilter={handleFilter}
      />

      <main>
        <section>
          {filteredInvoices?.length ? (
            <ul className="pt-4 pb-10">
              {filteredInvoices?.map((invoice) => (
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
