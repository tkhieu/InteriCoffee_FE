import HeaderBar from "@/components/header-bar/header-bar";
import "../styles/globals.css";
import FooterBar from "@/components/footer-bar/footer-bar";
import Slug from "@/utils/slug";

export default function App({ Component, pageProps }) {
  const screenName = "Home";
  return (
    <div className="flex flex-col bg-[#1B1B1B] mx-auto lg:w-9/12 container">
      <HeaderBar />
      <Slug screenName={screenName} />
      <main>
        <Component {...pageProps} />
      </main>
      <FooterBar />
    </div>
  );
}
