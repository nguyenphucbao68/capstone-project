import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from 'next/navigation';

const useAppRouter = (href?: string) => {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const searchParams = useSearchParams();

  const push: typeof router.push = (href, opts) => {
    router.push(href, opts);
  };

  const replace: typeof router.replace = (href, opts) => {
    router.replace(href, opts);
  };

  const prefetch: typeof router.prefetch = (href, opts) => {
    router.prefetch(href, opts);
  };

  const onChangeLang = (lang: string) => {
    if (!pathname) return;
    const query = searchParams?.toString();
    const nextPath = pathname.startsWith(`/${params.lang}`)
      ? pathname.replace(`/${params.lang}`, '')
      : pathname;

    router.replace(`/${lang}/${nextPath}${query ? '?' + query : ''}`);
  };

  return {
    ...router,
    push,
    replace,
    prefetch,
    onChangeLang,
    url: href,
  };
};

export default useAppRouter;
