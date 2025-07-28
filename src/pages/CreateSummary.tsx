import { useState } from 'react';
import UploadFiles from '@/components/base/UploadFiles';
import IonIcon from '@reacticons/ionicons';
import { InitialSummary } from '@/types/initialValue';
import { SummaryType } from '@/types/data';
import { ACCEPTABLE } from '@/common/variables';
import { faImage } from '@fortawesome/free-regular-svg-icons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import BookSearchDropdown from '@/components/dropdown/BookSearchDropdown';
import CategoryDropdown from '@/components/dropdown/CategoryChipDropdown';
import { useTranslation } from 'react-i18next';

function CreateSummary() {
  const [summaryData, setSummaryData] = useState<SummaryType>({
    ...InitialSummary,
  });

  const [files, setFiles] = useState<File[]>([]);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const doSubmit = async () => {
    const fileRes = await Promise.all(
      files.map(async (file) => {
        const formData = new FormData();
        formData.append('file', file);
        return await axios
          .post('/api/file', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
            params: {
              directory: 'summary',
            },
          })
          .then((res) => res.data);
      })
    );

    await axios
      .post('/api/summary', {
        isbn: summaryData.isbn,
        title: summaryData.title,
        free_content: summaryData.free_content,
        charged_content: summaryData.charged_content,
        price: summaryData.price,
        files: fileRes,
        category: summaryData.category,
      })
      .then(() => {
        navigate('/summary');
      });
  };

  return (
    <div id='create-summary-page'>
      <div className='container mx-4! w-full md:w-[65%]'>
        <h1>{t('page.create-summary.title')}</h1>
        <div className='input-container__title'>
          <input
            type='text'
            className='title-input'
            placeholder={t('page.create-summary.input.title-placeholder')}
            value={summaryData.title}
            onChange={(e) =>
              setSummaryData((prev) => ({ ...prev, title: e.target.value }))
            }
          />
        </div>
        <div className='input-container'>
          <label
            htmlFor='book'
            className='w-22 text-base! md:w-1/5 md:text-xl!'
          >
            {t('page.create-summary.input.book-select')}
          </label>
          <BookSearchDropdown setBookIsbnData={setSummaryData} />
        </div>

        <div className='input-container'>
          <label
            htmlFor='category'
            className='w-22 text-base! md:w-1/5 md:text-xl!'
          >
            {t('page.create-summary.input.category')}
          </label>

          <CategoryDropdown data={summaryData} setData={setSummaryData} />
        </div>

        <UploadFiles
          setFiles={setFiles}
          accept={ACCEPTABLE.join()}
          buttonText={t('page.create-summary.button.file-add')}
          buttonIcon={faImage}
        />
        <textarea
          value={summaryData.free_content}
          placeholder={t('page.create-summary.input.free-content-placeholder')}
          onChange={(e) =>
            setSummaryData((prev) => ({
              ...prev,
              free_content: e.target.value,
            }))
          }
        />
        <textarea
          value={summaryData.charged_content}
          placeholder={t(
            'page.create-summary.input.charged-content-placeholder'
          )}
          onChange={(e) =>
            setSummaryData((prev) => ({
              ...prev,
              charged_content: e.target.value,
            }))
          }
        />
        <div className='input-container'>
          <IonIcon
            name='information-circle-outline'
            className='icon'
            style={{
              height: '30px',
              width: '30px',
            }}
          />
          <label htmlFor='price' className='price-label text-base! md:text-xl!'>
            {t('page.create-summary.input.price')}
          </label>
          <input
            id='price'
            type='number'
            className='price-input grow'
            step={1000}
            min={0}
            placeholder={t('page.create-summary.input.price-placeholder')}
            value={summaryData.price}
            onChange={(e) => {
              setSummaryData((prev) => {
                return { ...prev, price: parseInt(e.target.value) };
              });
            }}
          />
        </div>
        <div className='button-container'>
          <button className='temp'>
            {t('page.create-summary.button.temp-save')}
          </button>
          <button className='submit' onClick={doSubmit}>
            {t('page.create-summary.button.submit')}
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateSummary;
