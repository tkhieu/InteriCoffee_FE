import HeaderBar from "@/components/header-bar/header-bar";
import "../styles/globals.css";
import Background from "@/components/background/background";
import FooterBar from "@/components/footer-bar/footer-bar";

export default function App({ Component, pageProps }) {
  return (
    //Commiter: Khang Thuận
    //Date: 20/08/2024
    //Change 1: Remove lg:w-9/12. On default, width should take full screen
    <div className="flex flex-col bg-black mx-auto">
      <HeaderBar />
      <Background />
      <main className="">
        <Component {...pageProps} />
      </main>
      <FooterBar />
    </div>
  );
}
