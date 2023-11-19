import Header from "../components/Header";
import Top from "../components/Top";

export default function Home() {
  return (
    <div className="min-h-screen bg-lightBG">
      <Header />
      <main>
        <Top />
      </main>
    </div>
  );
}
