'use client';

import { useSuspenseQuery } from '@apollo/client';
import { useEffect } from 'react';

import CompanyCard from '@/components/CompanyPage/CompanyCard';
import CompanyReviewBody from '@/components/CompanyPage/CompanyReview';
import { GET_COMPANY_BY_SLUG } from '@/graphql/company';
import { Company } from '@/types/company';

export default function CompanyReviewPage({
  params,
}: {
  params: { slug: string };
}) {
  const slug = params.slug;
  useEffect(() => {
    console.log('slug', slug);
  }, [slug]);
  const {
    data: { companyBySlug },
  } = useSuspenseQuery<{ companyBySlug: Company }, { slug: string }>(
    GET_COMPANY_BY_SLUG,
    {
      variables: {
        slug,
      },
    }
  );

  if (!slug) {
    return null;
  }

  return (
    <main className='companies-landing-container'>
      <div>
        <CompanyCard company={companyBySlug} />
        <CompanyReviewBody company={companyBySlug} />
      </div>
    </main>
  );
}
