import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import UploadFiles from '@/components/base/UploadFiles';
import IonIcon from '@reacticons/ionicons';
import { InitialSummary } from '@/types/initialValue';
import { FileType, SummaryType } from '@/types/data';
import { ACCEPTABLE } from '@/common/variables';
import { faImage } from '@fortawesome/free-regular-svg-icons';
import axios from 'axios';
import BookSearchDropdown from '@/components/dropdown/BookSearchDropdown';
import CategoryDropdown from '@/components/dropdown/CategoryChipDropdown';

function UpdateSummary() {
  const { summary_id } = useParams();
  const [summaryData, setSummaryData] = useState<SummaryType>(InitialSummary);

  const [files, setFiles] = useState<File[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState<FileType[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (parseInt(summary_id ?? '0') == 0) return;
    axios.get(`/api/summary/${summary_id}`).then((res) => {
      let { data }: { data: SummaryType } = res;
      setSummaryData(data);
      setUploadedFiles(data.files ?? []);
    });
  }, [summary_id]);

  const doUpdate = async () => {
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
      .put(`/api/summary/${summary_id}`, {
        isbn: summaryData.isbn,
        title: summaryData.title,
        free_content: summaryData.free_content,
        charged_content: summaryData.charged_content,
        price: summaryData.price,
        files: uploadedFiles.concat(fileRes),
        category: summaryData.category,
      })
      .then(() => {
        navigate(`/summary/${summary_id}`);
      });
  };

  return (
    <div id='create-summary-page'>
      <div className='container mx-4! w-full md:w-[65%]'>
        <h1>요약 수정하기</h1>
        <div className='input-container__title'>
          <input
            type='text'
            className='title-input'
            placeholder='제목을 입력해주세요.'
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
            도서 선택
          </label>
          <BookSearchDropdown
            bookTitle={summaryData.book.title}
            setBookIsbnData={setSummaryData}
          />
        </div>

        <div className='input-container'>
          <label
            htmlFor='category'
            className='w-22 text-base! md:w-1/5 md:text-xl!'
          >
            카테고리
          </label>

          <CategoryDropdown data={summaryData} setData={setSummaryData} />
        </div>

        <UploadFiles
          setFiles={setFiles}
          uploadedFiles={uploadedFiles}
          setUploadedFiles={setUploadedFiles}
          accept={ACCEPTABLE.join()}
          buttonText='파일 추가'
          buttonIcon={faImage}
        />
        <textarea
          value={summaryData.free_content}
          placeholder='미리보기로 공유하고 싶은 내용을 작성해주세요.'
          onChange={(e) =>
            setSummaryData((prev) => ({
              ...prev,
              free_content: e.target.value,
            }))
          }
        />
        <textarea
          value={summaryData.charged_content}
          placeholder='유료로 공유하고 싶은 내용을 작성해주세요.'
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
            가격
          </label>
          <input
            id='price'
            type='number'
            className='price-input grow'
            step={1000}
            min={0}
            placeholder='가격을 입력해주세요'
            value={summaryData.price}
            onChange={(e) => {
              setSummaryData((prev) => {
                return { ...prev, price: parseInt(e.target.value) };
              });
            }}
          />
        </div>
        <div className='button-container'>
          <button className='submit' onClick={doUpdate}>
            수정 완료
          </button>
        </div>
      </div>
    </div>
  );
}

export default UpdateSummary;
