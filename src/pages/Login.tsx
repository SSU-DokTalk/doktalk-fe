import axios from 'axios';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import naverIcon from '@/assets/images/naver.svg';
import kakaoIcon from '@/assets/images/kakao.svg';
import googleIcon from '@/assets/images/google.svg';
import facebookIcon from '@/assets/images/facebook.svg';

import { setUser } from '@/stores/user';
import { useAppDispatch } from '@/stores/hooks';
import { LoginUserInfoType } from '@/types';
import { initialLoginUserInfo } from '@/types/initialValue';

const NAVER_CLIENT_ID = import.meta.env.VITE_NAVER_CLIENT_ID;
const KAKAO_CLIENT_ID = import.meta.env.VITE_KAKAO_CLIENT_ID;
const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
const FACEBOOK_CLIENT_ID = import.meta.env.VITE_FACEBOOK_CLIENT_ID;
const REDIRECT_URI = import.meta.env.VITE_REDIRECT_URI;

function Login() {
  const [userInfo, setUserInfo] =
    useState<LoginUserInfoType>(initialLoginUserInfo);
  const { t } = useTranslation();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const doLogin = async () => {
    await axios.post('/api/user/login', userInfo).then(async (res) => {
      const {
        id,
        name,
        role,
      }: { id: number; name: string; role: 'USER' | 'ADMIN' } = res.data;
      const token = res.headers.authorization;
      axios.defaults.headers.common['Authorization'] = token;
      await dispatch(
        setUser({
          id: id,
          name: name,
          role: role,
        })
      );
    });

    navigate('/');
  };

  const nonce = () => {
    return Math.random().toString(36).substring(3, 14);
  };

  const doNaverLogin = () => {
    window.location.href = `https://nid.naver.com/oauth2.0/authorize?client_id=${NAVER_CLIENT_ID}&redirect_uri=${REDIRECT_URI}/naver&response_type=code&state=${nonce()}`;
  };

  const doKakaoLogin = () => {
    window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_CLIENT_ID}&redirect_uri=${REDIRECT_URI}/kakao&response_type=code&scope=profile_nickname,profile_image,account_email`;
  };

  const doGoogleLogin = () => {
    window.location.href = `https://accounts.google.com/o/oauth2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${REDIRECT_URI}/google&response_type=code&scope=https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email`;
  };

  const doFacebookLogin = () => {
    window.location.href = `https://www.facebook.com/v16.0/dialog/oauth?client_id=${FACEBOOK_CLIENT_ID}&redirect_uri=${REDIRECT_URI}/facebook&state=${nonce()}&scope=public_profile,email`;
  };

  return (
    <div id='login'>
      <div className='login-container w-[350px] md:w-[460px]'>
        <Link to={'/'} className='logo-container'>
          <div className='logo dok'>독</div>
          <div className='logo colon'>:</div>
          <div className='logo talk'>TALK</div>
        </Link>
        <div className='login-form'>
          <div className='login-box'>
            <input
              type='email'
              className='login-input'
              placeholder={t('page.login.email')}
              value={userInfo.email}
              onChange={(e) =>
                setUserInfo({
                  ...userInfo,
                  email: e.target.value,
                })
              }
            />
          </div>
          <div className='login-box'>
            <input
              type='password'
              className='login-input'
              placeholder={t('page.login.password')}
              value={userInfo.password}
              onChange={(e) =>
                setUserInfo({
                  ...userInfo,
                  password: e.target.value,
                })
              }
            />
          </div>
          <button className='login-button' onClick={doLogin}>
            {t('page.login.login')}
          </button>
        </div>
        <div className='additional-container'>
          <div className='checkbox-container'>
            <input type='checkbox' name='' id='keep-login' />
            <label htmlFor='keep-login'>{t('page.login.keep-login')}</label>
            <input type='checkbox' name='' id='save-id' />
            <label htmlFor='save-id'>{t('page.login.save-id')}</label>
          </div>
          <div className='find-myinfo'>
            <div className='myinfo'>{t('page.login.find-id')}</div>
            <div className='divider'>|</div>
            <div className='myinfo'>{t('page.login.find-password')}</div>
          </div>
        </div>
        <div className='social-login-box'>
          <div className='social-login-text-container'>
            <hr />
            <div className='social-login-text'>
              {t('page.login.social-login-text')}
            </div>
            <hr />
          </div>
          <div className='social-login-container'>
            <img
              src={naverIcon}
              alt='naver'
              className='social-login-button naver'
              onClick={doNaverLogin}
            />
            <img
              src={kakaoIcon}
              alt='kakao'
              className='social-login-button kakao'
              onClick={doKakaoLogin}
            />
            <img
              src={googleIcon}
              alt='google'
              className='social-login-button google'
              onClick={doGoogleLogin}
            />
            <img
              src={facebookIcon}
              alt='facebook'
              className='social-login-button facebook'
              onClick={doFacebookLogin}
            />
          </div>
        </div>
        <div className='register-container'>
          <button
            className='register-button'
            onClick={() => navigate('/register')}
          >
            {t('page.login.register')}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
