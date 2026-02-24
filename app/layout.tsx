// app/layout.tsx
import type { Metadata } from 'next';
import './globals.css';
import { LanguageProvider } from '@/components/LanguageProvider';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'クメール関西株式会社 | ちょっと待って！捨てるよりも活かす選択を',
  description: 'クメール関西株式会社は、不要になった家電やプラスチック、アルミ・鉄・不要になった自転車、建設機械、農機具関係を回収・再生し、資源循環に貢献するリサイクル事業を展開しています。',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className="min-h-screen flex flex-col">
        <LanguageProvider>
          <Header />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}