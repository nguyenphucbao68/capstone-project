import { MantineProvider } from '@mantine/core';
import { Metadata } from 'next';
import { Lexend } from 'next/font/google';
import { headers } from 'next/headers';
import { type ReactNode } from 'react';

import { getRouteByPath } from '@/configs/router';
import { DEFAULT_LOCALE, siteConfig } from '@/constant/config';

import '@mantine/core/styles.css';
import '@/styles/globals.css';

export async function generateMetadata({
  params,
}: {
  params: { lang: string };
}): Promise<Metadata> {
  const headersList = headers();
  const pathname = headersList.get('x-pathname') || '';
  const route = getRouteByPath(pathname);
  const lang = route?.locales.find((locale) => locale === params.lang)
    ? params.lang
    : route?.defaultLocale || DEFAULT_LOCALE;

  const title = route?.metadata?.[lang].title || siteConfig.title;
  const description = route?.metadata?.[lang].title || siteConfig.description;

  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: title,
      template: `%s | ${title}`,
    },
    description: description,
    robots: { index: true, follow: true },
    icons: {
      icon: '/favicon/favicon.ico',
      shortcut: '/favicon/favicon-16x16.png',
      apple: '/favicon/apple-touch-icon.png',
    },
    manifest: `/favicon/site.webmanifest`,
    openGraph: {
      url: siteConfig.url,
      title,
      description,
      siteName: siteConfig.title,
      images: [`${siteConfig.url}/images/og.jpg`],
      type: 'website',
      locale: 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`${siteConfig.url}/images/og.jpg`],
    },
  };
}

export const font = Lexend({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin', 'vietnamese'],
  variable: '--font-lexend',
});

export async function generateStaticParams() {
  return [{ lang: 'en-US' }, { lang: 'de' }];
}

export default function RootLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { lang: string };
}) {
  return (
    <html lang={params.lang} className={font.className}>
      <body>
        <MantineProvider>{children}</MantineProvider>
      </body>
    </html>
  );
}
