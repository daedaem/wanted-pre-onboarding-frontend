import { useNavigate } from "react-router-dom";
import classes from "./SignIn.module.css";
import { signin } from "../api/authApi";
import { validateEmail, validatePassword } from "../utils/validator";
import useInput from "./../hooks/useInput";
import InputForm from "../components/InputForm";
import {
  emailErrorMessage,
  passWordErrorMessage,
} from "../constants/errorMessages";

const SignIn = () => {
  const navigate = useNavigate();
  const {
    inputData: email,
    inputDataValid: emailValid,
    inputInvalid: emailInputInvalid,
    inputChangeHandler: emailChangeHandler,
    inputDataBlurHandler: emailBlurHandler,
  } = useInput(validateEmail);

  const {
    inputData: password,
    inputDataValid: passwordValid,
    inputInvalid: passwordInputInvalid,
    inputChangeHandler: passwordChangeHandler,
    inputDataBlurHandler: passwordBlurHandler,
  } = useInput(validatePassword);

  const isFormValid = emailValid && passwordValid;

  const inputDataSubmitHandler = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    if (!isFormValid) return;

    const { success, error } = await signin({ email, password });
    if (success) {
      alert("로그인에 성공하셨습니다.");
      navigate("/todo");
    } else {
      alert(error);
    }
  };

  const signInBtn = (
    <button
      data-testid="signin-button"
      className={classes.btn}
      disabled={!isFormValid}
    >
      로그인
    </button>
  );

  return (
    <section className={classes["signin-frame"]}>
      <h1>SignIn</h1>
      <form onSubmit={inputDataSubmitHandler} className={classes.form}>
        <InputForm
          id="email"
          type="text"
          value={email}
          inputTestId="email-input"
          onChange={emailChangeHandler}
          onBlur={emailBlurHandler}
          label="Email address"
          error={emailInputInvalid}
          errorMessage={emailErrorMessage}
        />
        <InputForm
          id="password"
          type="text"
          value={password}
          inputTestId="password-input"
          onChange={passwordChangeHandler}
          onBlur={passwordBlurHandler}
          label="Password"
          error={passwordInputInvalid}
          errorMessage={passWordErrorMessage}
        />
        {signInBtn}
      </form>
    </section>
  );
};
export default SignIn;
