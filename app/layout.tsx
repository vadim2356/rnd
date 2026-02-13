import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BlogPreview } from "@/components/BlogPreview";
import { FloatingCTA } from "@/components/FloatingCTA";
import { ExitIntentPopup } from "@/components/ExitIntentPopup";
import { YandexMetrika } from "@/components/YandexMetrika";
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
  verification: {
    yandex: "1ca179502c1c665e",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={inter.variable}>
      <head>
        <link rel="preconnect" href="https://mc.yandex.ru" />
        <link rel="dns-prefetch" href="https://maps.yastatic.net" />
        <link rel="dns-prefetch" href="https://yandex.ru" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      </head>
      <body className="min-h-screen flex flex-col font-sans antialiased">
        <YandexMetrika />
        <noscript>
          <div>
            {/* Пиксель Метрики при отключённом JS */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://mc.yandex.ru/watch/106797821"
              style={{ position: "absolute", left: "-9999px" }}
              alt=""
            />
          </div>
        </noscript>
        <Header />
        <main className="flex-1">{children}</main>
        <BlogPreview />
        <Footer />
        <FloatingCTA />
        <ExitIntentPopup />
      </body>
    </html>
  );
}
