import Link from 'next/link';
import React from 'react';

const RelatedArticleItem: React.FC<{ title: string; url: string }> = ({
  title,
  url,
}) => {
  return (
    <div className='mt-4'>
      <p className='text-lg font-medium'>
        <Link href={url}>{title}</Link>
      </p>
      <hr className='mt-5 h-[1px] w-full border-none bg-gray-200' />
    </div>
  );
};

export default RelatedArticleItem;