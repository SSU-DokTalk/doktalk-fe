import { useTranslation } from 'react-i18next';

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className='!bg-gray-800 !text-white !mt-12 !py-12 !px-6'>
      <div className='!max-w-6xl !mx-auto'>
        <div className='!grid !grid-cols-1 md:!grid-cols-4 !gap-8'>
          {/* 회사 정보 */}
          <div className='!col-span-1 md:!col-span-2'>
            <h3 className='!text-xl !font-bold !mb-4'>DokTalk</h3>
            <p className='!text-gray-300 !mb-4'>
              {t('footer.company.description')}
              <br />
              {t('footer.company.motto')}
            </p>
            <div className='!text-sm !text-gray-400'>
              <p>
                {t('footer.company.address')}:{' '}
                {t('footer.company.address_value')}
              </p>
              <p>{t('footer.company.email')}: doktalk.official@gmail.com</p>
              <p>{t('footer.company.phone')}: ???-????-????</p>
            </div>
          </div>

          {/* 서비스 */}
          <div>
            <h4 className='!text-lg !font-semibold !mb-4'>
              {t('footer.services.title')}
            </h4>
            <ul className='!space-y-2 !text-gray-300'>
              <li>
                <a
                  href='/debate'
                  className='hover:!text-white !transition-colors'
                >
                  {t('footer.services.debate')}
                </a>
              </li>
              <li>
                <a
                  href='/summary'
                  className='hover:!text-white !transition-colors'
                >
                  {t('footer.services.summary')}
                </a>
              </li>
              <li>
                <a
                  href='/post'
                  className='hover:!text-white !transition-colors'
                >
                  {t('footer.services.post')}
                </a>
              </li>
              <li>
                <a
                  href='/search'
                  className='hover:!text-white !transition-colors'
                >
                  {t('footer.services.search')}
                </a>
              </li>
            </ul>
          </div>

          {/* 고객지원 */}
          <div>
            <h4 className='!text-lg !font-semibold !mb-4'>
              {t('footer.support.title')}
            </h4>
            <ul className='!space-y-2 !text-gray-300'>
              <li>
                <a href='/faq' className='hover:!text-white !transition-colors'>
                  {t('footer.support.faq')}
                </a>
              </li>
              <li>
                <a
                  href='/notice'
                  className='hover:!text-white !transition-colors'
                >
                  {t('footer.support.notice')}
                </a>
              </li>
              <li>
                <a
                  href='/contact'
                  className='hover:!text-white !transition-colors'
                >
                  {t('footer.support.contact')}
                </a>
              </li>
              <li>
                <a
                  href='/terms'
                  className='hover:!text-white !transition-colors'
                >
                  {t('footer.support.terms')}
                </a>
              </li>
              <li>
                <a
                  href='/privacy'
                  className='hover:!text-white !transition-colors'
                >
                  {t('footer.support.privacy')}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* 하단 저작권 */}
        <div className='!border-t !border-gray-700 !mt-8 !pt-6 !flex !flex-col md:!flex-row !justify-between !items-center'>
          <div className='!text-gray-400 !text-sm !mb-4 md:!mb-0'>
            {t('footer.copyright.text')}
          </div>
          <div className='!flex !space-x-4 !text-gray-400 !text-sm'>
            <span>{t('footer.version.label')} 1.0.0</span>
            <span>|</span>
            <span>{t('footer.version.last_update')}: 2024.12.25</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
