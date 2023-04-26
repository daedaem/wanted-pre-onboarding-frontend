import classes from "./InputForm.module.css";
import { useInputFormProps } from "../types/user";
const InputForm = ({
  id,
  type,
  value,
  label,
  error,
  errorMessage,
  inputTestId,
  onChange,
  onBlur,
}: useInputFormProps) => {
  return (
    <>
      <label htmlFor={id}>{label}</label>
      <input
        type={type}
        id={id}
        value={value}
        data-testid={inputTestId}
        onChange={onChange}
        onBlur={onBlur}
      />
      {error && <div className={classes.errors}>{errorMessage}</div>}
    </>
  );
};
export default InputForm;
