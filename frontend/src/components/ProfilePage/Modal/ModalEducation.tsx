import React, { ChangeEvent, useState } from 'react';

import { Button } from '@/components/Button';
import { Checkbox } from '@/components/Checkbox';
import { IconX } from '@/components/Icons';
import { cn } from '@/lib/classNames';
import { useLocale } from '@/locale';

interface ModalProps {
  closeModal: () => void;
}

const ModalEducation: React.FC<ModalProps> = ({ closeModal }) => {
  const [checked, setChecked] = useState(false);
  const { t } = useLocale();
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setChecked(e.target.checked);
  };
  return (
    <div className='fixed inset-0 z-10 flex items-center justify-center bg-[#000000] bg-opacity-50 transition-opacity duration-1000'>
      <div className='h-[550px] w-[800px]  rounded-lg bg-white py-4'>
        <div className='flex flex-row justify-between px-6'>
          <h2>{t('Education')}</h2>
          <IconX onClick={() => closeModal()} className='cursor-pointer' />
        </div>
        <hr className='mt-4 h-[1px] w-full border-none bg-gray-200' />
        <div className='h-[420px] overflow-y-auto'>
          <div className='px-6 py-3'>
            <div className=' flex flex-col gap-3'>
              {/* School */}
              <div>
                <p>
                  {t('School')} <span className='text-red'>*</span>
                </p>
                <input
                  type='text'
                  id='default-input'
                  className='focus:border-light-red focus:ring-light-red block w-full rounded-lg border border-gray-300 p-3.5 text-sm text-gray-900'
                  placeholder={t('School')}
                  required
                />
              </div>
              {/* Title */}
              <div>
                <p>
                  {t('Major')} <span className='text-red'>*</span>
                </p>
                <input
                  type='text'
                  id='default-input'
                  className='focus:border-light-red focus:ring-light-red block w-full rounded-lg border border-gray-300 p-3.5 text-sm text-gray-900'
                  placeholder={t('Major')}
                  required
                />
              </div>
              <div className='flex items-center gap-2'>
                <Checkbox checked={checked} onChange={handleChange} />
                <span>{t('I am currently studying here')}</span>
              </div>
              {/* From and To */}
              <div className='flex flex-row justify-center gap-4'>
                {/* FROM */}
                <div className='w-full'>
                  <p>
                    {t('From')} <span className='text-red'>*</span>
                  </p>
                  <div className='flex flex-row items-end justify-center gap-4'>
                    <div className='w-full'>
                      <p className='text-dark-grey text-[12px]'>{t('Month')}</p>
                      <select
                        name='month'
                        id='mont'
                        className='focus:border-light-red focus:ring-light-red block w-full rounded-lg border border-gray-300 p-3.5 text-sm text-gray-900'
                      >
                        <option value='volvo'>01</option>
                        <option value='volvo'>02</option>
                        <option value='volvo'>03</option>
                        <option value='volvo'>04</option>
                        <option value='volvo'>05</option>
                        <option value='volvo'>06</option>
                        <option value='volvo'>07</option>
                        <option value='volvo'>08</option>
                        <option value='volvo'>09</option>
                        <option value='volvo'>10</option>
                        <option value='volvo'>11</option>
                        <option value='others'>12</option>
                      </select>
                    </div>
                    <div className='w-full'>
                      <p className='text-dark-grey text-[12px]'>{t('Year')}</p>
                      <select
                        name='year'
                        id='year'
                        className='focus:border-light-red focus:ring-light-red block w-full rounded-lg border border-gray-300 p-3.5 text-sm text-gray-900'
                      >
                        {Array.from(
                          { length: new Date().getFullYear() - 1999 },
                          (_, index) => {
                            const year = new Date().getFullYear() - index;
                            return (
                              <option key={year} value={year}>
                                {year}
                              </option>
                            );
                          }
                        )}
                      </select>
                    </div>
                  </div>
                </div>
                {/* FROM */}
                <div className='w-full'>
                  <p>
                    {t('To')} <span className='text-red'>*</span>
                  </p>
                  <div className='flex flex-row items-end justify-center gap-4'>
                    <div className='w-full'>
                      <p className='text-dark-grey text-[12px]'>{t('Month')}</p>
                      <select
                        name='month'
                        id='mont'
                        disabled={checked}
                        className={cn(
                          'focus:border-light-red focus:ring-light-red block w-full rounded-lg border border-gray-300 p-3.5 text-sm text-gray-900',
                          {
                            'bg-dark-grey': checked === true,
                            '': checked === false,
                          }
                        )}
                      >
                        <option value='volvo'>01</option>
                        <option value='volvo'>02</option>
                        <option value='volvo'>03</option>
                        <option value='volvo'>04</option>
                        <option value='volvo'>05</option>
                        <option value='volvo'>06</option>
                        <option value='volvo'>07</option>
                        <option value='volvo'>08</option>
                        <option value='volvo'>09</option>
                        <option value='volvo'>10</option>
                        <option value='volvo'>11</option>
                        <option value='others'>12</option>
                      </select>
                    </div>
                    <div className='w-full'>
                      <p className='text-dark-grey text-[12px]'>{t('Year')}</p>
                      <select
                        name='year'
                        id='year'
                        disabled={checked}
                        className={cn(
                          'focus:border-light-red focus:ring-light-red block w-full rounded-lg border border-gray-300 p-3.5 text-sm text-gray-900',
                          {
                            'bg-dark-grey': checked === true,
                            '': checked === false,
                          }
                        )}
                      >
                        {Array.from(
                          { length: new Date().getFullYear() - 1999 + 4 },
                          (_, index) => {
                            const year = new Date().getFullYear() + index - 24;
                            return (
                              <option key={year} value={year}>
                                {year}
                              </option>
                            );
                          }
                        )}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              {/* Additional */}
              <div>
                <p>{t('Additional')}</p>
                <input
                  type='text'
                  id='default-input'
                  className='focus:border-light-red focus:ring-light-red block w-full rounded-lg border border-gray-300 p-3.5 text-sm text-gray-900'
                  placeholder={t('Additional details')}
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

export default ModalEducation;
