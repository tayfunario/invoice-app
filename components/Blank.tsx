function Blank() {
  return (
    <figure className="mt-12">
      <img
        src="/illustration-empty.svg"
        className="w-36 mx-auto"
        alt="No invoices"
      />
      <figcaption className="text-xl text-center dark:text-white font-bold mt-8">
        There is nothing here
        <p className="w-40 text-center text-darkerGray dark:text-lightGray mx-auto mt-4 text-xs font-normal">
          Create an invoice by clicking the New button and get started
        </p>
      </figcaption>
    </figure>
  );
}

export default Blank;
