import React from 'react';

import SpringCard from '@/components/BlogPage/SpringCard';

function AuthorPage() {
  return (
    <main>
      <section className='scroll-smooth bg-[#f2f2f2] focus:scroll-auto'>
        <div className='container-xxl py-10 sm:px-6 lg:px-8'>
          {/* Author infor */}
          <div className='flex flex-col items-center justify-center'>
            <img
              alt='author'
              src='https://itviec.com/blog/wp-content/uploads/2022/08/IMG_2677-200x150.jpg'
              className='h-20 w-20 rounded-full'
            />
            <h1 className='mt-2 text-[32px] text-black'>Linh Khanh</h1>
            <p className='text-dark-grey text-[16px] italic'>Content Writer</p>
            <p className='mt-2 w-2/3 text-center text-[15px] font-[400] leading-normal text-black'>
              Với hơn 1 năm kinh nghiệm chuyên nghiên cứu và cập nhật xu hướng
              công nghệ thông tin, Linh mang đến các nội dung mới mẻ về các xu
              hướng công nghệ như AI, ChatGPT, điện toán đám mây…, các bài phỏng
              vấn chuyên gia IT ở các vị trí mới như UX Designer, Technical
              Writer, hay các sự kiện công nghệ thông tin hữu ích, cùng với kỹ
              năng nghiên cứu, tổng hợp kiến thức tổng quát về các công nghệ,
              công cụ nền tảng như JavaScript, TypeScript, Testing, Firebase,
              Linux, Figma,…
            </p>
          </div>
          {/* News */}
          <div className='mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 '>
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
        </div>
      </section>
    </main>
  );
}

export default AuthorPage;
