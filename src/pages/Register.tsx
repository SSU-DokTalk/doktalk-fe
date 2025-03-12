/* eslint-disable @typescript-eslint/no-explicit-any */
// src/pages/SignupPage.tsx
import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';

type FormData = {
  email: string;
  nickname: string;
  password: string;
  passwordConfirmation: string;
  birthdate: string;
  gender: string;
  validation: boolean;
  interests: string[];
  agreement1: boolean;
  agreement2: boolean;
  agreement3: boolean;
  allAgreements: boolean;
};

const SELECTIONS = [
  '정치',
  '경영 / 경제',
  '종교',
  '웹툰',
  '철학',
  '연주회 / 전시회',
  '자기계발',
];

const Register: React.FC = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
  } = useForm<FormData>({
    defaultValues: {
      email: '',
      nickname: '',
      password: '',
      passwordConfirmation: '',
      birthdate: '',
      gender: '',
      validation: false,
      interests: [],
      agreement1: false,
      agreement2: false,
      agreement3: false,
      allAgreements: false,
    },
  });

  const navigate = useNavigate();
  const password = watch('password');

  const onSubmit = async (data: FormData) => {
    if (!data.validation) {
      alert('본인인증을 해주세요');
      return;
    }

    if (data.interests.length === 0) {
      alert('관심분야를 선택해주세요');
      return;
    }

    if (!data.agreement1 || !data.agreement2) {
      alert('필수 약관에 동의해주세요');
      return;
    }

    if (data.password.length < 8) {
      alert('비밀번호는 8자 이상이어야 합니다');
      return;
    }

    if (data.password !== data.passwordConfirmation) {
      alert('비밀번호가 일치하지 않습니다');
      return;
    }

    try {
      axios.post('/api/user/register', data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      navigate('/login');
    } catch (error: any) {
      alert(error?.message || '회원가입 중 오류가 발생했습니다.');
    }
  };

  const handleAllAgreementsChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const checked = e.target.checked;
    setValue('allAgreements', checked);
    setValue('agreement1', checked, { shouldValidate: true });
    setValue('agreement2', checked, { shouldValidate: true });
    setValue('agreement3', checked);
  };

  return (
    <div
      id='register'
      className='flex flex-col gap-[30px] items-center flex-wrap w-full'
    >
      <div className='logo-container'>
        <div className='logo dok'>讀</div>
        <div className='logo colon'>:</div>
        <div className='logo talk'>TALK</div>
      </div>
      <div>독서토론 커뮤니티 독TALK에 오신 것을 환영합니다!</div>
      <div className='w-[350px] md:w-[460px] flex flex-col gap-16 p-5!'>
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>
          <div className='flex flex-col'>
            <label className='font-bold!'>이메일</label>
            <input
              className='h-10 p-2 rounded-lg border-2 border-solid border-[gray]'
              {...register('email', { required: '이메일을 입력해주세요' })}
            />
            {errors.email && <span>{errors.email.message}</span>}
          </div>

          <div className='flex flex-col'>
            <label className='font-bold!'>닉네임</label>
            <input
              className='h-10 p-2 rounded-lg border-2 border-solid border-[gray]'
              {...register('nickname', { required: '닉네임을 입력해주세요' })}
            />
            {errors.nickname && <span>{errors.nickname.message}</span>}
          </div>

          <div className='flex flex-col gap-1'>
            <label className='font-bold!'>비밀번호</label>
            <input
              className='h-10 p-2 rounded-lg border-2 border-solid border-[gray]'
              type='password'
              {...register('password', {
                required: '비밀번호를 입력해주세요',
                minLength: {
                  value: 8,
                  message: '비밀번호는 8자 이상이어야 합니다',
                },
              })}
            />
            {errors.password && <span>{errors.password.message}</span>}

            <input
              className='h-10 p-2 rounded-lg border-2 border-solid border-[gray]'
              type='password'
              placeholder='비밀번호 확인'
              {...register('passwordConfirmation', {
                required: '비밀번호 확인을 입력해주세요',
                validate: (value) =>
                  value === password || '비밀번호가 일치하지 않습니다',
              })}
            />
            {errors.passwordConfirmation && (
              <span>{errors.passwordConfirmation.message}</span>
            )}
          </div>

          <div className='flex flex-col gap-4 md:flex-row md:justify-between'>
            <div className='flex flex-col'>
              <label className='font-bold!'>생년월일</label>
              <input
                className='h-10 p-2 rounded-lg border-2 border-solid border-[gray]'
                type='text'
                placeholder='YYYY-MM-DD'
                {...register('birthdate', {
                  required: '생년월일을 입력해주세요',
                  pattern: {
                    value: /^\d{4}-\d{2}-\d{2}$/,
                    message: '올바른 형식(YYYY-MM-DD)으로 입력해주세요',
                  },
                })}
              />
              {errors.birthdate && <span>{errors.birthdate.message}</span>}
            </div>

            <div className='flex flex-col'>
              <label className='font-bold!'>성별</label>
              <div className='flex gap-1 w-full'>
                <label className='cursor-pointer bg-white flex items-center px-4! py-2! rounded-lg border-2! border-solid border-[gray]!'>
                  <input
                    type='radio'
                    value='male'
                    className='mr-2!'
                    {...register('gender', { required: '성별을 선택해주세요' })}
                  />
                  남자
                </label>
                <label className='cursor-pointer bg-white flex items-center px-4! py-2! rounded-lg! border-2! border-solid! border-[gray]!'>
                  <input
                    type='radio'
                    value='female'
                    className='mr-2!'
                    {...register('gender', { required: '성별을 선택해주세요' })}
                  />
                  여자
                </label>
              </div>
              {errors.gender && <span>{errors.gender.message}</span>}
            </div>
          </div>

          <div className='flex flex-col'>
            <button
              className='h-12 bg-white text-[#000080] border-2 rounded-lg border-solid border-[#000080]'
              type='button'
              onClick={() => {
                // 실제 본인인증 로직 필요
                // 인증 성공 시:
                setValue('validation', true);
                alert('본인인증이 완료되었습니다.');
              }}
            >
              본인인증
            </button>
          </div>

          <div className='flex flex-col gap-4'>
            <div>
              <div className='font-bold!'>관심분야 선택</div>
              <div className='text-[13px]!'>
                선택한 관심분야는 개인 맞춤 도서 추천 / 토론방 매칭에
                사용됩니다.
              </div>
            </div>
            <div className='flex flex-wrap gap-x-1.5 gap-y-1.5 justify-center'>
              {SELECTIONS.map((selection, index) => (
                <label
                  key={index}
                  className='border! cursor-pointer px-6! py-2! rounded-[20px] border-solid border-[#ccc]!'
                >
                  <input
                    type='checkbox'
                    value={selection}
                    {...register('interests')}
                    className='mr-2!'
                  />
                  {selection}
                </label>
              ))}
            </div>
          </div>

          <div className='flex flex-col gap-2'>
            <div className='flex items-center'>
              <input
                type='checkbox'
                {...register('allAgreements')}
                onChange={handleAllAgreementsChange}
              />
              <label className='font-bold! ml-2!'>약관 전체동의</label>
            </div>
            <hr className='h-px bg-black'></hr>
            <div className='flex items-center'>
              <input
                type='checkbox'
                {...register('agreement1', {
                  validate: (val) => val === true || '약관 1에 동의해주세요',
                })}
              />
              <label className='ml-2!'>{'(필수) 약관 1 동의'}</label>
              <div className='ml-auto! mr-4!'>보기</div>
            </div>
            {errors.agreement1 && <span>{errors.agreement1.message}</span>}

            <div className='flex items-center'>
              <input
                type='checkbox'
                {...register('agreement2', {
                  validate: (val) => val === true || '약관 2에 동의해주세요',
                })}
              />
              <label className='ml-2!'>{'(필수) 약관 2 동의'}</label>
              <div className='ml-auto! mr-4!'>보기</div>
            </div>
            {errors.agreement2 && <span>{errors.agreement2.message}</span>}

            <div className='flex items-center'>
              <input type='checkbox' {...register('agreement3')} />
              <label className='ml-2!'>{'(선택) 약관 3 동의'} </label>
              <div className='ml-auto! mr-4!'>보기</div>
            </div>
          </div>

          <button
            className='w-full bg-[#000080] text-[white] cursor-pointer p-2.5 rounded-[10px] border-[none]'
            type='submit'
          >
            회원가입
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
