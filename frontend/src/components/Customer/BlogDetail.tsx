import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

import { apiDelete } from '@/apis/api';
import { routes } from '@/configs/router';
import dayjs from '@/lib/dayjs';
import { Blog, BlogTag, Tag } from '@/types/blog';

import { Button } from '../Button';
import { IconClock, IconUser } from '../Icons';
import UpdateBlog from './UpdateBlog';

type Props = {
  blog: Blog;
  blogTag: BlogTag[];
  tags: Tag[];
};

const BlogDetail = ({ blog, blogTag, tags }: Props) => {
  const router = useRouter();

  const [showUpdateComponent, setShowUpdateComponent] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  const [blogData, setBlogData] = useState(blog);
  const [blogTagData, setBlogTagData] = useState(blogTag);

  const closeDeleteConfirmation = () => {
    setShowDeleteConfirmation(false);
  };

  const handleDeleteBlog = () => {
    apiDelete(`/api/blogs/${blogData.id}`).then(() => {
      router.push(routes.customerBlogList.path);
    });
    closeDeleteConfirmation();
  };

  const handleUpdateBlog = (updatedBlog: Blog, updatedBlogTag: BlogTag[]) => {
    console.log(updatedBlog);
    console.log(updatedBlogTag);
    setBlogData(updatedBlog);
    setBlogTagData(updatedBlogTag);
  };
  return (
    <div className='rounded-lg bg-white p-8'>
      <div>
        <div className='mb-4'>
          <div className='text-3xl font-bold'>{blogData.title}</div>
        </div>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-4'>
            <IconClock size={24} color='var(--dark-grey)' />
            <span>{dayjs(blogData.created_at).fromNow()}</span>
            <IconUser size={24} color='var(--dark-grey)' />
            <span>{blogData.time_read}</span>
          </div>
          <div className='flex gap-4'>
            <Button
              intent='primary'
              size='large'
              onClick={() => setShowUpdateComponent(true)}
            >
              Update blog
            </Button>
            <Button
              intent='secondary'
              size='large'
              onClick={() => setShowDeleteConfirmation(true)}
            >
              Delete blog
            </Button>
          </div>
        </div>
        <div className='mt-4'>
          {blogTagData.length > 0 &&
            blogTagData.map((tag) => (
              <span
                key={tag.tag_id}
                className='mr-2 inline-block rounded-full bg-gray-200 px-3 py-1 text-sm font-semibold text-gray-700'
              >
                {tag.tag?.tag_name}
              </span>
            ))}
        </div>
        <div className='mt-4 border-t pt-4 text-lg'>
          <div
            className='leading-relaxed'
            dangerouslySetInnerHTML={{
              __html: blogData.content as unknown as string,
            }}
          ></div>
        </div>
      </div>
      {showUpdateComponent && (
        <UpdateBlog
          blog={{
            id: blogData.id,
            user_id: blogData.user_id as string,
            slug: blogData.slug,
            title: blogData.title,
            time_read: blogData.time_read as number,
            content: blogData.content,
            created_at: blogData.created_at || new Date(),
            tags:
              blogTagData.map((item) => ({
                id: item.tag_id || '',
                tag_name: item.tag?.tag_name || '',
              })) || [],
          }}
          tags={tags}
          onUpdate={handleUpdateBlog}
          onClose={() => setShowUpdateComponent(false)}
        />
      )}
      {showDeleteConfirmation && (
        <div className='fixed inset-0 z-10 flex items-center justify-center overflow-y-auto rounded bg-[#000000] bg-opacity-50 p-20 transition-opacity duration-1000'>
          <div className='flex max-h-[calc(100vh-80px)] flex-col gap-5 overflow-y-auto rounded-lg bg-white p-10'>
            <div className='flex flex-row justify-between '>
              <h3>Are you sure you want to delete this blog?</h3>
            </div>
            <div className='mt-4 flex justify-end'>
              <Button
                onClick={handleDeleteBlog}
                className='mr-2'
                intent='primary'
                size='large'
              >
                Yes
              </Button>
              <Button
                onClick={closeDeleteConfirmation}
                className='outlined'
                intent='secondary'
                size='large'
              >
                No
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogDetail;
