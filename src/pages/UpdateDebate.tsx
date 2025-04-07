import { useEffect, forwardRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { faImage } from '@fortawesome/free-solid-svg-icons';
import UploadFiles from '@/components/base/UploadFiles';
import { ACCEPTABLE } from '@/common/variables';
import { DebateType, FileType } from '@/types/data';
import { InitialDebate } from '@/types/initialValue';
import { range } from '@/functions';
import { useTranslation } from 'react-i18next';
import IonIcon from '@reacticons/ionicons';
import axios from 'axios';
import { getMonth, getYear } from 'date-fns';
import DatePicker from 'react-datepicker';

import BookSearchDropdown from '@/components/dropdown/BookSearchDropdown';
import CategoryDropdown from '@/components/dropdown/CategoryChipDropdown';

const years = range(10 + getYear(new Date()) - 2025, 2025, 1);
const months = [
  'function.time.months.1',
  'function.time.months.2',
  'function.time.months.3',
  'function.time.months.4',
  'function.time.months.5',
  'function.time.months.6',
  'function.time.months.7',
  'function.time.months.8',
  'function.time.months.9',
  'function.time.months.10',
  'function.time.months.11',
  'function.time.months.12',
];

function UpdateDebate() {
  const { debate_id } = useParams();

  const [debateData, setDebateData] = useState<DebateType>({
    ...InitialDebate,
    limit: 2,
    price: 1000,
  });

  const [files, setFiles] = useState<File[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState<FileType[]>([]);

  const { t } = useTranslation();
  const navigate = useNavigate();

  const CustomDatePicker = forwardRef<any, any>(
    ({ value, onClick, className }, ref) => (
      <div className={className} onClick={onClick} ref={ref}>
        <span className='date-text'>{value}</span>
        <IonIcon name='calendar-outline' className='sort-by-icon' />
      </div>
    )
  );

  useEffect(() => {
    if (parseInt(debate_id ?? '0') == 0) return;
    axios.get(`/api/debate/${debate_id}`).then((res) => {
      let { data }: { data: DebateType } = res;
      data.held_at = new Date(data.held_at);
      setDebateData(data);
      setUploadedFiles(data.files ?? []);
    });
  }, [debate_id]);

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
              directory: 'debate',
            },
          })
          .then((res) => res.data);
      })
    );

    console.log({
      title: debateData.title,
      location: debateData.location,
      link: debateData.link,
      held_at: debateData.held_at,
      isbn: debateData.isbn,
      category: debateData.category,
      limit: debateData.limit,
      files: uploadedFiles.concat(fileRes),
      content: debateData.content,
      price: debateData.price,
    });

    await axios
      .put(`/api/debate/${debate_id}`, {
        title: debateData.title,
        location: debateData.location,
        link: debateData.link,
        held_at: debateData.held_at,
        isbn: debateData.isbn,
        category: debateData.category,
        limit: debateData.limit,
        files: fileRes,
        content: debateData.content,
        price: debateData.price,
      })
      .then(() => {
        navigate(`/debate/${debate_id}`);
      });
  };

  return (
    <div id='create-debate-page'>
      <div className='container mx-4! w-full md:w-[65%]'>
        <h1>토론방 수정하기</h1>
        <div className='input-container__title'>
          <input
            type='text'
            placeholder='제목을 입력해주세요'
            value={debateData.title}
            onChange={(e) => {
              setDebateData((prev) => {
                return { ...prev, title: e.target.value };
              });
            }}
          />
        </div>
        <div className='input-container'>
          <label
            htmlFor='location'
            className='w-22 text-base! md:w-1/5 md:text-xl!'
          >
            모임 장소
          </label>
          <div className='input-box grow'>
            <input
              id='location'
              type='text'
              placeholder='모일 장소를 입력해주세요'
              value={debateData.location}
              onChange={(e) => {
                setDebateData((prev) => {
                  return { ...prev, location: e.target.value };
                });
              }}
              className='placeholder:text-base'
            />
          </div>
        </div>
        <div className='input-container'>
          <label
            htmlFor='link'
            className='w-22 text-base! md:w-1/5 md:text-xl!'
          >
            온라인 링크
          </label>
          <div className='input-box grow flex-col'>
            <input
              id='link'
              type='url'
              placeholder='온라인 모임일 경우 참여 링크를 입력해주세요'
              value={debateData.link}
              onChange={(e) => {
                setDebateData((prev) => {
                  return { ...prev, link: e.target.value };
                });
              }}
              className='peer placeholder:text-base invalid:border-b-2! invalid:border-red-500 invalid:text-red-600'
            />
            <div className='hidden text-sm! peer-invalid:block'>
              https://url 형식으로 적어주세요
            </div>
          </div>
        </div>
        <div className='input-container'>
          <label
            htmlFor='held_at'
            className='w-22 text-base! md:w-1/5 md:text-xl!'
          >
            모임 시간
          </label>
          <div className='input-box grow'>
            <DatePicker
              selected={debateData.held_at}
              onChange={(date) =>
                setDebateData((prev) => {
                  return { ...prev, held_at: date ?? new Date() };
                })
              }
              dateFormat='yyyy/MM/dd hh:mm aa'
              minDate={new Date()}
              maxDate={new Date(`${getYear(new Date()) + 10}-12-31`)}
              customInput={<CustomDatePicker className='custom-input' />}
              showDisabledMonthNavigation
              showTimeSelect
              renderCustomHeader={({
                date,
                changeYear,
                changeMonth,
                decreaseMonth,
                increaseMonth,
                prevMonthButtonDisabled,
                nextMonthButtonDisabled,
              }) => (
                <div
                  style={{
                    margin: 10,
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                >
                  <button
                    onClick={decreaseMonth}
                    disabled={prevMonthButtonDisabled}
                  >
                    {'<'}
                  </button>
                  <select
                    value={getYear(date)}
                    onChange={({ target: { value } }) =>
                      changeYear(parseInt(value))
                    }
                  >
                    {years.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>

                  <select
                    value={months[getMonth(date)]}
                    onChange={({ target: { value } }) =>
                      changeMonth(months.indexOf(value))
                    }
                  >
                    {months.map((option) => (
                      <option key={option} value={option}>
                        {t(option)}
                      </option>
                    ))}
                  </select>

                  <button
                    onClick={increaseMonth}
                    disabled={nextMonthButtonDisabled}
                  >
                    {'>'}
                  </button>
                </div>
              )}
            />
          </div>
        </div>
        <div className='input-container'>
          <label
            htmlFor='book'
            className='w-22 text-base! md:w-1/5 md:text-xl!'
          >
            도서 선택
          </label>
          <BookSearchDropdown
            setBookIsbnData={setDebateData}
            bookTitle={debateData.book.title}
          />
        </div>
        <div className='input-container'>
          <label
            htmlFor='category'
            className='w-22 text-base! md:w-1/5 md:text-xl!'
          >
            카테고리
          </label>

          <CategoryDropdown data={debateData} setData={setDebateData} />
        </div>

        <div className='input-container'>
          <label
            htmlFor='limit'
            className='w-22 text-base! md:w-1/5 md:text-xl!'
          >
            인원 제한
          </label>
          <div className='input-box-short'>
            <input
              id='limit'
              type='number'
              placeholder='0'
              value={debateData.limit}
              min={0}
              onChange={(e) => {
                setDebateData((prev) => {
                  return { ...prev, limit: parseInt(e.target.value) };
                });
              }}
            />
          </div>
          <span>명</span>
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
          value={debateData.content}
          placeholder='나누고 싶은 이야기를 적어주세요'
          onChange={(e) =>
            setDebateData((prev) => ({ ...prev, content: e.target.value }))
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
            value={debateData.price}
            onChange={(e) => {
              setDebateData((prev) => {
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

export default UpdateDebate;
