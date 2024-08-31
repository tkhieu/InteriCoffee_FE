import HeaderBar from "@/components/header-bar/header-bar";
import "../styles/globals.css";
import FooterBar from "@/components/footer-bar/footer-bar";
import Slug from "@/utils/slug";

export default function App({ Component, pageProps }) {
  const screenName = "Home";
  return (
    //Commiter: Khang Thuận
    //Date: 20/08/2024
    //Change 1: Remove lg:w-9/12. On default, width should take full screen
    <div className="flex flex-col bg-black mx-auto">
      <HeaderBar />
      <Slug screenName={screenName} />
      <main>
        <Component {...pageProps} />
      </main>
      <FooterBar />
    </div>
  );
}
