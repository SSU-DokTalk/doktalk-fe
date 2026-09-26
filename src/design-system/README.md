# 讀:TALK 디자인 시스템

vanilla-extract 기반 토큰과 컴포넌트예요. 새로 만드는 화면은 여기 있는 것만 써요.

```tsx
import { Button, Tabs, TextField, vars } from '@/design-system';
```

## 둘러보기

```bash
yarn storybook
```

- 툴바의 **언어**에서 몽골어·한국어·영어를 바꿔 문구 길이를 확인해요.
- **Accessibility** 패널에서 axe 검사 결과를 봐요.
- Storybook은 앱과 같은 전역 CSS(main.scss, tailwind.css)를 불러와요. 기존 스타일 위에서 깨지는 곳이 있으면 여기서 먼저 드러나요.

## 구성

| 폴더                  | 내용                                                                                                                                                            |
| --------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `tokens/theme.css.ts` | 색·반경·그림자·글꼴 CSS 변수. 이름이 `--dt-*`로 고정돼 있어요.                                                                                                  |
| `tokens/scale.ts`     | 간격, 기준점(`mq`), 글자 크기(`typeScale`), z-index                                                                                                             |
| `styles/`             | 포커스 링, 스크린 리더 전용 텍스트, 글꼴                                                                                                                        |
| `components/`         | Button, IconButton, Chip, Badge, TextField/Textarea, Select, Tabs, SegmentedControl, Menu, Dialog, Avatar, BookCover, Card, Text, EmptyState, Skeleton, Spinner |

## 규칙

- **화면 코드에서 색은 토큰으로만** 써요. `vars.color.brand`처럼 쓰고, 16진수 값을 직접 적지 않아요.
- **Steel(`infoIcon`)은 아이콘 전용**이에요. 텍스트에는 대비가 충분한 `info`를 써요.
- **아이콘은 lucide-react**를 써요. 버튼 크기에 맞춰 아이콘 크기가 자동으로 정해져요.
- **아이콘만 있는 버튼**은 `IconButton`을 쓰고 `aria-label`을 꼭 넣어요(타입에서 필수).
- **링크를 버튼처럼** 보이게 할 때는 `<Link className={buttonStyles({ variant: 'secondary' })}>`처럼 써요.
- **문구는 props로** 넘겨요. 컴포넌트 안에서 i18n을 부르지 않아요.

## 기존 코드와 같이 쓰는 동안

- 새 스타일은 cascade layer 없이 클래스 하나로 적용돼요. 기존 SCSS가 layer 밖에 있어서, 새 스타일을 layer에 넣으면 오히려 기존 요소 선택자(`button {}` 등)에 지기 때문이에요. 레거시를 걷어낸 뒤 `@layer`로 옮겨요.
- 기존 `_reset.scss`가 `button:focus { outline: none }`으로 포커스 표시를 지워서, 컴포넌트는 `:focus-visible`로 포커스 링을 다시 그려요.
- 기존 `tailwind.css`가 400px 미만 화면에서 `html` 글자 크기를 15px로 줄여요. 그 규칙을 지우기 전까지는 좁은 화면에서 글자가 약 6% 작게 보여요. 입력칸은 iOS 확대를 막으려고 16px로 고정했어요.
- `vite.config.ts`의 `tailwindSkippingVirtualCss`는 @tailwindcss/vite 4.0.x가 디스크에 없는 CSS(vanilla-extract 결과물, Storybook 가상 파일)에서 멈추는 문제를 피하는 우회예요. Tailwind를 올리면 지워요.

## 앱 셸 (`src/shell`)

모든 화면을 감싸는 틀이에요. 디자인 시스템 컴포넌트로 만들었어요.

| 라우트 묶음                         | 틀                                             |
| ----------------------------------- | ---------------------------------------------- |
| `/`                                 | `LandingLayout` — 기존 랜딩 + 기존 푸터        |
| 목록·상세·작성, `/mypage/library`   | `SideColumnLayout` — 왼쪽 칼럼(lg 이상) + 본문 |
| `/mypage`, `/user/:id`, `/settings` | `PageLayout` — 본문 + 한 줄 푸터               |

- 데스크톱(md 이상)은 `TopNav`, 모바일은 `MobileTopBar`를 보여줘요. 로그인하면 모바일에 `BottomTabs`가 고정돼요.
- 로그인·회원가입·결제 결과 화면은 셸 밖에 있어요.

## 기존 색과 연결

- `tailwind.css`의 `--color-brand1~5`와 `_variables.scss`의 `$brand-color1~5`가 `--dt-*` 토큰을 가리켜요. 값은 전과 같아서 화면은 그대로예요.
- CSS 변수라서 `color.adjust()` 같은 Sass 색 함수에는 넣을 수 없어요. 어두운 색이 필요하면 `var(--dt-color-brand-active)`처럼 토큰을 써요.
