import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingCTA } from "@/components/FloatingCTA";
import { ExitIntentPopup } from "@/components/ExitIntentPopup";
import { SITE_URL, SITE_NAME } from "@/lib/seo";

const inter = Inter({ subsets: ["latin", "cyrillic"], variable: "--font-sans" });

const defaultTitle = "Установка систем очистки воды в Ростове-на-Дону и области — под ключ";
const defaultDescription =
  "Подбор по анализу воды. Монтаж за 1 день. Решаем жёсткость, железо, запах, мутность. Сервис и обслуживание в Ростове-на-Дону и Ростовской области.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: defaultTitle,
  description: defaultDescription,
  keywords: [
    "установка систем очистки воды",
    "монтаж водоочистки",
    "очистка воды Ростов",
    "водоочистка под ключ",
    "Ростов-на-Дону",
    "Ростовская область",
  ],
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: defaultTitle,
    description: defaultDescription,
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: defaultDescription,
  },
  alternates: {
    canonical: SITE_URL,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={inter.variable}>
      <body className="min-h-screen flex flex-col font-sans antialiased">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <FloatingCTA />
        <ExitIntentPopup />
      </body>
    </html>
  );
}
