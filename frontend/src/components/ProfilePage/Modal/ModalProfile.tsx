import Image from 'next/image';
import React, { useState } from 'react';

import { Button } from '@/components/Button';
import { IconCamera, IconTrash2, IconX } from '@/components/Icons';
import { useLocale } from '@/locale';

interface ModalProps {
  avatarSrc: string;
  closeModal: () => void;
}

const Modal: React.FC<ModalProps> = ({ avatarSrc, closeModal }) => {
  const [image, setImage] = useState<string | null>(null);
  const { t } = useLocale();

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    }
  };

  const deleteImage = () => {
    setImage(null);
  };

  return (
    <div className='fixed inset-0 z-10 flex items-center justify-center bg-[#000000] bg-opacity-50 transition-opacity duration-1000'>
      <div className='h-[550px] w-[800px]  rounded-lg bg-white py-4'>
        <div className='flex flex-row justify-between px-6'>
          <h2>{t('Personal details')}</h2>
          <IconX onClick={() => closeModal()} className='cursor-pointer' />
        </div>
        <hr className='mt-4 h-[1px] w-full border-none bg-gray-200' />
        <div className='h-[420px] overflow-y-auto'>
          <div className='px-6 py-6'>
            {/* avatar */}
            <div className='mt-8 flex flex-col items-center justify-center'>
              {image ? (
                <img
                  src={image}
                  alt='Uploaded Image'
                  className='h-28 w-28 rounded-full'
                />
              ) : (
                <Image
                  width={110}
                  height={110}
                  className='rounded-full'
                  alt='Avatar Profile'
                  src={avatarSrc}
                />
              )}
              <input
                type='file'
                accept='image/*'
                onChange={handleImageUpload}
                className=' hidden'
                id='fileInput'
              />
              <div className='mt-6 flex flex-row gap-2'>
                <label
                  htmlFor='fileInput'
                  className='text-red flex cursor-pointer items-center text-[16px]'
                >
                  <IconCamera className='h-4' />
                  {t('Edit')}
                </label>
                {image && (
                  <label
                    onClick={deleteImage}
                    className='flex cursor-pointer items-center text-[16px]'
                  >
                    <IconTrash2 className='h-4' />
                    {t('Delete')}
                  </label>
                )}
              </div>
            </div>

            <div className='mt-5 flex flex-col gap-2'>
              {/* Full name */}
              <div>
                <p>
                  {t('Full name')} <span className='text-red'>*</span>
                </p>
                <input
                  type='text'
                  id='default-input'
                  className='focus:border-light-red focus:ring-light-red block w-full rounded-lg border border-gray-300 p-3.5 text-sm text-gray-900'
                  placeholder={t('Full name')}
                  required
                />
              </div>
              {/* Title */}
              <div>
                <p>
                  {t('Title')} <span className='text-red'>*</span>
                </p>
                <input
                  type='text'
                  id='default-input'
                  className='focus:border-light-red focus:ring-light-red block w-full rounded-lg border border-gray-300 p-3.5 text-sm text-gray-900'
                  placeholder={t('Title')}
                  required
                />
              </div>
              {/* Email and Phone number */}
              <div className='flex flex-row justify-center gap-4'>
                <div className='w-full'>
                  <p>
                    {t('Email address')} <span className='text-red'>*</span>
                  </p>
                  <input
                    type='email'
                    id='default-input'
                    className='focus:border-light-red focus:ring-light-red block w-full rounded-lg border border-gray-300 p-3.5 text-sm text-gray-900'
                    placeholder={t('Email address')}
                    required
                  />
                </div>
                <div className='w-full'>
                  <p>
                    {t('Phone number')} <span className='text-red'>*</span>
                  </p>
                  <input
                    type='tel'
                    id='default-input'
                    className='focus:border-light-red focus:ring-light-red block w-full rounded-lg border border-gray-300 p-3.5 text-sm text-gray-900'
                    placeholder={t('Phone number')}
                    required
                  />
                </div>
              </div>
              {/* birthday and Phone gender */}
              <div className='flex flex-row justify-center gap-4'>
                <div className='w-full'>
                  <p>
                    {t('Date of Birth')} <span className='text-red'>*</span>
                  </p>
                  <input
                    type='date'
                    id='default-input'
                    className='focus:border-light-red focus:ring-light-red block w-full rounded-lg border border-gray-300 p-3.5 text-sm text-gray-900'
                    required
                  />
                </div>
                <div className='w-full'>
                  <p>{t('Gender')}</p>
                  <select
                    name='gender'
                    id='gender'
                    className='focus:border-light-red focus:ring-light-red block w-full rounded-lg border border-gray-300 p-3.5 text-sm text-gray-900'
                  >
                    <option value='Male'>{t('Male')}</option>
                    <option value='Female'>{t('Female')}</option>
                    <option value='Others'>{t('Others')}</option>
                  </select>
                </div>
              </div>
              {/* province and Phone address */}
              <div className='flex flex-row justify-center gap-4'>
                <div className='w-full'>
                  <p>
                    {t('Current province/city')}
                    <span className='text-red'>*</span>
                  </p>
                  <select
                    name='province'
                    id='province'
                    className='focus:border-light-red focus:ring-light-red block w-full rounded-lg border border-gray-300 p-3.5 text-sm text-gray-900'
                  >
                    <option value='hochiminh'>Ho Chi Minh</option>
                    <option value='hanoi'>Ha Noi</option>
                    <option value='danang'>Da Nang</option>
                    <option value='others'>{t('Others')}</option>
                  </select>
                </div>
                <div className='w-full'>
                  <p>{t('Address')}</p>
                  <input
                    type='email'
                    id='default-input'
                    className='focus:border-light-red focus:ring-light-red block w-full rounded-lg border border-gray-300 p-3.5 text-sm text-gray-900'
                    placeholder={t('Address (Street, district,...)')}
                    required
                  />
                </div>
              </div>
              {/* Personal Link */}
              <div>
                <p>{t('Personal link')}</p>
                <input
                  type='url'
                  id='default-input'
                  className='focus:border-light-red focus:ring-light-red block w-full rounded-lg border border-gray-300 p-3.5 text-sm text-gray-900'
                  placeholder={t('Personal link (Linkedin, porfolio,...)')}
                  required
                />
              </div>
            </div>
          </div>
        </div>
        <hr className='h-[1px] w-full border-none bg-gray-200' />
        {/* Save & Cancel */}
        <div className='px-6 py-3 text-end'>
          <Button
            intent='transparent'
            className='hover:text-dark-grey h-[36px] rounded px-12 py-2  text-center text-[16px] font-[600] hover:bg-gray-100'
            onClick={() => closeModal()}
          >
            {t('Cancel')}
          </Button>
          <Button
            onClick={closeModal}
            className='hover:text-dark-grey hover:bg-dark-red h-[36px] rounded px-12  py-2 text-center text-[16px] font-[600]'
          >
            {t('Save')}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
