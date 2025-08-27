export default function Footer() {
  return (
    <footer className='!bg-gray-800 !text-white !mt-12 !py-12 !px-6'>
      <div className='!max-w-6xl !mx-auto'>
        <div className='!grid !grid-cols-1 md:!grid-cols-4 !gap-8'>
          {/* 회사 정보 */}
          <div className='!col-span-1 md:!col-span-2'>
            <h3 className='!text-xl !font-bold !mb-4'>DokTalk</h3>
            <p className='!text-gray-300 !mb-4'>
              독서토론과 도서 요약을 통해 지식을 나누고 성장하는 플랫폼입니다.
              <br />
              함께 읽고, 함께 토론하며, 함께 성장해요.
            </p>
            <div className='!text-sm !text-gray-400'>
              <p>주소: 서울특별시 동작구 상도동 사당로 46 숭실대학교 창의관</p>
              <p>이메일: doktalk.official@gmail.com</p>
              <p>전화: ???-????-????</p>
            </div>
          </div>

          {/* 서비스 */}
          <div>
            <h4 className='!text-lg !font-semibold !mb-4'>서비스</h4>
            <ul className='!space-y-2 !text-gray-300'>
              <li>
                <a
                  href='/debate'
                  className='hover:!text-white !transition-colors'
                >
                  독서토론
                </a>
              </li>
              <li>
                <a
                  href='/summary'
                  className='hover:!text-white !transition-colors'
                >
                  도서요약
                </a>
              </li>
              <li>
                <a
                  href='/post'
                  className='hover:!text-white !transition-colors'
                >
                  게시판
                </a>
              </li>
              <li>
                <a
                  href='/search'
                  className='hover:!text-white !transition-colors'
                >
                  도서검색
                </a>
              </li>
            </ul>
          </div>

          {/* 고객지원 */}
          <div>
            <h4 className='!text-lg !font-semibold !mb-4'>고객지원</h4>
            <ul className='!space-y-2 !text-gray-300'>
              <li>
                <a href='/faq' className='hover:!text-white !transition-colors'>
                  자주묻는질문
                </a>
              </li>
              <li>
                <a
                  href='/notice'
                  className='hover:!text-white !transition-colors'
                >
                  공지사항
                </a>
              </li>
              <li>
                <a
                  href='/contact'
                  className='hover:!text-white !transition-colors'
                >
                  문의하기
                </a>
              </li>
              <li>
                <a
                  href='/terms'
                  className='hover:!text-white !transition-colors'
                >
                  이용약관
                </a>
              </li>
              <li>
                <a
                  href='/privacy'
                  className='hover:!text-white !transition-colors'
                >
                  개인정보처리방침
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* 하단 저작권 */}
        <div className='!border-t !border-gray-700 !mt-8 !pt-6 !flex !flex-col md:!flex-row !justify-between !items-center'>
          <div className='!text-gray-400 !text-sm !mb-4 md:!mb-0'>
            © 2024 DokTalk. All rights reserved.
          </div>
          <div className='!flex !space-x-4 !text-gray-400 !text-sm'>
            <span>버전 1.0.0</span>
            <span>|</span>
            <span>마지막 업데이트: 2024.12.25</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
