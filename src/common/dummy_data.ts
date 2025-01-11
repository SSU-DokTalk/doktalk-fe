import { DebateType, PaymentType, BookType, SummaryType } from "@/types/data";

export const DUMMY_PAYMENTS: PaymentType[] = [
  {
    id: 1,
    user_id: 1,
    user: {
      id: 1,
      name: "이름",
      profile: "https://via.placeholder.com/150",
      is_deleted: false,
      role: "USER",
    },
    product_type: "D",
    product_id: 1,
    content: "토론방 결제",
    price: 1000,
    quantity: 1,
    created: new Date("2025-01-08 05:13:49"),
    updated: new Date("2025-01-08 05:13:49"),
    is_deleted: false,
  },
];

export const DUMMY_SUMMARIES: SummaryType[] = [
  {
    id: 6,
    user_id: 5,
    isbn: 9788936473235,
    title: "stringstringstringstringstringstringstringstringstringstring",
    free_content: "string",
    charged_content: "string",
    price: 0,
    files: ["https://example.com/"],
    likes_num: 0,
    comments_num: 0,
    created: new Date("2025-01-08T22:49:25"),
    updated: new Date("2025-01-08T22:49:25"),
    user: {
      id: 5,
      profile:
        "https://doktalk.s3.ap-northeast-2.amazonaws.com/profile%2F5_9729fc82-546e-4a19-b0ca-ded69e493080.jpg",
      name: "mathpaul3",
      role: "USER",
      is_deleted: false,
    },
    book: {
      isbn: 9788936473235,
      title:
        "소년이 온다 1(큰글자도서) (한강 소설ㅣ2024년 노벨문학상 수상작가)",
      image:
        "https://shopping-phinf.pstatic.net/main_3249727/32497276947.20240815214654.jpg",
      author: "한강",
      publisher: "창비",
      pubdate: new Date("2017-02-20"),
      description:
        '『소년이 온다』를 큰글자로 제작한 책으로 소설 전체 중 전반부의 내용을 담고 있습니다.\n\n한강을 뛰어넘은 한강의 소설\n\n섬세한 감수성과 치밀한 문장으로 인간 존재의 본질을 탐구해온 작가 한강의 여섯번째 장편소설 『소년이 온다』가 출간되었다. 1980년 광주의 5월을 다뤄 창비문학블로그 \'창문\'에 연재할 당시(2013년 11월~2014년 1월)부터 독자들의 이목을 끌었던 열다섯살 소년의 이야기는 \'상처의 구조에 대한 투시와 천착의 서사\'를 통해 한강만이 풀어낼 수 있는 방식으로 1980년 5월을 새롭게 조명한다. 한강은 무고한 영혼들의 말을 대신 전하는 듯한 진심 어린 문장들로 어느덧 그 시절을 잊고 무심하게 5ㆍ18 이후를 살고 있는 우리에게 묵직한 질문을 던지고, 여전히 5ㆍ18의 트라우마를 안고 힘겹게 살아가는 사람들을 위무한다. 『소년이 온다』는 광주민주화운동 당시 계엄군에 맞서 싸우던 중학생 동호를 비롯한 주변 인물들과 그후 남겨진 사람들의 고통받는 내면을 생생하게 그려내고, 당시의 처절한 장면들을 핍진하게 묘사하며 지금 "우리가 \'붙들어야 할\' 역사적 기억이 무엇인지를 절실하게 환기하고 있다(백지연 평론가)." "이 소설을 피해갈 수 없었"고, "이 소설을 통과하지 않고는 어디로도 갈 수 없다고 느꼈"다는 작가 스스로의 고백처럼 이 소설은 소설가 한강의 지금까지의 작품세계를 한단계 끌어올리는, "한강을 뛰어넘은 한강의 소설(신형철 평론가)"이라고 자신 있게 말할 수 있는 작품이다.',
    },
  },
  {
    id: 5,
    user_id: 5,
    isbn: 9791192988191,
    title: "string",
    free_content: "string",
    charged_content: "string",
    price: 0,
    files: ["https://example.com/"],
    likes_num: 0,
    comments_num: 0,
    created: new Date("2025-01-08T22:49:20"),
    updated: new Date("2025-01-08T22:49:20"),
    user: {
      id: 5,
      profile:
        "https://doktalk.s3.ap-northeast-2.amazonaws.com/profile%2F5_9729fc82-546e-4a19-b0ca-ded69e493080.jpg",
      name: "mathpaul3",
      role: "USER",
      is_deleted: false,
    },
    book: {
      isbn: 9791192988191,
      title: "소년이 있었다 (윤혜숙 소설집)",
      image:
        "https://shopping-phinf.pstatic.net/main_4135230/41352306618.20230920072145.jpg",
      author: "윤혜숙",
      publisher: "서해문집",
      pubdate: new Date("2023-07-25"),
      description:
        "『소년이 있었다』는 저자 윤혜숙의 주옥같은 작품을 만나볼 수 있는 책이다.",
    },
  },
  {
    id: 4,
    user_id: 5,
    isbn: 9791192595481,
    title: "string",
    free_content: "string",
    charged_content: "string",
    price: 0,
    files: ["https://example.com/"],
    likes_num: 0,
    comments_num: 0,
    created: new Date("2025-01-08T22:49:15"),
    updated: new Date("2025-01-08T22:49:15"),
    user: {
      id: 5,
      profile:
        "https://doktalk.s3.ap-northeast-2.amazonaws.com/profile%2F5_9729fc82-546e-4a19-b0ca-ded69e493080.jpg",
      name: "mathpaul3",
      role: "USER",
      is_deleted: false,
    },
    book: {
      isbn: 9791192595481,
      title: "소년이, 춤춘다",
      image:
        "https://shopping-phinf.pstatic.net/main_4933517/49335171626.20240725071124.jpg",
      author: "임화선",
      publisher: "봄마중",
      pubdate: new Date("2024-07-25"),
      description:
        "조선시대 무동을 소재로 십대들의 꿈과 성장을 풀어낸 주니어 소설!\n\n청소년은 그동안 읽던 비교적 단순한 플롯의 동화에서 벗어나 다양한 주제를 가지고 엮어가는 소설을 읽기 시작하는 시기다. 하지만 동화를 읽던 아이들이 바로 소설로 넘어가기에는 분량이나 내용의 이해에 버거움을 느낄 수 있다. 봄마중 출판사의 ‘청소년숲’은 이런 중학생들을 위해 가볍고 독자친화적인 형태로 펴내는 주니어 소설 시리즈다.  \n《소년이, 춤춘다》는 조선 후반기 무동이 되고 싶었던 바닷가 마을의 열세 살 소년의 이야기를 담은 작품이다. 동화작가였던 임화선 작가의 첫 청소년문학 작품인 이 이야기는, 지금과 다르지 않았던 당시 십대 아이들의 꿈과 사랑, 우정, 가족애를 잔잔히 담아내고 있으며 특히 잘 알려지지 않았던 궁중 무동의 선발이나 궁중음악에 대한 이야기가 담겨 있어 신선하면서도 흥미로움을 자아낸다. 이 때문인지 이 작품은 춘천문화재단 전문예술지원사업에 선정되기도 했다.",
    },
  },
  {
    id: 3,
    user_id: 5,
    isbn: 9788936434120,
    title: "string",
    free_content: "string",
    charged_content: "string",
    price: 0,
    files: ["https://example.com/"],
    likes_num: 0,
    comments_num: 0,
    created: new Date("2025-01-08T22:49:06"),
    updated: new Date("2025-01-08T22:49:06"),
    user: {
      id: 5,
      profile:
        "https://doktalk.s3.ap-northeast-2.amazonaws.com/profile%2F5_9729fc82-546e-4a19-b0ca-ded69e493080.jpg",
      name: "mathpaul3",
      role: "USER",
      is_deleted: false,
    },
    book: {
      isbn: 9788936434120,
      title: "소년이 온다 (한강 소설 l 2024년 노벨문학상 수상작가)",
      image:
        "https://shopping-phinf.pstatic.net/main_3249140/32491401626.20231004072435.jpg",
      author: "한강",
      publisher: "창비",
      pubdate: new Date("2014-05-19"),
      description:
        "말라파르테 문학상, 만해문학상 수상작 \n우리 시대의 소설 『소년이 온다』\n\n2014년 만해문학상, 2017년 이탈리아 말라파르테 문학상을 수상하고 전세계 20여개국에 번역 출간되며 세계를 사로잡은 우리 시대의 소설 『소년이 온다』.\n이 작품은 『채식주의자』로 인터내셔널 부커상을 수상한 한강 작가에게 “눈을 뗄 수 없는, 보편적이며 깊은 울림”(뉴욕타임즈), “역사와 인간의 본질을 다룬 충격적이고 도발적인 소설”(가디언), “한강을 뛰어넘은 한강의 소설”(문학평론가 신형철)이라는 찬사를 선사한 작품으로, 그간 많은 독자들에게 광주의 상처를 깨우치고 함께 아파하는 문학적인 헌사로 높은 관심과 찬사를 받아왔다. \n『소년이 온다』는 ‘상처의 구조에 대한 투시와 천착의 서사’를 통해 한강만이 풀어낼 수 있는 방식으로 1980년 5월을 새롭게 조명하며, 무고한 영혼들의 말을 대신 전하는 듯한 진심 어린 문장들로 5·18 이후를 살고 있는 우리에게 묵직한 질문을 던진다. \n이 작품은 가장 한국적인 서사로 세계를 사로잡은 한강 문학의 지향점을 보여준다. 인간의 잔혹함과 위대함을 동시에 증언하는 이 충일한 서사는 이렇듯 시공간의 한계를 넘어 인간 역사의 보편성을 보여주며 훼손되지 말아야 할 인간성을 절박하게 복원한다.",
    },
  },
  {
    id: 2,
    user_id: 5,
    isbn: 9791193992128,
    title: "string",
    free_content: "string",
    charged_content: "string",
    price: 0,
    files: ["https://example.com/"],
    likes_num: 0,
    comments_num: 0,
    created: new Date("2025-01-06T18:32:29"),
    updated: new Date("2025-01-06T18:32:29"),
    user: {
      id: 5,
      profile:
        "https://doktalk.s3.ap-northeast-2.amazonaws.com/profile%2F5_9729fc82-546e-4a19-b0ca-ded69e493080.jpg",
      name: "mathpaul3",
      role: "USER",
      is_deleted: false,
    },
    book: {
      isbn: 9791193992128,
      title: "낭독하는 명작동화 Level 1: Peach Boy (복숭아 소년)",
      image:
        "https://shopping-phinf.pstatic.net/main_4936271/49362717618.20240725092101.jpg",
      author: "새벽달(남수진)^이현석^롱테일북스 편집부",
      publisher: "롱테일북스",
      pubdate: new Date("2024-08-01"),
      description:
        "오랫동안 전 세계인의 사랑을 받아 온 ‘명작동화’를 최고의 영어 공부법 ‘낭독’으로 만나보세요!\n국내 최고의 영어 전문가 ‘새벽달’과 ‘현석샘’이 만들고, ‘낭독스쿨’에서 수백 명이 함께 낭독하는 바로 그 책!\n\n엄마표 영어 전문가 ‘새벽달’ 남수진 선생님과 EBS 라디오 진행자 ‘이현석’ 선생님이 합심하여 만든 이 책은 ‘명작동화’를 ‘낭독’에 활용할 수 있도록 완벽하게 재구성한 책입니다.\n\nLevel 1의 영어 텍스트 수준은 책의 난이도를 측정하는 레벨 지수인 AR(Accelerated Reader) 지수 0.9~1.5 사이로 미국 초등학생 1학년 수준으로 맞추고, 분량을 500단어 내외로 구성했습니다. 쉬운 단어와 간결한 문장으로 구성된 스토리를 그림과 함께 읽어 보세요. 페이지마다 담긴 아름다운 일러스트레이션은 내용 이해를 돕고 상상력을 풍부하게 해 주어 이야기를 더욱 재미있게 읽을 수 있습니다.",
    },
  },
  {
    id: 1,
    user_id: 5,
    isbn: 9791193992128,
    title:
      "stringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstring",
    free_content:
      "stringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstring",
    charged_content: "string",
    price: 0,
    files: ["https://example.com/"],
    likes_num: 0,
    comments_num: 0,
    created: new Date("2025-01-06T18:31:24"),
    updated: new Date("2025-01-06T18:31:24"),
    user: {
      id: 5,
      profile:
        "https://doktalk.s3.ap-northeast-2.amazonaws.com/profile%2F5_9729fc82-546e-4a19-b0ca-ded69e493080.jpg",
      name: "mathpaul3",
      role: "USER",
      is_deleted: false,
    },
    book: {
      isbn: 9791193992128,
      title: "낭독하는 명작동화 Level 1: Peach Boy (복숭아 소년)",
      image:
        "https://shopping-phinf.pstatic.net/main_4936271/49362717618.20240725092101.jpg",
      author: "새벽달(남수진)^이현석^롱테일북스 편집부",
      publisher: "롱테일북스",
      pubdate: new Date("2024-08-01"),
      description:
        "오랫동안 전 세계인의 사랑을 받아 온 ‘명작동화’를 최고의 영어 공부법 ‘낭독’으로 만나보세요!\n국내 최고의 영어 전문가 ‘새벽달’과 ‘현석샘’이 만들고, ‘낭독스쿨’에서 수백 명이 함께 낭독하는 바로 그 책!\n\n엄마표 영어 전문가 ‘새벽달’ 남수진 선생님과 EBS 라디오 진행자 ‘이현석’ 선생님이 합심하여 만든 이 책은 ‘명작동화’를 ‘낭독’에 활용할 수 있도록 완벽하게 재구성한 책입니다.\n\nLevel 1의 영어 텍스트 수준은 책의 난이도를 측정하는 레벨 지수인 AR(Accelerated Reader) 지수 0.9~1.5 사이로 미국 초등학생 1학년 수준으로 맞추고, 분량을 500단어 내외로 구성했습니다. 쉬운 단어와 간결한 문장으로 구성된 스토리를 그림과 함께 읽어 보세요. 페이지마다 담긴 아름다운 일러스트레이션은 내용 이해를 돕고 상상력을 풍부하게 해 주어 이야기를 더욱 재미있게 읽을 수 있습니다.",
    },
  },
];

