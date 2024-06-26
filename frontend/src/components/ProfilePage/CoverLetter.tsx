import { useMutation, useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';

import { Button } from '@/components/Button';
import Card from '@/components/ProfilePage/Card';
import { GET_COVERLETTER_USER, UPDATE_COVERLETTER_USER } from '@/graphql/auth';
import useAuthData from '@/hooks/useAuthData';
import { useLocale } from '@/locale';

export default function CoverLetter() {
  const { authUser } = useAuthData();
  const { loading, error, data } = useQuery(GET_COVERLETTER_USER, {
    variables: { userId: authUser?.id },
  });
  const [isOpening, setIsOpening] = useState<boolean>(false);
  const [edited, setEdited] = useState<string>('');
  const { t } = useLocale();

  useEffect(() => {
    if (!loading && !error && data) {
      const coverLetter = data?.user?.attributes?.coverLetter?.toString();
      if (coverLetter !== null && coverLetter !== undefined) {
        setEdited(coverLetter);
      }
    }
  }, [loading, error, data]);

  const handleOpen = () => {
    setIsOpening(true);
  };

  const handleCancel = () => {
    setIsOpening(false);
  };

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const inputText = event.target.value;
    setEdited(inputText);
  };

  const [updateCoverLetter] = useMutation(UPDATE_COVERLETTER_USER);

  const handleSave = async () => {
    if (edited?.length >= 500) {
      alert('Cover letter must be 500 characters or less!');
      return;
    }

    try {
      await updateCoverLetter({
        variables: {
          input: {
            attributes: {
              coverLetter: edited,
            },
          },
          updateUserId: authUser?.id,
        },
      });
      setIsOpening(false);
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  return (
    <div>
      {edited?.length !== 0 ? (
        !isOpening ? (
          <div className='mt-6 rounded-md bg-[#ffff] shadow-md'>
            <div className='flex flex-col flex-wrap px-7 pb-16 pt-6'>
              <div className='flex flex-row flex-wrap justify-between'>
                <h3>{t('Cover Letter')}</h3>
                <span className='ml-4 cursor-pointer'>
                  <button onClick={() => handleOpen()}>
                    <svg
                      width='20px'
                      height='20px'
                      viewBox='0 0 24 24'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                      stroke='#db1f1f'
                    >
                      <g id='SVGRepo_bgCarrier' strokeWidth='0' />

                      <g
                        id='SVGRepo_tracerCarrier'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                      />

                      <g id='SVGRepo_iconCarrier'>
                        <path
                          d='M21.2799 6.40005L11.7399 15.94C10.7899 16.89 7.96987 17.33 7.33987 16.7C6.70987 16.07 7.13987 13.25 8.08987 12.3L17.6399 2.75002C17.8754 2.49308 18.1605 2.28654 18.4781 2.14284C18.7956 1.99914 19.139 1.92124 19.4875 1.9139C19.8359 1.90657 20.1823 1.96991 20.5056 2.10012C20.8289 2.23033 21.1225 2.42473 21.3686 2.67153C21.6147 2.91833 21.8083 3.21243 21.9376 3.53609C22.0669 3.85976 22.1294 4.20626 22.1211 4.55471C22.1128 4.90316 22.0339 5.24635 21.8894 5.5635C21.7448 5.88065 21.5375 6.16524 21.2799 6.40005V6.40005Z'
                          stroke='#ed1b2f'
                          strokeWidth='2'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                        />
                        <path
                          d='M11 4H6C4.93913 4 3.92178 4.42142 3.17163 5.17157C2.42149 5.92172 2 6.93913 2 8V18C2 19.0609 2.42149 20.0783 3.17163 20.8284C3.92178 21.5786 4.93913 22 6 22H17C19.21 22 20 20.2 20 18V13'
                          stroke='#ed1b2f'
                          strokeWidth='2'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                        />
                      </g>
                    </svg>
                  </button>
                </span>
              </div>
              <hr className='mt-7 h-[1px] w-full border-none bg-gray-200' />
              <p className='mt-5'>{edited}</p>
            </div>
          </div>
        ) : (
          <div className='mt-6 rounded-md bg-[#ffff] shadow-md'>
            <div className='flex flex-col flex-wrap px-7 pb-16 pt-6'>
              <h3>{t('Cover Letter')}</h3>
              <hr className='mt-7 h-[1px] w-full border-none bg-gray-200' />
              <p className='mt-6 italic text-gray-400'>
                {t(
                  'Tips: Start by describing what you bring to the table and why this job excites you'
                )}
              </p>
              <div className='mt-6'>
                <textarea
                  id='message'
                  rows={4}
                  className={`block w-full rounded-lg border ${
                    edited.length >= 500 ? 'border-red-600' : 'border-gray-300'
                  } bg-gray-50 p-2.5 text-sm text-gray-900 ${
                    edited.length >= 500
                      ? 'focus:border-red-300 focus:ring-red-300'
                      : ''
                  } focus:border-green-300 focus:ring-green-300`}
                  placeholder='Write your thoughts here...'
                  value={edited}
                  onChange={handleChange}
                  maxLength={500}
                ></textarea>
              </div>
              <p className='mt-1 text-gray-400'>
                {edited?.length}/500 {t('characters')}
              </p>
              <div className=' flex flex-row flex-wrap items-center justify-end gap-3'>
                <Button
                  intent='transparent'
                  className='hover:text-dark-grey h-[42px] rounded px-12 py-2  text-center text-[16px] font-[600] hover:bg-gray-100'
                  onClick={() => handleCancel()}
                >
                  {t('Cancel')}
                </Button>
                <Button
                  intent='primary'
                  size='large'
                  className='h-[42px] px-12 text-[16px] font-[600]'
                  onClick={() => handleSave()}
                >
                  {t('Save')}
                </Button>
              </div>
            </div>
          </div>
        )
      ) : isOpening ? (
        <div className='mt-6 rounded-md bg-[#ffff] shadow-md'>
          <div className='flex flex-col flex-wrap px-7 pb-16 pt-6'>
            <h3>{t('Cover Letter')}</h3>
            <hr className='mt-7 h-[1px] w-full border-none bg-gray-200' />
            <p className='mt-6 italic text-gray-400'>
              {t(
                'Tips: Start by describing what you bring to the table and why this job excites you'
              )}
            </p>
            <div className='mt-6'>
              <textarea
                id='message'
                rows={4}
                className={`block w-full rounded-lg border ${
                  edited.length >= 500 ? 'border-red-600' : 'border-gray-300'
                } bg-gray-50 p-2.5 text-sm text-gray-900 ${
                  edited.length >= 500
                    ? 'focus:border-red-300 focus:ring-red-300'
                    : ''
                } focus:border-green-300 focus:ring-green-300`}
                placeholder='Write your thoughts here...'
                value={edited}
                onChange={handleChange}
                maxLength={500}
              ></textarea>
            </div>
            <p className='mt-1 text-gray-400'>
              {edited?.length}/500 {t('characters')}
            </p>
            <div className=' flex flex-row flex-wrap items-center justify-end gap-3'>
              <Button
                intent='transparent'
                className='hover:text-dark-grey h-[42px] rounded px-12 py-2  text-center text-[16px] font-[600] hover:bg-gray-100'
                onClick={() => handleCancel()}
              >
                {t('Cancel')}
              </Button>
              <Button
                intent='primary'
                size='large'
                className='h-[42px] px-12 text-[16px] font-[600]'
                onClick={() => handleSave()}
              >
                {t('Save')}
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <Card
          title='Cover Letter'
          description="Introduce yourself and why you'd make a great hire"
          imageUrl='https://itviec.com/assets/profile/cover_letter_no_info-f9d084dcc48161f6e480d74ea191ad4421e4b7fb2fe89dd2c29a2fdd90f46d49.svg'
          isOpen={true}
          onToggle={() => handleOpen()}
        />
      )}
    </div>
  );
}
