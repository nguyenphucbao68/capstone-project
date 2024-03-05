import React, { useState } from 'react';

import Card from '@/components/ProfilePage/Card';
import { useLocale } from '@/locale';

import ModalEducation from './Modal/ModalEducation';

function Education() {
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
        title={t('Education')}
        description={t('Share your background education')}
        imageUrl='https://itviec.com/assets/profile/education_no_info-73d159c5c97d90ff0cdd22764fdde92a6ecefaa39c1f68775ba3e126e8ee6140.svg'
        onToggle={showModal ? closeModal : openModal}
      />
      {/* Modal */}
      {showModal && <ModalEducation closeModal={closeModal} />}
    </div>
  );
}

export default Education;
