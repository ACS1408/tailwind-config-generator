import { DM_Sans } from "next/font/google";
import "@/styles/common.scss";
import Head from "next/head";

const dm_sans = DM_Sans({ subsets: ["latin"] });

export const metadata = {
  title: "UI Variables",
  description: "Custom tailwindcss config and style generator",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="./apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="./favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="./favicon-16x16.png"
        />
        <link rel="manifest" href="./site.webmanifest" />
      </Head>
      <body className={dm_sans.className}>
        {children}
        <div id="offcanvas-root"></div>
      </body>
    </html>
  );
}
