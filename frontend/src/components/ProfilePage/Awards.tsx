import React, { useState } from 'react';

import Card from '@/components/ProfilePage/Card';
import { useLocale } from '@/locale';

import ModalAwards from './Modal/ModalAwards';

function Awards() {
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
        title={t('Awards')}
        description={t('Highlight your awards or recognitions')}
        imageUrl='https://itviec.com/assets/profile/award_no_info-0a31e0f6a55c3e2b6131000b7c09eab0182d74ab3f6461d604ba495d1cd42571.svg'
        onToggle={showModal ? closeModal : openModal}
      />
      {/* Modal */}
      {showModal && <ModalAwards closeModal={closeModal} />}
    </div>
  );
}

export default Awards;
