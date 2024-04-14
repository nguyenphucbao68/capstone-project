import { useMutation } from '@apollo/client';
import { Avatar } from '@mantine/core';
import { useParams, useRouter } from 'next/navigation';

import { routes } from '@/configs/router';
import { JOB_TYPE_TEXT } from '@/constant/job';
import { SEARCH_JOBS } from '@/graphql/job';
import { SAVE_JOB, UNSAVE_JOB } from '@/graphql/job-save';
import dayjs from '@/lib/dayjs';
import { formatCurrency } from '@/lib/number';
import { useLocale } from '@/locale';
import { Job } from '@/types/job';

import { AppLink } from '../AppLink';
import { Button } from '../Button';
import {
  IconCheckCircle,
  IconClock,
  IconExternalLink,
  IconHeart,
  IconMapPin,
  IconRemote,
  IconSalary,
} from '../Icons';

type Props = {
  job: Job;
};

const JobDetail = ({ job }: Props) => {
  const { t } = useLocale();
  const router = useRouter();
  const params = useParams();
  const [save] = useMutation(SAVE_JOB, {
    variables: {
      id: job.id,
    },
    refetchQueries: [SEARCH_JOBS],
  });

  const [unsave] = useMutation(UNSAVE_JOB, {
    variables: {
      id: job.id,
    },
    refetchQueries: [SEARCH_JOBS],
  });

  const handleTagClick = (tag: string) => {
    router.push(
      routes.search.pathParams({ keyword: params?.keyword as string }) +
        `?search=${tag}`
    );
  };

  const handleSave = () => {
    if (!job.saved) {
      save();
    } else {
      unsave();
    }
  };

  return (
    <div className='rounded-lg bg-white'>
      <div className='border-silver-grey mx-6 border-b pb-2 pt-6'>
        <div className='flex items-center gap-4'>
          <Avatar radius='sm' size={100}>
            {job.company.company_name}
          </Avatar>
          <div className='flex flex-col justify-center gap-2'>
            <div className='text-[22px] font-bold'>{job.name}</div>
            <div className='text-rich-grey'>{job.company.company_name}</div>
            <div className='text-success-color flex items-center gap-2 font-medium'>
              <IconSalary />
              {!job.salary_from && !job.salary_to
                ? "You'll love it"
                : `${formatCurrency(
                    job.salary_from || 0,
                    job.unit,
                    job.unit === 'VND' ? 'vi-VN' : 'en'
                  )} - ${formatCurrency(
                    job.salary_to || 0,
                    job.unit,
                    job.unit === 'VND' ? 'vi-VN' : 'en'
                  )}`}
            </div>
          </div>
        </div>
        <div className='my-4'>
          {job.applied ? (
            <div className='bg-light-success-color flex items-center gap-2 rounded py-2 pl-3'>
              <IconCheckCircle size={20} color='var(--success-color)' />
              <span className='text-sm font-normal'>
                Applied {dayjs(job.applied.date_apply).format('DD/MM/YYYY')}
              </span>
            </div>
          ) : (
            <div className='flex items-center gap-4'>
              <Button
                href={routes.applyJob.pathParams({ id: job.id })}
                size='medium'
                className='flex-1'
              >
                Apply
              </Button>
              <IconHeart
                onClick={handleSave}
                color='var(--primary)'
                size={32}
                fill={job.saved ? 'var(--primary)' : '#fff'}
                className='cursor-pointer'
              />
            </div>
          )}
        </div>
      </div>
      <div className='h-[calc(100vh-300px)] overflow-y-scroll p-6'>
        <div className='text-rich-grey flex flex-col gap-2 text-sm'>
          {job.job_working_location && !!job.job_working_location.length && (
            <div className='flex items-center gap-1'>
              <div className='w-4'>
                <IconMapPin size={16} color='var(--dark-grey)' />
              </div>
              {job.job_working_location
                .map((location) => location.company_location.address)
                .join('; ')}
            </div>
          )}
          <div className='flex items-center gap-1'>
            <IconRemote size={16} viewBox='0 0 24 25' color='var(--dark-grey' />
            {t(JOB_TYPE_TEXT[job.working_type])}
          </div>
          <div className='flex items-center gap-1'>
            <IconClock size={16} color='var(--dark-grey' />
            {dayjs(job.date_posted).fromNow()}
          </div>
          <div className='flex items-center gap-1'>
            <span className='mr-3'>Skills:</span>
            {job.skills &&
              JSON.parse(job.skills).map((tag: string, index: number) => (
                <div
                  onClick={() => handleTagClick(tag)}
                  key={index}
                  className='itag itag-light itag-sm'
                >
                  {tag}
                </div>
              ))}
          </div>
        </div>
        <div className='border-silver-grey my-6 border-b border-dashed'></div>
        <div className='text-[#121212]'>
          <div className='mb-4 text-[22px] font-bold'>
            Top 3 reasons to join us
          </div>
          <div
            className='list-disc'
            dangerouslySetInnerHTML={{ __html: job.top_3_reason }}
          ></div>
          <div className='border-silver-grey my-6 border-b border-dashed'></div>
          <div className='mb-4 text-[22px] font-bold'>Job description</div>
          <div
            className='list-disc'
            dangerouslySetInnerHTML={{
              __html: job.job_description as unknown as string,
            }}
          ></div>
          <div className='border-silver-grey my-6 border-b border-dashed'></div>
          <div className='mb-4 text-[22px] font-bold'>
            Your skills and experience
          </div>
          <div
            className='list-disc'
            dangerouslySetInnerHTML={{
              __html: job.skill_demand as unknown as string,
            }}
          ></div>
          <div className='border-silver-grey my-6 border-b border-dashed'></div>
          <div className='mb-4 text-[22px] font-bold'>
            Why you'll love working here
          </div>
          <div
            className='list-disc'
            dangerouslySetInnerHTML={{
              __html: job.why_you_love_working_here as unknown as string,
            }}
          ></div>
          <div className='border-silver-grey mt-6 border-t pt-6'>
            <div className='mb-2 flex items-center justify-between'>
              <div className='text-[22px] font-bold'>
                {job.company.company_name}
              </div>
              <AppLink
                href='/companies'
                className='text-hyperlink flex items-center gap-1 whitespace-nowrap'
              >
                View company
                <IconExternalLink size={16} />
              </AppLink>
            </div>
            <div className='text-rich-text mb-4 text-sm'>
              {job.company.brief_overview}
            </div>
            <div className='gap -mx-3 flex flex-wrap gap-y-4'>
              <div className='w-1/3 px-3'>
                <div className='text-dark-grey text-sm'>Company type</div>
                <div>{job.company.company_type}</div>
              </div>
              <div className='w-1/3 px-3'>
                <div className='text-dark-grey text-sm'>Company size</div>
                <div>{job.company.company_size}</div>
              </div>
              <div className='w-1/3 px-3'>
                <div className='text-dark-grey text-sm'>Country</div>
                <div>{job.company.country}</div>
              </div>
              <div className='w-1/3 px-3'>
                <div className='text-dark-grey text-sm'>Working days</div>
                <div>{job.company.working_day}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetail;
