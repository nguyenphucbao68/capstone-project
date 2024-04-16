'use client';

import { useSuspenseQuery } from '@apollo/client';
import React from 'react';

import CompanyBody from '@/components/CompanyPage/CompanyBody';
import CompanyCard from '@/components/CompanyPage/CompanyCard';
import { GET_COMPANY_BY_SLUG } from '@/graphql/company';
import { Company } from '@/types/company';

export default function CompanyDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const slug = params.slug;
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
        <CompanyBody company={companyBySlug} />
      </div>
    </main>
  );
}
