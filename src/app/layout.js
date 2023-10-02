import "./globals.scss";
import { Roboto } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";

const inter = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "700", "100", "900", "500"],
});

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <main>{children}</main>
        </body>
      </html>
    </ClerkProvider>
  );
}