export const DUMMY_DEBATES: DebateType[] = [
  {
    id: 0,
    user_id: 0,
    isbn: 0,
    location: "string",
    held_at: new Date("2025-01-08T15:35:29.002Z"),
    title:
      "1토론방 제목 토론방 제목 토론방 제목 토론방 제목 토론방 제목 토론방 제목 토론방 제목 토론방 제목 토론방 제목 ",
    content:
      "내용 미리보기 내용 미리보기 내용 미리보기 내용 미리보기 내용 미리보기 내용 미리보기 내용 미리보기 미리보기 내용 미리보기 내용 미리보기 내용 미리보기 내용 미리보기 ",
    files: ["https://example.com/"],
    likes_num: 0,
    comments_num: 0,
    created: new Date("2025-01-08T15:35:29.002Z"),
    updated: new Date("2025-01-08T15:35:29.002Z"),
    user: {
      id: 0,
      profile: "https://example.com/",
      name: "string",
      role: "USER",
      is_deleted: false,
    },
    book: {
      isbn: 0,
      title: "string",
      image: "https://example.com/",
      author: "string",
      publisher: "string",
      pubdate: new Date("2025-01-08"),
      description: "string",
    },
  },
  {
    id: 0,
    user_id: 0,
    isbn: 0,
    location: "string",
    held_at: new Date("2025-01-08T15:35:29.002Z"),
    title:
      "2토론방 제목 토론방 제목 토론방 제목 토론방 제목 토론방 제목 토론방 제목 토론방 제목 토론방 제목 토론방 제목 ",
    content:
      "내용 미리보기 내용 미리보기 내용 미리보기 내용 미리보기 내용 미리보기 내용 미리보기 내용 미리보기 미리보기 내용 미리보기 내용 미리보기 내용 미리보기 내용 미리보기 ",
    files: ["https://example.com/"],
    likes_num: 0,
    comments_num: 0,
    created: new Date("2025-01-08T15:35:29.002Z"),
    updated: new Date("2025-01-08T15:35:29.002Z"),
    user: {
      id: 0,
      profile: "https://example.com/",
      name: "string",
      role: "USER",
      is_deleted: false,
    },
    book: {
      isbn: 0,
      title: "string",
      image: "https://example.com/",
      author: "string",
      publisher: "string",
      pubdate: new Date("2025-01-08"),
      description: "string",
    },
  },
  {
    id: 0,
    user_id: 0,
    isbn: 0,
    location: "string",
    held_at: new Date("2025-01-08T15:35:29.002Z"),
    title:
      "3토론방 제목 토론방 제목 토론방 제목 토론방 제목 토론방 제목 토론방 제목 토론방 제목 토론방 제목 토론방 제목 ",
    content:
      "내용 미리보기 내용 미리보기 내용 미리보기 내용 미리보기 내용 미리보기 내용 미리보기 내용 미리보기 미리보기 내용 미리보기 내용 미리보기 내용 미리보기 내용 미리보기 ",
    files: ["https://example.com/"],
    likes_num: 0,
    comments_num: 0,
    created: new Date("2025-01-08T15:35:29.002Z"),
    updated: new Date("2025-01-08T15:35:29.002Z"),
    user: {
      id: 0,
      profile: "https://example.com/",
      name: "string",
      role: "USER",
      is_deleted: false,
    },
    book: {
      isbn: 0,
      title: "string",
      image: "https://example.com/",
      author: "string",
      publisher: "string",
      pubdate: new Date("2025-01-08"),
      description: "string",
    },
  },
  {
    id: 0,
    user_id: 0,
    isbn: 0,
    location: "string",
    held_at: new Date("2025-01-08T15:35:29.002Z"),
    title:
      "4토론방 제목 토론방 제목 토론방 제목 토론방 제목 토론방 제목 토론방 제목 토론방 제목 토론방 제목 토론방 제목 ",
    content:
      "내용 미리보기 내용 미리보기 내용 미리보기 내용 미리보기 내용 미리보기 내용 미리보기 내용 미리보기 미리보기 내용 미리보기 내용 미리보기 내용 미리보기 내용 미리보기 ",
    files: ["https://example.com/"],
    likes_num: 0,
    comments_num: 0,
    created: new Date("2025-01-08T15:35:29.002Z"),
    updated: new Date("2025-01-08T15:35:29.002Z"),
    user: {
      id: 0,
      profile: "https://example.com/",
      name: "string",
      role: "USER",
      is_deleted: false,
    },
    book: {
      isbn: 0,
      title: "string",
      image: "https://example.com/",
      author: "string",
      publisher: "string",
      pubdate: new Date("2025-01-08"),
      description: "string",
    },
  },
  {
    id: 0,
    user_id: 0,
    isbn: 0,
    location: "string",
    held_at: new Date("2025-01-08T15:35:29.002Z"),
    title:
      "5토론방 제목 토론방 제목 토론방 제목 토론방 제목 토론방 제목 토론방 제목 토론방 제목 토론방 제목 토론방 제목 ",
    content:
      "내용 미리보기 내용 미리보기 내용 미리보기 내용 미리보기 내용 미리보기 내용 미리보기 내용 미리보기 미리보기 내용 미리보기 내용 미리보기 내용 미리보기 내용 미리보기 ",
    files: ["https://example.com/"],
    likes_num: 0,
    comments_num: 0,
    created: new Date("2025-01-08T15:35:29.002Z"),
    updated: new Date("2025-01-08T15:35:29.002Z"),
    user: {
      id: 0,
      profile: "https://example.com/",
      name: "string",
      role: "USER",
      is_deleted: false,
    },
    book: {
      isbn: 0,
      title: "string",
      image: "https://example.com/",
      author: "string",
      publisher: "string",
      pubdate: new Date("2025-01-08"),
      description: "string",
    },
  },
];

