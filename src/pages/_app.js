import HeaderBar from "@/components/header-bar/header-bar";
import "../styles/globals.css";
import Background from "@/components/background/background";
import FooterBar from "@/components/footer-bar/footer-bar";

export default function App({ Component, pageProps }) {
  return (
    <div className="flex flex-col bg-black mx-auto lg:w-9/12">
      <HeaderBar />
      <Background />
      <main className="">
        <Component {...pageProps} />
      </main>
      <FooterBar />
    </div>
  );
}
