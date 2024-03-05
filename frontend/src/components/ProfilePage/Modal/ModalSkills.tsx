import { Combobox, InputBase, Tooltip, useCombobox } from '@mantine/core';
import React, { useState } from 'react';

import { Button } from '@/components/Button';
import {
  IconChevronDown,
  IconInfo,
  IconSearch,
  IconX,
} from '@/components/Icons';
import { cn } from '@/lib/classNames';
import { useLocale } from '@/locale';

interface ModalProps {
  closeModal: () => void;
}

interface skill {
  id: number;
  name: string;
  level?: string;
}

const skill: skill[] = [
  { id: 1, name: '.NET', level: '' },
  { id: 2, name: 'ReactJS', level: '' },
  { id: 3, name: 'PHP', level: '' },
  { id: 4, name: 'NodeJS', level: '' },
  { id: 5, name: 'Java', level: '' },
  { id: 6, name: 'System Admin', level: '' },
  { id: 7, name: 'C++', level: '' },
];

const levels: string[] = ['Beginner', 'Intermediate', 'Excellent'];

const ModalSkills: React.FC<ModalProps> = ({ closeModal }) => {
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });
  const { t } = useLocale();

  const [selected, setSelected] = useState<skill | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [skillList, setskillList] = useState<skill[]>([]);
  const [errorMessage, setErrorMessage] = useState<boolean>(false);
  const isSearchDisabled = skillList.length >= 20;

  let countSkill: number = skillList.length;

  const beginnerSkills = skillList.filter(
    (skill) => skill.level === 'Beginner'
  );

  const intermediateSkills = skillList.filter(
    (skill) => skill.level === 'Intermediate'
  );

  const excellentSkills = skillList.filter(
    (skill) => skill.level === 'Excellent'
  );

  // filter skill
  const filteredCompanies =
    query === ''
      ? skill.filter((comp) => !skillList.find((c) => c.id === comp.id))
      : skill.filter((comp) =>
          comp.name
            .toLowerCase()
            .replace(/\s+/g, '')
            .includes(query.toLowerCase().replace(/\s+/g, ''))
        );

  // select skill
  const handleSelectskill = (skill: skill) => {
    if (skillList.length < 20) {
      setSelected(skill);
      setErrorMessage(false);
    }
  };

  // select level
  const handleSelectLevel = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedLevel(event.target.value);
  };

  // add skill
  const handleAddSkill = () => {
    if (
      selected &&
      skillList.length < 20 &&
      !skillList.some((skill) => skill.id === selected.id)
    ) {
      setskillList((prevList) => [
        ...prevList,
        { ...selected, level: selectedLevel || 'Beginner' },
      ]);
    } else {
      setErrorMessage(true);
      return;
    }
    setQuery('');
    setErrorMessage(false);
  };

  // delete skill
  const handleDeleteskill = (id: number) => {
    setskillList((prevList) => prevList.filter((skill) => skill.id !== id));
  };

  return (
    <div className='fixed inset-0 z-10 flex items-center justify-center bg-[#000000] bg-opacity-50 transition-opacity duration-1000'>
      <div className='h-[550px] w-[800px]  rounded-lg bg-white py-4'>
        <div className='flex flex-row justify-between px-6'>
          <h2>{t('Skills')}</h2>
          <IconX onClick={() => closeModal()} className='cursor-pointer' />
        </div>
        <hr className='mt-4 h-[1px] w-full border-none bg-gray-200' />
        <div className='h-[420px] overflow-y-auto'>
          <div className='px-6 py-4'>
            <div className=' flex flex-col gap-5'>
              {/* Select Skills */}
              <div className='flex flex-row gap-2'>
                <div className='w-2/4'>
                  <Combobox
                    store={combobox}
                    onOptionSubmit={(val) => {
                      const skill = filteredCompanies.find(
                        (c) => `${c.id}` === val
                      ) as skill;
                      setSelected(skill);
                      setQuery(skill.name);
                      combobox.closeDropdown();
                    }}
                  >
                    <Combobox.Target>
                      <InputBase
                        disabled={isSearchDisabled}
                        size='lg'
                        leftSection={
                          <div
                            className={cn(
                              'flex h-full flex-1 items-center justify-center',
                              { 'bg-dark-gray': isSearchDisabled }
                            )}
                          >
                            <IconSearch size={16} />
                          </div>
                        }
                        classNames={{ input: 'pl-16' }}
                        rightSection={<IconChevronDown />}
                        rightSectionPointerEvents='none'
                        onClick={() => combobox.openDropdown()}
                        onFocus={() => combobox.openDropdown()}
                        onBlur={() => {
                          combobox.closeDropdown();
                          setSelected(selected || null);
                        }}
                        onChange={(event) => {
                          combobox.updateSelectedOptionIndex();
                          setQuery(event.currentTarget.value);
                        }}
                        placeholder={t('Search skills')}
                        value={query}
                      />
                    </Combobox.Target>

                    <Combobox.Dropdown>
                      <Combobox.Options>
                        {filteredCompanies.length > 0 ? (
                          filteredCompanies.map((skill) => (
                            <Combobox.Option
                              key={skill.id}
                              className={cn(
                                'relative cursor-default select-none py-2 pl-12 pr-4 text-gray-900',
                                {
                                  // 'bg-red-50': active,
                                }
                              )}
                              value={`${skill.id}`}
                              onClick={() => handleSelectskill(skill)}
                            >
                              <span
                                className={cn('block truncate font-normal', {
                                  'font-medium': selected?.id === skill.id,
                                })}
                              >
                                {skill.name}
                              </span>
                            </Combobox.Option>
                          ))
                        ) : (
                          <Combobox.Empty>Nothing found.</Combobox.Empty>
                        )}
                      </Combobox.Options>
                    </Combobox.Dropdown>
                  </Combobox>
                  {errorMessage && (
                    <p className='text-red mt-1 text-[12px]'>
                      {t('Please select the skill')}
                    </p>
                  )}
                  <p className='text-dark-grey mt-1 text-[12px]'>
                    {countSkill} / 20 {t('skills')}
                  </p>
                </div>
                <div className='w-1/4'>
                  <select
                    name='level'
                    id='level'
                    className='focus:border-light-red focus:ring-light-red block w-full rounded-md border border-gray-300 p-3.5 text-sm text-gray-900'
                    onChange={handleSelectLevel}
                  >
                    {levels.map((level) => (
                      <option key={level} value={level}>
                        {level}
                      </option>
                    ))}
                  </select>
                </div>
                <div className='w-1/4'>
                  <Button
                    intent='secondary'
                    className='w-full '
                    onClick={handleAddSkill}
                  >
                    {t('Add')}
                  </Button>
                </div>
              </div>

              {/* Excellent */}
              <div className='flex flex-col gap-3'>
                <div className='flex flex-row items-center gap-2'>
                  <p className='text-[18px] font-[600]'>Excellent</p>
                  <Tooltip label='More than 3 years of experience'>
                    <IconInfo color='#A3A3A3' size={16} />
                  </Tooltip>
                </div>
                <div className='mt-1'>
                  {excellentSkills.length > 0 ? (
                    excellentSkills.map((skill) => (
                      <div key={skill.id} className='mb-2 inline-block'>
                        <div className='border-silver-grey mr-4 flex flex-row justify-between gap-x-4 rounded-full border p-2'>
                          {skill.name}
                          <button
                            className='text-dark-grey text-[14px]'
                            onClick={() => handleDeleteskill(skill.id)}
                          >
                            x
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className='text-silver-grey'>{t('No skills listed')}</p>
                  )}
                </div>
              </div>

              {/* Intermediate */}
              <div className='flex flex-col gap-3'>
                <div className='flex flex-row items-center gap-2'>
                  <p className='text-[18px] font-[600]'>Intermediate</p>
                  <Tooltip label='1-3 years of experience'>
                    <IconInfo color='#A3A3A3' size={16} />
                  </Tooltip>
                </div>
                <div className='mt-1'>
                  {intermediateSkills.length > 0 ? (
                    intermediateSkills.map((skill) => (
                      <div key={skill.id} className='mb-2 inline-block'>
                        <div className='border-silver-grey mr-4 flex flex-row justify-between gap-x-4 rounded-full border p-2'>
                          {skill.name}
                          <button
                            className='text-dark-grey text-[14px]'
                            onClick={() => handleDeleteskill(skill.id)}
                          >
                            x
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className='text-silver-grey'>{t('No skills listed')}</p>
                  )}
                </div>
              </div>

              {/* Beginner */}
              <div className='flex flex-col gap-3'>
                <div className='flex flex-row items-center gap-2'>
                  <p className='text-[18px] font-[600]'>Beginner</p>
                  <Tooltip label='Less than 1 year of experience'>
                    <IconInfo color='#A3A3A3' size={16} />
                  </Tooltip>
                </div>
                <div className='mt-1'>
                  {beginnerSkills.length > 0 ? (
                    beginnerSkills.map((skill) => (
                      <div key={skill.id} className='mb-2 inline-block'>
                        <div className='border-silver-grey mr-4 flex flex-row justify-between gap-x-4 rounded-full border p-2'>
                          {skill.name}
                          <button
                            className='text-dark-grey text-[14px]'
                            onClick={() => handleDeleteskill(skill.id)}
                          >
                            x
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className='text-silver-grey'>{t('No skills listed')}</p>
                  )}
                </div>
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

export default ModalSkills;
