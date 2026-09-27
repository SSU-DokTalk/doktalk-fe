# 결제 파트

https://www.tosspayments.com/about/fee
https://docs.tosspayments.com/guides/v2/payment-widget/integration?frontend=react&backend=node

- 결제 위젯 클라이언트 키는 `VITE_TOSS_CLIENT_KEY`로 넣어요. CI는 같은 이름의 GitHub secret을 읽어요. 비워 두면 토스 문서의 테스트 키를 써서 실제 결제는 되지 않아요.
- 백엔드 `TOSS_SECRET_KEY`와 같은 상점의 키 한 쌍이어야 해요. 결제를 마치면 `/checkout/success`가 `POST /purchase/confirm`으로 서버에 확인을 요청하고, 서버가 금액을 확인하고 토스에 승인을 요청한 뒤 구매 기록을 남겨요.
- 가상계좌는 입금 알림(웹훅)을 받지 않아서 서버가 발급을 바로 취소해요. 토스 상점 관리자에서 결제 위젯의 가상계좌를 꺼 두세요.

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
});
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react';

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
});
```

### TODO

도서 검색시 기본으로 몇개 띄어두기.

추천은 내서재에 있는 책 기준으로 추천받기
