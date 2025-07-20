export interface UserRegister {
  name: string;
  email: string;
  password: string;
}

export interface UserLogin {
  email: string;
  password: string;
}

export interface LoginViewProps {
  registerFormProps: RegisterFormProps;
  loginFormProps: LoginFormProps;
}

export interface RegisterFormProps {
  isLoading: boolean;
  userRegisterBody: UserRegister;
  errorMessage: string;
  handleRegister: (e: React.FormEvent<HTMLFormElement>) => void;
  handleChange: (key: keyof UserRegister, value: string) => void;
}

export interface LoginFormProps {
  isLoading: boolean;
  userLoginBody: UserLogin;
  errorMessage: string;
  handleLogin: (e: React.FormEvent<HTMLFormElement>) => void;
  handleChange: (key: keyof UserLogin, value: string) => void;
}
