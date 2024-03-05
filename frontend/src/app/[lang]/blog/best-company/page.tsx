'use client';

import Link from 'next/link';

import SpringCard from '@/components/BlogPage/SpringCard';
import { IconYoutube } from '@/components/Icons';

export default function BlogPage() {
  return (
    <main>
      <section className='scroll-smooth bg-[#f2f2f2] focus:scroll-auto'>
        {/* Title */}
        <div className='container-xxl py-8 sm:px-6 lg:px-8'>
          <h1 className='text-[30px]'>Công ty IT tốt nhất Việt Nam</h1>
          <p className='text-rich-grey mt-2 w-3/5 text-[20px] leading-relaxed'>
            Những công ty IT tốt nhất Việt Nam có điều gì đặc biệt? Họ đã phát
            triển như thế nào sau mỗi năm? Cùng khám phá thêm về những công ty
            tuyệt vời này nhé!
          </p>
        </div>

        {/* Title */}
        <div className='container-xxl grid grid-cols-1 gap-4 px-4 py-8 sm:px-6 md:grid-cols-2 lg:grid-cols-3 lg:px-8'>
          {/* left */}
          <div className='col-span-2 grid grid-cols-1 gap-4    md:grid-cols-2 lg:grid-cols-2 '>
            <SpringCard
              imageUrl='https://itviec.com/blog/wp-content/uploads/2023/12/itviec-it-salary-report-2023-2024-mini-press-realease-en-vippro-700x368.png'
              title='ITviec releases “IT Salary Report 2023-2024: Data-driven for better decision making”'
              description='Đọc bản tiếng Việt tại đây. ITviec is excited to announce the launch of our IT salary report: “Salary & Job Expectation of IT Professionals in Vietnam 2023-2024: Data-driven for better decision making”…'
              tags={['Báo cáo lương IT', 'Dành cho nhà tuyển dụng IT']}
              url='#!'
              readTime='2 phút'
            />
            <SpringCard
              imageUrl='https://itviec.com/blog/wp-content/uploads/2022/12/ly-do-nghi-viec-blog-thumbnail-700x368.jpg'
              title='Doanh nghiệp cần lưu ý 3 lý do nghỉ việc thật sự của chuyên gia IT'
              description='Bạn đang đối diện với thực trạng không thể giữ người ở công ty lâu dài? Liệu những lý do như “việc gia đình” có phải là lý do nghỉ việc thật sự? Đọc bài viết này để hiểu rõ…'
              tags={['Báo cáo lương IT', 'Dành cho nhà tuyển dụng IT']}
              url='#!'
              readTime='7 phút'
            />
            <SpringCard
              imageUrl='https://itviec.com/blog/wp-content/uploads/2023/11/mau-cv-an-tuong-blog-thumbnail-vippro-700x368.jpg'
              title='Hướng dẫn viết mẫu CV ấn tượng theo 4 “điểm vàng” mà nhà tuyển dụng chú ý nhất'
              description='Có nhiều nghiên cứu đã được đưa ra về thời gian mà nhà tuyển dụng đọc một CV IT như 6 giây, 25 giây, 3 phút…  nhưng tóm lại là: CV của bạn có thể không được xem kĩ như…'
              tags={['CV IT', 'Ứng tuyển & Thăng tiến']}
              url='#!'
              readTime='10 phút'
            />
            <SpringCard
              imageUrl='https://itviec.com/blog/wp-content/uploads/2023/12/itviec-it-salary-report-2023-2024-mini-press-realease-en-vippro-700x368.png'
              title='ITviec releases “IT Salary Report 2023-2024: Data-driven for better decision making”'
              description='Đọc bản tiếng Việt tại đây. ITviec is excited to announce the launch of our IT salary report: “Salary & Job Expectation of IT Professionals in Vietnam 2023-2024: Data-driven for better decision making”…'
              tags={['Báo cáo lương IT', 'Dành cho nhà tuyển dụng IT']}
              url='#!'
              readTime='2 phút'
            />
            <SpringCard
              imageUrl='https://itviec.com/blog/wp-content/uploads/2022/12/ly-do-nghi-viec-blog-thumbnail-700x368.jpg'
              title='Doanh nghiệp cần lưu ý 3 lý do nghỉ việc thật sự của chuyên gia IT'
              description='Bạn đang đối diện với thực trạng không thể giữ người ở công ty lâu dài? Liệu những lý do như “việc gia đình” có phải là lý do nghỉ việc thật sự? Đọc bài viết này để hiểu rõ…'
              tags={['Báo cáo lương IT', 'Dành cho nhà tuyển dụng IT']}
              url='#!'
              readTime='7 phút'
            />
            <SpringCard
              imageUrl='https://itviec.com/blog/wp-content/uploads/2023/11/mau-cv-an-tuong-blog-thumbnail-vippro-700x368.jpg'
              title='Hướng dẫn viết mẫu CV ấn tượng theo 4 “điểm vàng” mà nhà tuyển dụng chú ý nhất'
              description='Có nhiều nghiên cứu đã được đưa ra về thời gian mà nhà tuyển dụng đọc một CV IT như 6 giây, 25 giây, 3 phút…  nhưng tóm lại là: CV của bạn có thể không được xem kĩ như…'
              tags={['CV IT', 'Ứng tuyển & Thăng tiến']}
              url='#!'
              readTime='10 phút'
            />
            <SpringCard
              imageUrl='https://itviec.com/blog/wp-content/uploads/2022/12/ly-do-nghi-viec-blog-thumbnail-700x368.jpg'
              title='Doanh nghiệp cần lưu ý 3 lý do nghỉ việc thật sự của chuyên gia IT'
              description='Bạn đang đối diện với thực trạng không thể giữ người ở công ty lâu dài? Liệu những lý do như “việc gia đình” có phải là lý do nghỉ việc thật sự? Đọc bài viết này để hiểu rõ…'
              tags={['Báo cáo lương IT', 'Dành cho nhà tuyển dụng IT']}
              url='#!'
              readTime='7 phút'
            />
            <SpringCard
              imageUrl='https://itviec.com/blog/wp-content/uploads/2023/11/mau-cv-an-tuong-blog-thumbnail-vippro-700x368.jpg'
              title='Hướng dẫn viết mẫu CV ấn tượng theo 4 “điểm vàng” mà nhà tuyển dụng chú ý nhất'
              description='Có nhiều nghiên cứu đã được đưa ra về thời gian mà nhà tuyển dụng đọc một CV IT như 6 giây, 25 giây, 3 phút…  nhưng tóm lại là: CV của bạn có thể không được xem kĩ như…'
              tags={['CV IT', 'Ứng tuyển & Thăng tiến']}
              url='#!'
              readTime='10 phút'
            />
            <SpringCard
              imageUrl='https://itviec.com/blog/wp-content/uploads/2023/11/mau-cv-an-tuong-blog-thumbnail-vippro-700x368.jpg'
              title='Hướng dẫn viết mẫu CV ấn tượng theo 4 “điểm vàng” mà nhà tuyển dụng chú ý nhất'
              description='Có nhiều nghiên cứu đã được đưa ra về thời gian mà nhà tuyển dụng đọc một CV IT như 6 giây, 25 giây, 3 phút…  nhưng tóm lại là: CV của bạn có thể không được xem kĩ như…'
              tags={['CV IT', 'Ứng tuyển & Thăng tiến']}
              url='#!'
              readTime='10 phút'
            />
          </div>

          {/* right */}
          <div className='col-span-1 md:col-span-2 lg:col-span-1'>
            <div className='sticky top-0'>
              <div className='rounded-md border border-gray-200 bg-black px-4 py-4'>
                <div className='p-2'>
                  <div className='flex flex-row items-center justify-between'>
                    <h2 className='text-[18px] text-white'>ITviec videos</h2>
                    <Link
                      href={'https://www.youtube.com/c/Itviec'}
                      className='text-red hover:text-dark-text text-[14px] underline underline-offset-4'
                    >
                      Xem tất cả
                    </Link>
                  </div>
                  <div className='flex flex-col items-center gap-4'>
                    {/* video 1 */}
                    <div>
                      <a
                        href='https://www.youtube.com/watch?v=iRL0gIHFAgQ'
                        target='blank'
                        className='relative brightness-75 transition duration-300 ease-in-out hover:brightness-100'
                      >
                        <img
                          src='https://i.ytimg.com/vi/iRL0gIHFAgQ/mqdefault.jpg'
                          alt='HỨNG KHỞI NGÀNH IT TẠI VIỆT NAM CÙNG'
                          className='blog-card-image ls-is-cached lazyloaded w-full transform cursor-pointer   '
                        />
                        <IconYoutube className='hover:text-light-red absolute bottom-16 left-36 h-10 w-10 text-white' />
                        <p className='absolute bottom-0 left-4 w-11/12 truncate text-white'>
                          HỨNG KHỞI NGÀNH IT TẠI VIỆT NAM CÙNG
                        </p>
                      </a>
                    </div>
                    {/* video 2 */}
                    <div>
                      <a
                        href='https://www.youtube.com/watch?v=iR6WtRwoI64'
                        target='blank'
                        className='relative brightness-75 transition duration-300 ease-in-out hover:brightness-100'
                      >
                        <img
                          src='https://i.ytimg.com/vi/iR6WtRwoI64/mqdefault.jpg'
                          alt='Bạn đã sử dụng AI MATCH của ITviec chưa?'
                          className='blog-card-image ls-is-cached lazyloaded w-full transform cursor-pointer   '
                        />
                        <IconYoutube className='hover:text-light-red absolute bottom-16 left-36 h-10 w-10 text-white' />
                        <p className='absolute bottom-0 left-4 w-11/12 truncate text-white'>
                          Bạn đã sử dụng AI MATCH của ITviec chưa?
                        </p>
                      </a>
                    </div>
                    {/* video 3 */}
                    <div>
                      <a
                        href='https://www.youtube.com/watch?v=fiB2Gu6EZ8U'
                        target='blank'
                        className='relative brightness-75 transition duration-300 ease-in-out hover:brightness-100'
                      >
                        <img
                          src='https://i.ytimg.com/vi/fiB2Gu6EZ8U/mqdefault.jpg'
                          alt='Bạn đã sử dụng AI MATCH của ITviec chưa?'
                          className='blog-card-image ls-is-cached lazyloaded w-full transform cursor-pointer   '
                        />
                        <IconYoutube className='hover:text-light-red absolute bottom-16 left-36 h-10 w-10 text-white' />
                        <p className='absolute bottom-0 left-4 w-11/12 truncate text-white'>
                          AI LÀ “IT CHẤT” CHỨ? | IT CHẤT NHƯ BẠN, LÊN ITVIEC
                          THÔI!
                        </p>
                      </a>
                    </div>
                    {/* video 4 */}
                    <div>
                      <a
                        href='https://www.youtube.com/watch?v=8izxES6CG1M'
                        target='blank'
                        className='relative brightness-75 transition duration-300 ease-in-out hover:brightness-100'
                      >
                        <img
                          src='https://i.ytimg.com/vi/8izxES6CG1M/mqdefault.jpg'
                          alt='ITviec Thôi! | CODE CẢ "ĐỜI BỐ", LƯƠNG BẰNG "TUỔI CON"'
                          className='blog-card-image ls-is-cached lazyloaded w-full transform cursor-pointer   '
                        />
                        <IconYoutube className='hover:text-light-red absolute bottom-16 left-36 h-10 w-10 text-white' />
                        <p className='absolute bottom-0 left-4 w-11/12 truncate text-white'>
                          ITviec Thôi! | CODE CẢ "ĐỜI BỐ", LƯƠNG BẰNG "TUỔI CON"
                        </p>
                      </a>
                    </div>
                    {/* video 5 */}
                    <div>
                      <a
                        href='https://www.youtube.com/watch?v=mEDpAyWnEJs'
                        target='blank'
                        className='relative brightness-75 transition duration-300 ease-in-out hover:brightness-100'
                      >
                        <img
                          src='https://i.ytimg.com/vi/mEDpAyWnEJs/mqdefault.jpg'
                          alt='HỨNG KHỞI NGÀNH IT TẠI VIỆT NAM CÙNG'
                          className='blog-card-image ls-is-cached lazyloaded w-full transform cursor-pointer   '
                        />
                        <IconYoutube className='hover:text-light-red absolute bottom-16 left-36 h-10 w-10 text-white' />
                        <p className='absolute bottom-0 left-4 w-11/12 truncate text-white'>
                          ITviec Thôi! | TÌM ĐỒNG NGHIỆP XINH GIÚP CODE LÊN
                          TRÌNH
                        </p>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
