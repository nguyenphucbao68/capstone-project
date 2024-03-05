'use client';

import Infor from '@/components/ProfilePage/Infor';
import Navigation from '@/components/ProfilePage/Navigation';
import RatingCard from '@/components/ProfilePage/RatingCard';

export default function ProfilePage() {
  return (
    <div className='scroll-smooth bg-[#f2f2f2]  focus:scroll-auto'>
      <Navigation selected='profile' />

      {/* content */}
      <main className=' bg-[#f2f2f2]  py-[24px]'>
        <div className='flex flex-row flex-wrap items-start justify-center gap-[24px]'>
          {/* left content*/}
          <RatingCard percent={90} />
          {/* right content*/}
          <Infor />
        </div>
      </main>
    </div>
  );
}
