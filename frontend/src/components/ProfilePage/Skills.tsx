import React, { useState } from 'react';

import Card from '@/components/ProfilePage/Card';
import { useLocale } from '@/locale';

import ModalSkills from './Modal/ModalSkills';

function Skills() {
  const [showModal, setShowModal] = useState(false);
  const { t } = useLocale();

  const openModal = () => {
    setShowModal(true);
    document.body.classList.add('overflow-y-hidden');
  };

  const closeModal = () => {
    setShowModal(false);
    document.body.classList.remove('overflow-y-hidden');
  };
  return (
    <div>
      <Card
        title={t('Skills')}
        description={t('Showcase your skills and proficiencies')}
        imageUrl='https://itviec.com/assets/profile/skill_no_info-02f56fa0a5b0ab2ae7d233ceac098f1102a4f774de22f70b0c81fd8e1fb9efbf.svg'
        onToggle={showModal ? closeModal : openModal}
      />
      {/* Modal */}
      {showModal && <ModalSkills closeModal={closeModal} />}
    </div>
  );
}

export default Skills;
