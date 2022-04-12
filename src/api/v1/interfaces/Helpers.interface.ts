export interface ErrorHandlerInterface {
  success: boolean;
  message: string;
}

export interface SuccessResponseInterface {
  success: boolean;
  data?: object;
}

export interface CookieOptionsInterface {
  maxAge: number;
  httpOnly: boolean;
  secure: boolean;
  signed: boolean;
}
