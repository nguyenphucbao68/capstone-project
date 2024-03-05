import React, { useState } from 'react';

import Card from '@/components/ProfilePage/Card';
import { useLocale } from '@/locale';

import ModalAboutMe from './Modal/ModalAboutMe';

function AboutMe() {
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
        title={t('About Me')}
        description={t('Introduce your strengths and years of experience')}
        imageUrl='https://itviec.com/assets/profile/about_me_no_info-c7c9aa8f95cc149ec7646e171c59c2d261d0c9d62da0f5b1fff75886691bd8e9.svg'
        onToggle={showModal ? closeModal : openModal} // Sử dụng onToggle để mở hoặc đóng modal
      />
      {/* Modal */}
      {showModal && <ModalAboutMe closeModal={closeModal} />}
    </div>
  );
}

export default AboutMe;
