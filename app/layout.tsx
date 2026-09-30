import type { Metadata } from 'next';
import { Inter, JetBrains_Mono, Cairo } from 'next/font/google';
import './globals.css';
import { Providers } from '@/components/Providers';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
});

const cairo = Cairo({
  subsets: ['arabic', 'latin'],
  variable: '--font-cairo',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Amin Reda | AI Engineer',
  description:
    'Amin Reda — AI Engineer focused on Artificial Intelligence, Generative AI, Data Analysis, Computer Vision, and Automation.',
  keywords: [
    'Amin Reda',
    'AI Engineer',
    'Artificial Intelligence',
    'Generative AI',
    'Machine Learning',
    'Data Analysis',
    'Computer Vision',
    'Automation',
    'RAG',
    'LLMs',
    'n8n',
    'LangChain',
    'Egypt',
  ],
  authors: [{ name: 'Amin Reda', url: 'https://github.com/amin-reda' }],
  creator: 'Amin Reda',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    alternateLocale: 'ar_EG',
    title: 'Amin Reda | AI Engineer',
    description:
      'Amin Reda — AI Engineer focused on Artificial Intelligence, Generative AI, Data Analysis, Computer Vision, and Automation.',
    siteName: 'Amin Reda Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Amin Reda | AI Engineer',
    description:
      'Amin Reda — AI Engineer focused on Artificial Intelligence, Generative AI, Data Analysis, Computer Vision, and Automation.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <meta name="theme-color" content="#6366f1" />
      </head>
      <body
        className={`${inter.variable} ${jetbrains.variable} ${cairo.variable} antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
