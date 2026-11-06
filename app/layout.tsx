import type { Metadata, Viewport } from 'next';
import { JetBrains_Mono, Newsreader, Schibsted_Grotesk } from 'next/font/google';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { site } from '@/content/studio';
import './globals.css';

const grotesk = Schibsted_Grotesk({ subsets: ['latin'], variable: '--font-grotesk', display: 'swap' });
const newsreader = Newsreader({ subsets: ['latin'], variable: '--font-newsreader', style: ['normal', 'italic'], weight: ['300', '400'], display: 'swap' });
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono-face', weight: ['400'], display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} — Architecture & Interiors`, template: `%s — ${site.name}` },
  description: site.description,
  applicationName: site.name,
  openGraph: { type: 'website', siteName: site.name, locale: 'en_GB' },
  twitter: { card: 'summary_large_image' },
  // Concept site: keep it out of search indexes until Steeven decides otherwise.
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: '#eeebe4',
  colorScheme: 'light',
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en-GB" className={`${grotesk.variable} ${newsreader.variable} ${mono.variable}`}>
      <body>
        <div id="root" className="relative flex min-h-dvh flex-col">
          <a
            href="#main"
            className="is-fixed meta fixed left-4 top-4 z-[60] -translate-y-24 bg-graphite px-4 py-3 text-paper transition-transform focus:translate-y-0"
          >
            Skip to content
          </a>
          <Header />
          <main id="main" tabIndex={-1} className="curtain-main flex-1 outline-none">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
