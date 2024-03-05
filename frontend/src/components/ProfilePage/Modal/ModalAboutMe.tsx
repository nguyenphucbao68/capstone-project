import React, { useState } from 'react';

import { Button } from '@/components/Button';
import { IconPenTool, IconX } from '@/components/Icons';
import { useLocale } from '@/locale';

import TextEditor from '../TextEditor';

interface ModalProps {
  closeModal: () => void;
}

const Modal: React.FC<ModalProps> = ({ closeModal }) => {
  const { t } = useLocale();

  return (
    <div className='fixed inset-0 z-10 flex items-center justify-center bg-[#000000] bg-opacity-50 transition-opacity duration-1000'>
      <div className='h-[550px] w-[800px]  rounded-lg bg-white py-4'>
        <div className='flex flex-row justify-between px-6'>
          <h2>{t('About Me')}</h2>
          <IconX onClick={() => closeModal()} className='cursor-pointer' />
        </div>
        <hr className='mt-4 h-[1px] w-full border-none bg-gray-200' />
        <div className='h-[420px] overflow-y-auto'>
          <div className='px-6 py-4'>
            <div className='mt-3 flex flex-col '>
              <div className='flex flex-row items-center gap-x-2'>
                <div className='bg-orange rounded p-1'>
                  <IconPenTool className='h-3 w-3 text-white' />
                </div>
                <p>
                  <span className='text-orange text-[17px] font-[800]'>
                    Tips:{' '}
                  </span>
                  {t(
                    'Summarize your professional experience, highlight your skills and your strengths.'
                  )}
                </p>
              </div>
              <TextEditor />
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
