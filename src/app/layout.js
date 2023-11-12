import { Provider } from "../../Providers";
import "./globals.scss";
import { Roboto } from "next/font/google";

const inter = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "700", "100", "900", "500"],
});

export const metadata = {
  title: "Slaysheet",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main>
          <Provider>{children}</Provider>
        </main>
      </body>
    </html>
  );
}