export const DUMMY_BOOKS: BookType[] = [
  {
    title: "소년이 온다 (한강 소설 l 2024년 노벨문학상 수상작가)",
    image:
      "https://shopping-phinf.pstatic.net/main_3249140/32491401626.20231004072435.jpg",
    author: "한강",
    publisher: "창비",
    pubdate: new Date("20140519"),
    isbn: 9788936434120,
    description:
      "말라파르테 문학상, 만해문학상 수상작 \n우리 시대의 소설 『소년이 온다』\n\n2014년 만해문학상, 2017년 이탈리아 말라파르테 문학상을 수상하고 전세계 20여개국에 번역 출간되며 세계를 사로잡은 우리 시대의 소설 『소년이 온다』.\n이 작품은 『채식주의자』로 인터내셔널 부커상을 수상한 한강 작가에게 “눈을 뗄 수 없는, 보편적이며 깊은 울림”(뉴욕타임즈), “역사와 인간의 본질을 다룬 충격적이고 도발적인 소설”(가디언), “한강을 뛰어넘은 한강의 소설”(문학평론가 신형철)이라는 찬사를 선사한 작품으로, 그간 많은 독자들에게 광주의 상처를 깨우치고 함께 아파하는 문학적인 헌사로 높은 관심과 찬사를 받아왔다. \n『소년이 온다』는 ‘상처의 구조에 대한 투시와 천착의 서사’를 통해 한강만이 풀어낼 수 있는 방식으로 1980년 5월을 새롭게 조명하며, 무고한 영혼들의 말을 대신 전하는 듯한 진심 어린 문장들로 5·18 이후를 살고 있는 우리에게 묵직한 질문을 던진다. \n이 작품은 가장 한국적인 서사로 세계를 사로잡은 한강 문학의 지향점을 보여준다. 인간의 잔혹함과 위대함을 동시에 증언하는 이 충일한 서사는 이렇듯 시공간의 한계를 넘어 인간 역사의 보편성을 보여주며 훼손되지 말아야 할 인간성을 절박하게 복원한다.",
  },
  {
    title: "소년이 온다 (한강 소설ㅣ2024년 노벨문학상 수상작가)",
    image:
      "https://shopping-phinf.pstatic.net/main_3249182/32491820253.20250101071624.jpg",
    author: "한강",
    publisher: "창비",
    pubdate: new Date("20200424"),
    isbn: 9788936434410,
    description:
      "말라파르테 문학상, 만해문학상 수상작 \n우리 시대의 소설 『소년이 온다』 출간 10주년 기념 특별한정판 \n\n2014년 만해문학상, 2017년 이탈리아 말라파르테 문학상을 수상하고 전세계 20여개국에 번역 출간되며 세계를 사로잡은 우리 시대의 소설 『소년이 온다』를 출간 10주년을 맞아 특별한정판으로 새롭게 선보인다. 이 작품은 『채식주의자』로 인터내셔널 부커상을 수상한 한강 작가에게 “눈을 뗄 수 없는, 보편적이며 깊은 울림”(뉴욕타임즈), “역사와 인간의 본질을 다룬 충격적이고 도발적인 소설”(가디언), “한강을 뛰어넘은 한강의 소설”(문학평론가 신형철)이라는 찬사를 선사한 작품으로, 그간 많은 독자들에게 광주의 상처를 깨우치고 함께 아파하는 문학적인 헌사로 높은 관심과 찬사를 받아왔다.",
  },
  {
    title: "소년이, 춤춘다",
    image:
      "https://shopping-phinf.pstatic.net/main_4933517/49335171626.20240725071124.jpg",
    author: "임화선",
    publisher: "봄마중",
    pubdate: new Date("20240725"),
    isbn: 9791192595481,
    description:
      "조선시대 무동을 소재로 십대들의 꿈과 성장을 풀어낸 주니어 소설!\n\n청소년은 그동안 읽던 비교적 단순한 플롯의 동화에서 벗어나 다양한 주제를 가지고 엮어가는 소설을 읽기 시작하는 시기다. 하지만 동화를 읽던 아이들이 바로 소설로 넘어가기에는 분량이나 내용의 이해에 버거움을 느낄 수 있다. 봄마중 출판사의 ‘청소년숲’은 이런 중학생들을 위해 가볍고 독자친화적인 형태로 펴내는 주니어 소설 시리즈다.  \n《소년이, 춤춘다》는 조선 후반기 무동이 되고 싶었던 바닷가 마을의 열세 살 소년의 이야기를 담은 작품이다. 동화작가였던 임화선 작가의 첫 청소년문학 작품인 이 이야기는, 지금과 다르지 않았던 당시 십대 아이들의 꿈과 사랑, 우정, 가족애를 잔잔히 담아내고 있으며 특히 잘 알려지지 않았던 궁중 무동의 선발이나 궁중음악에 대한 이야기가 담겨 있어 신선하면서도 흥미로움을 자아낸다. 이 때문인지 이 작품은 춘천문화재단 전문예술지원사업에 선정되기도 했다.",
  },
  {
    title: "소년이 있었다 (윤혜숙 소설집)",
    image:
      "https://shopping-phinf.pstatic.net/main_4135230/41352306618.20230920072145.jpg",
    author: "윤혜숙",
    publisher: "서해문집",
    pubdate: new Date("20230725"),
    isbn: 9791192988191,
    description:
      "『소년이 있었다』는 저자 윤혜숙의 주옥같은 작품을 만나볼 수 있는 책이다.",
  },
  {
    title: "소년이 온다 1(큰글자도서) (한강 소설ㅣ2024년 노벨문학상 수상작가)",
    image:
      "https://shopping-phinf.pstatic.net/main_3249727/32497276947.20240815214654.jpg",
    author: "한강",
    publisher: "창비",
    pubdate: new Date("20170220"),
    isbn: 9788936473235,
    description:
      '『소년이 온다』를 큰글자로 제작한 책으로 소설 전체 중 전반부의 내용을 담고 있습니다.\n\n한강을 뛰어넘은 한강의 소설\n\n섬세한 감수성과 치밀한 문장으로 인간 존재의 본질을 탐구해온 작가 한강의 여섯번째 장편소설 『소년이 온다』가 출간되었다. 1980년 광주의 5월을 다뤄 창비문학블로그 \'창문\'에 연재할 당시(2013년 11월~2014년 1월)부터 독자들의 이목을 끌었던 열다섯살 소년의 이야기는 \'상처의 구조에 대한 투시와 천착의 서사\'를 통해 한강만이 풀어낼 수 있는 방식으로 1980년 5월을 새롭게 조명한다. 한강은 무고한 영혼들의 말을 대신 전하는 듯한 진심 어린 문장들로 어느덧 그 시절을 잊고 무심하게 5ㆍ18 이후를 살고 있는 우리에게 묵직한 질문을 던지고, 여전히 5ㆍ18의 트라우마를 안고 힘겹게 살아가는 사람들을 위무한다. 『소년이 온다』는 광주민주화운동 당시 계엄군에 맞서 싸우던 중학생 동호를 비롯한 주변 인물들과 그후 남겨진 사람들의 고통받는 내면을 생생하게 그려내고, 당시의 처절한 장면들을 핍진하게 묘사하며 지금 "우리가 \'붙들어야 할\' 역사적 기억이 무엇인지를 절실하게 환기하고 있다(백지연 평론가)." "이 소설을 피해갈 수 없었"고, "이 소설을 통과하지 않고는 어디로도 갈 수 없다고 느꼈"다는 작가 스스로의 고백처럼 이 소설은 소설가 한강의 지금까지의 작품세계를 한단계 끌어올리는, "한강을 뛰어넘은 한강의 소설(신형철 평론가)"이라고 자신 있게 말할 수 있는 작품이다.',
  },
  {
    title: "소년이 온다 2(큰글자도서) (2024년 노벨문학상 수상작가)",
    image:
      "https://shopping-phinf.pstatic.net/main_3248935/32489353871.20230725121201.jpg",
    author: "한강",
    publisher: "창비",
    pubdate: new Date("20170220"),
    isbn: 9788936473242,
    description:
      '『소년이 온다』를 큰글자로 제작한 책으로 소설 전체 중 후반부의 내용을 담고 있습니다.\n\n한강을 뛰어넘은 한강의 소설\n\n섬세한 감수성과 치밀한 문장으로 인간 존재의 본질을 탐구해온 작가 한강의 여섯번째 장편소설 『소년이 온다』가 출간되었다. 1980년 광주의 5월을 다뤄 창비문학블로그 \'창문\'에 연재할 당시(2013년 11월~2014년 1월)부터 독자들의 이목을 끌었던 열다섯살 소년의 이야기는 \'상처의 구조에 대한 투시와 천착의 서사\'를 통해 한강만이 풀어낼 수 있는 방식으로 1980년 5월을 새롭게 조명한다. 한강은 무고한 영혼들의 말을 대신 전하는 듯한 진심 어린 문장들로 어느덧 그 시절을 잊고 무심하게 5ㆍ18 이후를 살고 있는 우리에게 묵직한 질문을 던지고, 여전히 5ㆍ18의 트라우마를 안고 힘겹게 살아가는 사람들을 위무한다. 『소년이 온다』는 광주민주화운동 당시 계엄군에 맞서 싸우던 중학생 동호를 비롯한 주변 인물들과 그후 남겨진 사람들의 고통받는 내면을 생생하게 그려내고, 당시의 처절한 장면들을 핍진하게 묘사하며 지금 "우리가 \'붙들어야 할\' 역사적 기억이 무엇인지를 절실하게 환기하고 있다(백지연 평론가)." "이 소설을 피해갈 수 없었"고, "이 소설을 통과하지 않고는 어디로도 갈 수 없다고 느꼈"다는 작가 스스로의 고백처럼 이 소설은 소설가 한강의 지금까지의 작품세계를 한단계 끌어올리는, "한강을 뛰어넘은 한강의 소설(신형철 평론가)"이라고 자신 있게 말할 수 있는 작품이다.',
  },
  {
    title: "소년이 그랬다",
    image:
      "https://shopping-phinf.pstatic.net/main_3244162/32441624930.20221227204741.jpg",
    author: "스테포 난쑤",
    publisher: "사계절",
    pubdate: new Date("20140529"),
    isbn: 9788958287575,
    description:
      "사계절 1318 문고 시리즈 92권. 사계절 1318 문고에서 처음으로 선보이는 청소년희곡으로, 오스트레일리아 희곡 「더 스톤즈」(The Stones)를 원작으로, 젊은 극작가 한현주가 한국적 상황과 정서를 살려 우리 십대의 살아 있는 언어로 다시 썼다. 이야기는 중학생인 민재와 상식이 장난삼아 던진 돌 때문에 누군가가 목숨을 잃는 ‘사건’으로부터 출발해 답 없는 답을 향해 빠르게 전개된다.\n\n\n\n재개발구역의 을씨년스러운 공간을 중심으로 두 소년이 종횡무진 뛰어다니는 모습을 통해 청소년이 가지는 심리적 불안과 방황, 좌절을 그린 작품으로, 청소년을 둘러싼 첨예한 사회문제를 현실적이고도 날카로운 관점으로 풀어냈다. 2011년 국립극단 어린이청소년극연구소가 출범하면서 국내에서는 처음 올린 작품으로, 이듬해 ‘한국연극 베스트 7’에 선정되었다.",
  },
  {
    title: "Celui qui revient (한강 - 소년이 온다 프랑스어)",
    image:
      "https://shopping-phinf.pstatic.net/main_5116013/51160135619.20241103075304.jpg",
    author: "한강",
    publisher: "Livre de Poche",
    pubdate: new Date("20241204"),
    isbn: 9782253909989,
    description:
      "« Lorsque vos yeux s’étaient croisés pour la dernière fois, tes paupières tremblaient, de désir de survivre. » Printemps 1980. Un vent de terreur souffle sur la Corée du Sud. Une junte militaire a pris le pouvoir quelques mois plus tôt et, après une spectaculaire manifestation d’opposants à Séoul, la ville de Gwangju se révolte à son tour, avant d’être férocement réprimée. Dans la ville ensanglantée, Tongho erre parmi les cadavres, à la recherche de son ami disparu. Dans une maison d’édition, Kim travaille sur un texte censuré. Dans le présent, des rescapés se souviennent. Et toutes ces âmes tourmentées ne demandent qu’à trouver la paix.\n\nHan Kang a une conscience unique des liens entre le corps et l’âme, les vivants et les morts, et sa prose poétique intense affronte les traumatismes historiques et expose la fragilité de la vie humaine. Anders Olsson, président du comité Nobel.\n\nTraduit du coréen par Jeong Eun-Jin et Jacques Batilliot.",
  },
  {
    title: "소년이 된다는 것 (솔직하고 직설적인 십 대의 사춘기와 성 이야기)",
    image:
      "https://shopping-phinf.pstatic.net/main_3248641/32486419236.20221228073446.jpg",
    author: "제임스 도슨",
    publisher: "봄나무",
    pubdate: new Date("20170410"),
    isbn: 9791156131083,
    description:
      "학교에서는 들을 수 없는 성性에 관한 모든 것!\n\n봄나무에서 격동의 사춘기를 보내고 있는 남자아이들을 위한『소년이 된다는 것』이 출간되었다. 이 책은 지난 9월에 출간된 십 대 소녀들을 위한 사춘기 지침서 《소녀가 된다는 것》의 ‘소년 편’이다. 이 책은 거뭇거뭇한 수염이 나기 시작한 십 대 소년들의 주체할 수 없는 성과 성관계에 관한 깊은 호기심을 직접적면서도 대담하게 파헤친다. 영국의 성교육 전문 교사이기도 한 저자 제임스 도슨은 오랜 시간 사춘기 아이들을 만나고 이야기해 온 자신의 경험을 바탕으로 때로는 옆집 형처럼 때로는 단호한 선생님처럼 사춘기 주의 사항들을 알려 준다. \n\n사춘기 남자아이들이 주된 관심사는 단연 ‘성관계’일 것이다. 이성을 알게 되고 자위에 눈을 뜨면서 성적 욕구가 강해지는 시기이기 때문이다. 이 책은 ‘아기는 어떻게 생길까?’ 같은 틀에 박힌 질문을 던지는 학교용 성교육이 아니라  ‘음경의 크기가 성관계의 전부일까?’, ‘포르노처럼 해야 정말 좋은 것일까?’ 혹은 ‘콘돔이 나에게 너무 크면 어떡하지?’ 같은, 아이들이 진짜 듣고 싶어 하는 물음에 답을 해 준다. 또 여자 친구와의 관계를 잘 유지하는 방법과 올바른 이별 통보 방법은 물론, 알고 있으면 조심해서 사용할 만한 용어까지 모두 다루고 있다. 《소년이 된다는 것》은 부모님이나 학교 선생님에게서는 결코 들을 수 없는, 남자아이들의 깊은 성적 호기심을 채워 줄 솔직하고 발칙한 사춘기 지침서다.",
  },
  {
    title: "소년이 청년으로",
    image:
      "https://shopping-phinf.pstatic.net/main_3381209/33812097659.20231115072301.jpg",
    author: "김상오",
    publisher: "퍼플",
    pubdate: new Date("20140808"),
    isbn: 9788924016468,
    description:
      "책으로 엮으며\n\n오랜 세월 동안 나는 무엇인가를 줄 곳 써왔다. 그 글엔 나의 감정을 그대로 담으려고 애를 썼다. 그러나 느끼는 감정의 모두를 글로 나타낸다는 것이 너무나 어려웠고 사용 어휘가 너무 적다는 것이 너무 슬펐다.\n비록 내가 어휘를 찾는 공부는 하지 않았지만 평소에 우리가 얼마나 감정이 메말랐던가를 생각해 본다. 많은 전문적이고 유행적인 말은 제법 알지만 정작 감정을 보이는 말에 대해선 얼마 몰랐던 것이다. 사는데 꼭 필요한 말들은 아니지만 더욱 풍성하고 아름다운 삶을 만들기 위해선 느낌을 위한 단어를 사용하는 것도 필요한 것 같다.\n시는 문법과 단어에 얽매이지 않는다. 그래서 나는 시 쓰기를 좋아한다. 자신의 감정에 약간이나마 충실할 수 있어서이다",
  },
];
