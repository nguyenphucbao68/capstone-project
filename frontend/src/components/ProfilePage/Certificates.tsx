import React, { useState } from 'react';

import Card from '@/components/ProfilePage/Card';
import { useLocale } from '@/locale';

import ModalCertificates from './Modal/ModalCertificates';

function Certificates() {
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
        title={t('Certificates')}
        description={t(
          'Provides evidence of your specific expertise and skills'
        )}
        imageUrl='https://itviec.com/assets/profile/certificate_no_info-26fedfa95c272adfe65f1136c3c04973002bea978cc21f91d04f7ce81caeda3f.svg'
        onToggle={showModal ? closeModal : openModal}
      />
      {showModal && <ModalCertificates closeModal={closeModal} />}
    </div>
  );
}

export default Certificates;
