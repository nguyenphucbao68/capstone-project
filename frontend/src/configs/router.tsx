import { DEFAULT_LOCALE } from '@/constant/config';
import { isNotEmpty } from '@/lib/validate';

type RouteParams = Record<string, string | number | boolean>;

type Metadata = {
  title: string;
  description?: string;
};

type RouteConfig = {
  path: string;
  requiredAuth?: boolean;
  queryParams: (params: RouteParams) => void;
  pathParams: (params: RouteParams) => void;
  locales: string[];
  defaultLocale: string;
  metadata?: Record<string, Metadata>;
};

const route = (route: Omit<RouteConfig, 'queryParams' | 'pathParams'>) =>
  ({
    ...route,
    queryParams(params: RouteParams) {
      const serialized = Object.keys(params).reduce(
        (rs, key) => ({
          ...rs,
          ...(isNotEmpty(params[key]) ? { [key]: `${params[key]}` } : {}),
        }),
        {} as Record<string, string>
      );
      const queries = new URLSearchParams(serialized).toString();

      return queries ? `${route.path}?${queries}` : route.path;
    },
    pathParams(params: RouteParams) {
      return Object.keys(params).reduce(
        (rs, key) => rs.replace(`[${key}]`, `${params[key]}`),
        route.path
      );
    },
  } satisfies RouteConfig);

export const routes = {
  home: route({
    path: '/',
    requiredAuth: false,
    locales: ['vi', 'en'],
    defaultLocale: DEFAULT_LOCALE,
  }),
  signin: route({
    path: '/signin',
    requiredAuth: false,
    locales: ['vi', 'en'],
    defaultLocale: DEFAULT_LOCALE,
    metadata: {
      vi: {
        title: 'Đăng nhập tài khoản để ứng tuyển việc làm | ITviec',
        description:
          'Đăng nhập tài khoản để nhận thông báo về việc làm IT hấp dẫn. Chưa có tài khoản? Đăng ký ngay.',
      },
      en: {
        title: 'Sign in into your account to apply jobs | ITviec',
        description:
          "Sign in to ITviec account to receive top IT job notifications with high salary and more. Don't have an account? Sign up now.",
      },
    },
  }),
  signup: route({
    path: '/signup',
    requiredAuth: false,
    locales: ['vi', 'en'],
    defaultLocale: DEFAULT_LOCALE,
    metadata: {
      vi: {
        title:
          'Đăng ký tài khoản để tìm kiếm công việc IT hàng đầu cho bạn | ITviec',
        description:
          'Đăng ký tài khoản tại ITviec. Tìm kiếm việc làm IT lương cao, phúc lợi tốt dễ dàng hơn.',
      },
      en: {
        title: 'Sign up to find Top IT Jobs for You | ITviec',
        description:
          'Sign up an account to ITviec. Find IT jobs easier with high salary, good benefit job.',
      },
    },
  }),
  forgotPassword: route({
    path: '/forgot-password',
    requiredAuth: false,
    locales: ['vi', 'en'],
    defaultLocale: DEFAULT_LOCALE,
    metadata: {
      vi: {
        title: 'Đặt lại mật khẩu | ITviec',
      },
      en: {
        title: 'Reset password | ITviec',
      },
    },
  }),
  search: route({
    path: '/it-jobs',
    requiredAuth: false,
    locales: ['vi', 'en'],
    defaultLocale: DEFAULT_LOCALE,
  }),
  employer: route({
    path: '/employer',
    requiredAuth: false,
    locales: ['vi', 'en'],
    defaultLocale: DEFAULT_LOCALE,
  }),
  // settings
  settings: route({
    path: '/settings',
    requiredAuth: true,
    locales: ['vi', 'en'],
    defaultLocale: DEFAULT_LOCALE,
    metadata: {
      vi: {
        title: 'Cài đặt | ITviec',
      },
      en: {
        title: 'Settings | ITviec',
      },
    },
  }),
  // my-jobs
  myjobs: route({
    path: '/my-jobs',
    requiredAuth: true,
    locales: ['vi', 'en'],
    defaultLocale: DEFAULT_LOCALE,
    metadata: {
      vi: {
        title: 'Việc làm của tôi | ITviec',
      },
      en: {
        title: 'My jobs | ITviec',
      },
    },
  }),
  recentViewed: route({
    path: '/my-jobs/recent-viewed',
    requiredAuth: true,
    locales: ['vi', 'en'],
    defaultLocale: DEFAULT_LOCALE,
    metadata: {
      vi: {
        title: 'Việc làm của tôi | ITviec',
      },
      en: {
        title: 'My jobs | ITviec',
      },
    },
  }),
  applied: route({
    path: '/my-jobs/applied',
    requiredAuth: true,
    locales: ['vi', 'en'],
    defaultLocale: DEFAULT_LOCALE,
    metadata: {
      vi: {
        title: 'Việc làm của tôi | ITviec',
      },
      en: {
        title: 'My jobs | ITviec',
      },
    },
  }),
  // profile-cv
  profileCv: route({
    path: '/profile-cv',
    requiredAuth: true,
    locales: ['vi', 'en'],
    defaultLocale: DEFAULT_LOCALE,
    metadata: {
      vi: {
        title: 'Quản lí hồ sơ | ITviec',
      },
      en: {
        title: 'User profile | ITviec',
      },
    },
  }),
  manageCv: route({
    path: '/profile-cv/manage-cv',
    requiredAuth: true,
    locales: ['vi', 'en'],
    defaultLocale: DEFAULT_LOCALE,
    metadata: {
      vi: {
        title: 'Quản lí hồ sơ | ITviec',
      },
      en: {
        title: 'User profile | ITviec',
      },
    },
  }),
  jobPreferences: route({
    path: '/profile-cv/job-preferences',
    requiredAuth: true,
    locales: ['vi', 'en'],
    defaultLocale: DEFAULT_LOCALE,
    metadata: {
      vi: {
        title: 'Quản lí hồ sơ | ITviec',
      },
      en: {
        title: 'User profile | ITviec',
      },
    },
  }),
  blog: route({
    path: '/blog',
    requiredAuth: false,
    locales: ['vi', 'en'],
    defaultLocale: DEFAULT_LOCALE,
    metadata: {
      vi: {
        title: 'Nơi phát triển sự IT của bạn | ITviec',
      },
      en: {
        title: 'User profile | ITviec',
      },
    },
  }),
};

export const getRouteByPath = (path = '') => {
  const removedQuery = path.includes('?')
    ? path.substring(0, path.indexOf('?'))
    : path;
  return Object.values(routes).find((route) => route.path === removedQuery);
};
