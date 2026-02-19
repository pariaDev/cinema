import Navbar from "@/component/Navbar";
import "./globals.css";

export const metadata = {
  title: "Cinema Addicted",
  description: "سینما، احساس، دیالوگ",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
