'use client';

import { useMutation, useQuery, useSuspenseQuery } from '@apollo/client';
import { Textarea } from '@mantine/core';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { ChangeEvent, useState } from 'react';

import ApplyJobSuccessModal from '@/components/ApplyJob/SuccessModal';
import { Button } from '@/components/Button';
import { IconChevronLeft, IconEye } from '@/components/Icons';
import { InputBox } from '@/components/InputBox';
import { CancelApply } from '@/components/Modal';
import { Radio, RadioGroup } from '@/components/Radio';
import { routes } from '@/configs/router';
import {
  APPLY_JOBS,
  ApplyJobResponse,
  ApplyJobVariable,
  GET_JOB,
  type GetJobResponse,
  type GetJobVariable,
} from '@/graphql/job';
import { GET_JOB_APPLIED } from '@/graphql/jobs-applied';
import {
  FilePayload,
  UPLOAD_FILE,
  UploadFileResponse,
  UploadFileVariable,
} from '@/graphql/upload';
import { useForm } from '@/hooks/useForm';
import { cn } from '@/lib/classNames';

type Form = {
  cv: string;
  coverLetter?: string;
};

const ApplyJob = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const params = useParams();
  const [value, setValue] = useState('default');
  const [show, setShow] = useState(false);
  const [name, setName] = useState(session?.user.name);
  const [modalSuccessVisible, setModalSuccessVisible] = useState(false);
  const [uploadFile, { loading: loadingUploadFile }] = useMutation<
    UploadFileResponse,
    UploadFileVariable
  >(UPLOAD_FILE);
  const [mutate, { loading }] = useMutation<ApplyJobResponse, ApplyJobVariable>(
    APPLY_JOBS
  );
  const { data, loading: cvLoading } = useQuery(GET_JOB_APPLIED);
  const [fileData, setFileData] = useState<FilePayload | null>(null);

  const { fields, error, setError, onChangeField, handleSubmit } =
    useForm<Form>({
      defaultState: { cv: '', coverLetter: '' },
      config: { cv: { required: { value: true, message: 'requiredText' } } },
    });

  const {
    data: { job },
  } = useSuspenseQuery<GetJobResponse, GetJobVariable>(GET_JOB, {
    variables: {
      jobId: params?.id as string,
    },
  });

  const uploadCv = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 3145728) {
      setError((prev) => ({ ...prev, cv: 'maxSizeText' }));
    } else {
      // const url = await upload(file);
      const fileData = await uploadFile({ variables: { prefix: 'usr', file } });

      onChangeField('cv', fileData?.data?.singleUpload?.url as string);
      if (fileData?.data?.singleUpload?.url) {
        setFileData(fileData?.data?.singleUpload);
      }
    }
  };

  const onSubmit = () => {
    mutate({
      variables: {
        input: {
          job_id: job.id,
          cv: fields.cv,
          cover_letter: fields.coverLetter || '',
        },
      },
      onCompleted: () => {
        setModalSuccessVisible(true);
      },
    });
  };

  if (status === 'loading') return null;

  return (
    <div className='gradient-light-grey-background bg-light-grey mb-5 min-h-screen w-full	 overflow-y-auto text-black'>
      <div className='relative mx-auto mb-10 max-w-[884px]'>
        <div className='relative flex py-6'>
          <Button
            onClick={() => setShow(true)}
            intent='transparent'
            icon={<IconChevronLeft size={20} />}
            className='px-0 !text-white'
          >
            Back
          </Button>
          <Image
            src='/images/logo.png'
            width={81}
            height={0}
            alt='logo'
            className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'
          />
        </div>
        <div className='flex flex-col gap-6 rounded-lg bg-white p-8 shadow-[0_4px_20px_rgba(0,0,0,.06)]'>
          <div className='text-[22px] font-bold'>{job.name}</div>
          <InputBox
            type='text'
            name='contact_request[name]'
            label='Your name'
            required
            value={name}
            disabled={!!session?.user?.name}
            onChange={(e) => setName(e.target.value as string)}
            error='Vui lòng điền tên của bạn'
          />

          <div>
            <div className='mb-3 text-lg font-bold'>
              Your CV <span className='text-primary'>*</span>
            </div>
            <RadioGroup value={value} onChange={setValue}>
              <div
                className={cn(
                  'border-dark-grey flex gap-2 rounded border p-4',
                  { 'border-primary bg-white-red': value === 'default' }
                )}
              >
                <Radio value='default' size='large' />
                <div>
                  Use your current CV
                  {cvLoading ? (
                    <img
                      src='/images/loading.gif'
                      alt='loading'
                      className='mt-2 h-6 w-6'
                    />
                  ) : (
                    <a
                      target='_blank'
                      href={routes.viewCV.queryParams({
                        cv: data?.currentJobApplication.cv as string,
                      })}
                      className='text-hyperlink mt-3 flex items-center gap-2'
                    >
                      {data?.currentJobApplication.cv.split('/').pop()}
                      <IconEye size={20} />
                    </a>
                  )}
                </div>
              </div>
              <div
                className={cn(
                  'border-dark-grey mt-4 flex gap-2 rounded border p-4',
                  { 'border-primary bg-white-red': value === 'file' }
                )}
              >
                <Radio value='file' size='large' />
                <div>
                  Upload new CV
                  <div className='mt-3'>
                    <input
                      type='file'
                      placeholder='Upload new CV'
                      onChange={uploadCv}
                      accept='application/doc,application/docx,application/pdf'
                    />
                  </div>
                  {error.cv && (
                    <div className='text-primary mt-1'>Can't be blank</div>
                  )}
                  {loadingUploadFile && (
                    <img
                      src='/images/loading.gif'
                      alt='loading'
                      className='mt-2 h-6 w-6'
                    />
                  )}
                  {fileData && (
                    <a
                      target='_blank'
                      href={routes.viewCV.queryParams({ cv: fileData.url })}
                      className='text-hyperlink mt-3 flex items-center gap-2'
                    >
                      {fileData.filename}
                      <IconEye size={20} />
                    </a>
                  )}
                  <div className='text-dark-grey mt-1 text-sm'>
                    We accept .doc .docx, .pdf files, no password protected, up
                    to 3MB
                  </div>
                </div>
              </div>
            </RadioGroup>
          </div>

          <div>
            <div className='mb-3 text-lg font-bold'>
              Cover Letter{' '}
              <span className='text-dark-grey text-base font-normal'>
                (Optional)
              </span>
            </div>
            <div className='mb-3'>
              What skills, work projects or achievements make you a strong
              candidate?
            </div>
            <Textarea
              maxLength={500}
              onChange={(e) => onChangeField('coverLetter', e.target.value)}
              placeholder='Details and specific examples will make your application stronger...'
              classNames={{
                input: 'text-base h-[120px]',
              }}
            />
            <div className='text-dark-grey'>
              {fields.coverLetter?.length || 0} of 500 characters remaining
            </div>
          </div>
          <Button
            loading={loading}
            onClick={() => handleSubmit(onSubmit)}
            className='w-full'
            size='large'
          >
            Send my CV
          </Button>
        </div>
      </div>
      <CancelApply
        opened={show}
        onClose={() => setShow(false)}
        onBack={() => router.back()}
      />

      {modalSuccessVisible && <ApplyJobSuccessModal />}
    </div>
  );
};

export default ApplyJob;
