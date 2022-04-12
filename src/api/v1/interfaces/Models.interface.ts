export interface UserInterface {
  email: string;
  password: string;
  emailValidated: boolean;
  emailValidationKey?: string;
  emailValidationExpire?: string;
  comparePasswords: (password: string) => Promise<boolean>;
  getTokens: () => { accessToken: string; refreshToken: string };
}

export interface QuoteInterface {
  quote: string;
  author: string;
}

export interface ChosenQuoteInterface {
  quote: string;
  author: string;
  expireDate: Date;
}