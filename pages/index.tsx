import Header from "../components/Header";

export default function Home() {
  return (
    <div className="min-h-screen bg-lightBG">
      <Header />
      <main>
        <div className="flex justify-between mx-auto mt-10 px-6 text-black">
          <div>
            <h1 className="text-2xl font-bold leading-5 tracking-tighter">
              Invoices
            </h1>
            <span className="text-sm text-gray-500">7 invoices</span>
          </div>

          <div className="flex gap-x-4">
            <div className="flex items-center font-bold gap-x-2">
              Filter <img src="icon-arrow-down.svg" />
            </div>
            <button className="flex items-center gap-x-2 py-[5px] pl-1 pr-3 text-white text-sm font-bold bg-customPurple rounded-3xl">
              <img
                src="icon-plus.svg"
                className="p-[10px] bg-white rounded-full"
              />{" "}
              <span className="mt-px">New</span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
