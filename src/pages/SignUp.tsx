import { useNavigate } from "react-router-dom";
import classes from "./SignUp.module.css";
import { signup } from "../api/authApi";
import { validateEmail, validatePassword } from "../utils/validator";
import useInput from "../hooks/useInput";
import InputForm from "../components/InputForm";
import {
  emailErrorMessage,
  passWordErrorMessage,
} from "../constants/errorMessages";

const SignUp = () => {
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

    const { success, error } = await signup({ email, password });
    if (success) {
      alert("회원 가입을 축하드립니다.");
      navigate("/signin");
    } else {
      alert(error);
    }
  };

  const signUpBtn = (
    <button data-testid="signup-button" disabled={!isFormValid}>
      회원가입
    </button>
  );

  return (
    <section className={classes["signUp-frame"]}>
      <h1>SignUp</h1>
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
        {signUpBtn}
      </form>
    </section>
  );
};
export default SignUp;
