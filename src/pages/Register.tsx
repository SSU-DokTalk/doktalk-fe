/* eslint-disable @typescript-eslint/no-explicit-any */
// src/pages/SignupPage.tsx
import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

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
  'page.register.interests.politics',
  'page.register.interests.business',
  'page.register.interests.religion',
  'page.register.interests.webtoon',
  'page.register.interests.philosophy',
  'page.register.interests.exhibition',
  'page.register.interests.self-development',
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
  const { t } = useTranslation();

  const onSubmit = async (data: FormData) => {
    if (!data.validation) {
      alert(t('page.register.alerts.validation-required'));
      return;
    }

    if (data.interests.length === 0) {
      alert(t('page.register.alerts.interests-required'));
      return;
    }

    if (!data.agreement1 || !data.agreement2) {
      alert(t('page.register.alerts.agreements-required'));
      return;
    }

    if (data.password.length < 8) {
      alert(t('page.register.alerts.password-length'));
      return;
    }

    if (data.password !== data.passwordConfirmation) {
      alert(t('page.register.alerts.password-mismatch'));
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
      alert(error?.message || t('page.register.alerts.register-error'));
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
      <div>{t('page.register.welcome')}</div>
      <div className='w-[350px] md:w-[460px] flex flex-col gap-16 p-5!'>
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>
          <div className='flex flex-col'>
            <label className='font-bold!'>
              {t('page.register.form.email')}
            </label>
            <input
              className='h-10 p-2 rounded-lg border-2 border-solid border-[gray]'
              {...register('email', {
                required: t('page.register.form.email-required'),
              })}
            />
            {errors.email && <span>{errors.email.message}</span>}
          </div>

          <div className='flex flex-col'>
            <label className='font-bold!'>
              {t('page.register.form.nickname')}
            </label>
            <input
              className='h-10 p-2 rounded-lg border-2 border-solid border-[gray]'
              {...register('nickname', {
                required: t('page.register.form.nickname-required'),
              })}
            />
            {errors.nickname && <span>{errors.nickname.message}</span>}
          </div>

          <div className='flex flex-col gap-1'>
            <label className='font-bold!'>
              {t('page.register.form.password')}
            </label>
            <input
              className='h-10 p-2 rounded-lg border-2 border-solid border-[gray]'
              type='password'
              {...register('password', {
                required: t('page.register.form.password-required'),
                minLength: {
                  value: 8,
                  message: t('page.register.form.password-min'),
                },
              })}
            />
            {errors.password && <span>{errors.password.message}</span>}

            <input
              className='h-10 p-2 rounded-lg border-2 border-solid border-[gray]'
              type='password'
              placeholder={t('page.register.form.password-confirm')}
              {...register('passwordConfirmation', {
                required: t('page.register.form.password-confirm-required'),
                validate: (value) =>
                  value === password || t('page.register.form.password-match'),
              })}
            />
            {errors.passwordConfirmation && (
              <span>{errors.passwordConfirmation.message}</span>
            )}
          </div>

          <div className='flex flex-col gap-4 md:flex-row md:justify-between'>
            <div className='flex flex-col'>
              <label className='font-bold!'>
                {t('page.register.form.birthdate')}
              </label>
              <input
                className='h-10 p-2 rounded-lg border-2 border-solid border-[gray]'
                type='text'
                placeholder='YYYY-MM-DD'
                {...register('birthdate', {
                  required: t('page.register.form.birthdate-required'),
                  pattern: {
                    value: /^\d{4}-\d{2}-\d{2}$/,
                    message: t('page.register.form.birthdate-format'),
                  },
                })}
              />
              {errors.birthdate && <span>{errors.birthdate.message}</span>}
            </div>

            <div className='flex flex-col'>
              <label className='font-bold!'>
                {t('page.register.form.gender')}
              </label>
              <div className='flex gap-1 w-full'>
                <label className='cursor-pointer bg-white flex items-center px-4! py-2! rounded-lg border-2! border-solid border-[gray]!'>
                  <input
                    type='radio'
                    value='male'
                    className='mr-2!'
                    {...register('gender', {
                      required: t('page.register.form.gender-required'),
                    })}
                  />
                  {t('page.register.form.male')}
                </label>
                <label className='cursor-pointer bg-white flex items-center px-4! py-2! rounded-lg! border-2! border-solid! border-[gray]!'>
                  <input
                    type='radio'
                    value='female'
                    className='mr-2!'
                    {...register('gender', {
                      required: t('page.register.form.gender-required'),
                    })}
                  />
                  {t('page.register.form.female')}
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
                alert(t('page.register.form.validation-complete'));
              }}
            >
              {t('page.register.form.validation')}
            </button>
          </div>

          <div className='flex flex-col gap-4'>
            <div>
              <div className='font-bold!'>
                {t('page.register.form.interests')}
              </div>
              <div className='text-[13px]!'>
                {t('page.register.form.interests-description')}
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
                    value={t(selection)}
                    {...register('interests')}
                    className='mr-2!'
                  />
                  {t(selection)}
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
              <label className='font-bold! ml-2!'>
                {t('page.register.form.all-agreements')}
              </label>
            </div>
            <hr className='h-px bg-black'></hr>
            <div className='flex items-center'>
              <input
                type='checkbox'
                {...register('agreement1', {
                  validate: (val) =>
                    val === true || t('page.register.alerts.agreement1-error'),
                })}
              />
              <label className='ml-2!'>
                {t('page.register.form.agreement1')}
              </label>
              <div className='ml-auto! mr-4!'>
                {t('page.register.form.view')}
              </div>
            </div>
            {errors.agreement1 && <span>{errors.agreement1.message}</span>}

            <div className='flex items-center'>
              <input
                type='checkbox'
                {...register('agreement2', {
                  validate: (val) =>
                    val === true || t('page.register.alerts.agreement2-error'),
                })}
              />
              <label className='ml-2!'>
                {t('page.register.form.agreement2')}
              </label>
              <div className='ml-auto! mr-4!'>
                {t('page.register.form.view')}
              </div>
            </div>
            {errors.agreement2 && <span>{errors.agreement2.message}</span>}

            <div className='flex items-center'>
              <input type='checkbox' {...register('agreement3')} />
              <label className='ml-2!'>
                {t('page.register.form.agreement3')}{' '}
              </label>
              <div className='ml-auto! mr-4!'>
                {t('page.register.form.view')}
              </div>
            </div>
          </div>

          <button
            className='w-full bg-[#000080] text-[white] cursor-pointer p-2.5 rounded-[10px] border-[none]'
            type='submit'
          >
            {t('page.register.form.submit')}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
