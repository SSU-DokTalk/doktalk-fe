export type LinkItemType = {
  title: string;
  url: string;
  icon?: any;
};

export type RegisterType = {
  email: string;
  nickname: string;
  password: string;
  gender: string;
  birthdate: string;
  validation: boolean;
  interest: string[];
  agreement: {
    agreement1: boolean;
    agreement2: boolean;
    agreement3: boolean;
  };
};
