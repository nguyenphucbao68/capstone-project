import { type ReactNode } from 'react';

export type LocaleData = Record<string, string>;

type LocaleConfig = Record<string, string | number>;

export type LocaleContext = {
  locales: Record<string, string>;
  defaultLocale?: string;
  localeStorageKey?: string;
  detectBrowserLanguage?: boolean;
  children: ReactNode;
  localeConfig?: Record<string, LocaleConfig>;
  config?: LocaleConfig;
  ssr?: boolean;
  ssrLocale?: string;
};

export type LocaleStore = {
  locale: string;
  config?: LocaleConfig;
  hasData: boolean;
  setLocale: (
    locale: string,
    localeConfig?: Record<string, LocaleConfig>
  ) => Promise<void>;
};

export type LocaleArguments = Array<string | number> | Record<string, string>;

export type LocaleExtendParams = { count?: number; returnObject?: boolean };
