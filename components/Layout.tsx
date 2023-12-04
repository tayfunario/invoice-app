import Header from "../components/Header";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen bg-lightBG dark:bg-black2">
      <Header />
      <div className="pt-10 xl:px-64 lg:px-36 md:px-20 sm:px-8 px-6">{children}</div>
    </div>
  );
}

export default Layout;
