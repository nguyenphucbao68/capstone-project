import React from 'react';

import ProfileCard from '@/components/ProfilePage/ProfileCard';

import AboutMe from './AboutMe';
import Awards from './Awards';
import Certificates from './Certificates';
import Education from './Education';
import PersonalProject from './PersonalProject';
import Skills from './Skills';
import WorkExperience from './WorkExperience';

function Infor() {
  return (
    <div className='w-full max-w-[calc(100%-48px)] md:w-[900px]'>
      <ProfileCard
        username='John Doe'
        email='johndoe@example.com'
        birthdate='01/01/1990'
        location='New York'
        phoneNumber='123-456-7890'
        gender='Male'
        avatarSrc='https://itviec.com/assets/avatar-default-092d31fefdf639c5a2cad357c47b67a836df63fd29359c2e695a173a3d837389.svg'
        link='https://tailwindcss.com/docs/responsive-design'
      />

      {/* Detail information */}
      <div className='mt-6'>
        <AboutMe />
        <Education />
        <WorkExperience />
        <Skills />
        <PersonalProject />
        <Certificates />
        <Awards />
      </div>
    </div>
  );
}

export default Infor;
