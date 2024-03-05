import dynamic from 'next/dynamic';
import React, { useMemo, useState } from 'react';

import { useLocale } from '@/locale';

import 'react-quill/dist/quill.snow.css';

const TextEditor = () => {
  const [editorValue, setEditorValue] = useState('');
  const { t } = useLocale();

  const ReactQuill = useMemo(
    () => dynamic(() => import('react-quill'), { ssr: false }),
    []
  );

  return (
    <div>
      <div className='border-silver-grey mt-4 h-[290px] overflow-hidden rounded-lg border'>
        <ReactQuill
          value={editorValue}
          onChange={(value) => setEditorValue(value)}
          className='h-full'
        />
      </div>
      <p className='text-silver-grey mt-1'>
        {editorValue.length}/2500 {t('characters')}
      </p>
    </div>
  );
};

export default TextEditor;
