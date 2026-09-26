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
- Storybook은 앱과 같은 토큰·글꼴·전역 기본 스타일(`styles/reset.css`)을 불러와요.

## 구성

| 폴더                  | 내용                                                                                                                                                                      |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `tokens/theme.css.ts` | 색·반경·그림자·글꼴 CSS 변수. 이름이 `--dt-*`로 고정돼 있어요.                                                                                                            |
| `tokens/scale.ts`     | 간격, 기준점(`mq`), 글자 크기(`typeScale`), z-index                                                                                                                       |
| `styles/`             | 전역 기본 스타일(`reset.css`), 글꼴, 포커스 링, 스크린 리더 전용 텍스트                                                                                                   |
| `components/`         | Button, IconButton, Chip, Badge, TextField/Textarea, Select, Checkbox, Tabs, SegmentedControl, Menu, Dialog, Avatar, BookCover, Card, Text, EmptyState, Skeleton, Spinner |

## 규칙

- **화면 코드에서 색은 토큰으로만** 써요. `vars.color.brand`처럼 쓰고, 16진수 값을 직접 적지 않아요.
- **Steel(`infoIcon`)은 아이콘 전용**이에요. 텍스트에는 대비가 충분한 `info`를 써요.
- **아이콘은 lucide-react**를 써요. 버튼 크기에 맞춰 아이콘 크기가 자동으로 정해져요.
- **아이콘만 있는 버튼**은 `IconButton`을 쓰고 `aria-label`을 꼭 넣어요(타입에서 필수).
- **링크를 버튼처럼** 보이게 할 때는 `<Link className={buttonStyles({ variant: 'secondary' })}>`처럼 써요.
- **문구는 props로** 넘겨요. 컴포넌트 안에서 i18n을 부르지 않아요.

## 전역 스타일

- `styles/reset.css`는 Tailwind preflight를 바탕으로 한 기본값이에요. `dt-reset` 레이어 안에 있어서, 레이어 밖에 있는 컴포넌트 스타일이 선택자 명시도와 상관없이 이겨요. 컴포넌트는 layer 없이 클래스 하나로 써요.
- 키보드 포커스는 reset이 모든 요소에 기본 링(Navy 2px)을 그려요. 모양이 다른 곳만 컴포넌트에서 `:focus-visible`로 덮어써요.
- 글자 크기는 rem이라 브라우저 글자 크기 설정을 따라가요. 입력칸은 iOS 확대를 막으려고 16px로 고정했어요.
- 본문 글은 선택·복사할 수 있어요. 버튼 글자만 선택되지 않아요.
- 글꼴은 Pretendard Variable woff2 한 파일(약 2MB)이에요. 한글·영문·키릴 문자가 모두 들어 있어요.

## 앱 셸 (`src/shell`)

모든 화면을 감싸는 틀이에요. 디자인 시스템 컴포넌트로 만들었어요.

| 라우트 묶음                                         | 틀                                                  |
| --------------------------------------------------- | --------------------------------------------------- |
| `/`                                                 | 로그아웃 `LandingLayout`, 로그인 `SideColumnLayout` |
| 목록·상세·작성, `/mypage/library`                   | `SideColumnLayout` — 왼쪽 칼럼(lg 이상) + 본문      |
| `/mypage`, `/user/:id`, `/settings`, 결제 결과, 404 | `PageLayout` — 본문 + 한 줄 푸터                    |

- 데스크톱(md 이상)은 `TopNav`, 모바일은 `MobileTopBar`를 보여줘요. 로그인하면 모바일에 `BottomTabs`가 고정돼요.
- 로그인·회원가입·소셜 로그인 콜백 화면은 셸 밖에 있어요.
- AI 챗봇 버튼은 글쓰기 화면을 뺀 모든 셸 화면에 떠 있어요.
