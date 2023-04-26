export interface UserInfo {
  email: string;
  password: string;
}

export interface UserInput {
  inputData: string;
  inputDataValid: boolean;
  inputInvalid: boolean;
  inputChangeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
  inputDataBlurHandler: () => void;
}

export interface useInputFormProps {
  id: string;
  type: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
  label: string;
  error: boolean;
  errorMessage: string;
  inputTestId?: string;
}
