import Header from "../components/Header";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen bg-lightBG dark:bg-black2">
      <Header />
      <div className="mt-10">{children}</div>
    </div>
  );
}

export default Layout;
