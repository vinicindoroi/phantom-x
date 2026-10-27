import type { Metadata } from "next";
import "./globals.css";
import { siteConfig } from "@/config/site";
import { LanguageProvider } from "@/lib/i18n";

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.url),
  icons: {
    icon: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className="dark scroll-smooth">
      <body className="min-h-screen bg-brand-black text-brand-white antialiased selection:bg-white selection:text-black">
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
