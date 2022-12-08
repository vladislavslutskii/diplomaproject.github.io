import React, { FC, useState, useEffect } from "react";
import styles from "./SignUp.module.scss";

import classnames from "classnames";
import Input from "../../Components/Input";
import Button from "../../Components/Button";
import Title from "../../Components/Title";
import { Link } from "react-router-dom";
import { useThemeContext, Theme } from "../../Context/ThemeContext/Context";
import { PathNames } from "../Router";
import { useDispatch } from "react-redux";
import { ButtonType } from "../../Components/Button/types";

const validateEmail = (email: string) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

type LabelProps = {
  title: string;
};

const SignUp = () => {
  const [name, setName] = useState("");

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [emailTouched, setEmailTouched] = useState(false);

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordTouched, setPasswordTouched] = useState(false);

  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [confirmPasswordTouched, setConfirmPasswordTouched] = useState(false);

  const [modalActive, setModalActive] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (emailTouched && !validateEmail(email)) {
      setEmailError("Set correct email");
    } else {
      setEmailError("");
    }
  }, [emailTouched, email]);

  useEffect(() => {
    if (passwordTouched && password.length < 8) {
      setPasswordError("Enter more than 8 characters");
    } else {
      setPasswordError("");
    }
  }, [passwordTouched, password]);

  useEffect(() => {
    if (confirmPasswordTouched && confirmPassword.length < 8) {
      setConfirmPasswordError(`Enter more than 8 characters`);
    } else if (confirmPasswordTouched && password !== confirmPassword) {
      setConfirmPasswordError(`Пароли не совпадают`);
    } else {
      setConfirmPasswordError(``);
    }
  }, [confirmPasswordTouched, confirmPassword, password]);

  const onBlurEmail = () => {
    setEmailTouched(true);
  };

  const onBlurPassword = () => {
    setPasswordTouched(true);
  };

  const onBlurConfirmPassword = () => {
    setConfirmPasswordTouched(true);
  };

  const Label: FC<LabelProps> = ({ title }) => {
    return (
      <div
        className={classnames(styles.label, {
          [styles.label__Dark]: theme === Theme.Dark,
        })}
      >
        {title}
      </div>
    );
  };

  const { theme, onChangeTheme } = useThemeContext();
  const isDarkTheme = theme === Theme.Dark;

  const a = {
    username: name,
    email: email,
    password: password,
  };

  // const onAuth = () => {
  //   localStorage.setItem(`person`, JSON.stringify(a));
  //   dispatch(createNewUser({ username: name, email, password }));
  // };

  // console.log(JSON.parse(`person`));
  return (
    <div
      className={classnames(styles.signUp, {
        [styles.signUp__Dark]: isDarkTheme,
      })}
    >
      <div
        className={classnames(styles.signUp__container, {
          [styles.signUn__container_Dark]: isDarkTheme,
        })}
      >
        <div className={styles.titleWrap}>
          <Link
            to={PathNames.Home}
            className={classnames(styles.titleWrap__backToHomeText, {
              [styles.titleWrap__backToHomeTextDark]: isDarkTheme,
            })}
          >
            Back to home
          </Link>
          <Title title={"Sign Up"}></Title>
        </div>

        <div
          className={classnames(styles.formContainer, {
            [styles.formContainer__Dark]: isDarkTheme,
          })}
        >
          <div className={styles.formContainer__inputContainer}>
            <Label title={"Name"} />
            <Input
              value={name}
              onChange={setName}
              placeholder={"Your name"}
              className={classnames(
                styles.formContainer__inputContainer__nameInput,
                {
                  [styles.formContainer__inputContainer__nameInput__Dark]:
                    isDarkTheme,
                }
              )}
            />
          </div>

          <div className={styles.formContainer__inputContainer}>
            <Label title={"Email"} />
            <Input
              value={email}
              onChange={setEmail}
              placeholder={"Your email"}
              className={classnames(
                styles.formContainer__inputContainer__emailInput,
                {
                  [styles.formContainer__inputContainer__emailInput__Dark]:
                    isDarkTheme,
                }
              )}
              onBlur={onBlurEmail}
              error={!!emailError}
            />
            {emailTouched && emailError && (
              <div
                className={classnames({
                  [styles.error__Dark]: isDarkTheme,
                })}
              >
                {emailError}
              </div>
            )}
          </div>

          <div className={styles.formContainer__inputContainer}>
            <Label title={"Password"} />
            <Input
              type="password"
              value={password}
              onChange={setPassword}
              placeholder={"Your password"}
              className={classnames(
                styles.formContainer__inputContainer__passwordInput,
                {
                  [styles.formContainer__inputContainer__passwordInput__Dark]:
                    isDarkTheme,
                }
              )}
              onBlur={onBlurPassword}
              error={!!passwordError}
            />
            {passwordTouched && passwordError && (
              <div
                className={classnames({
                  [styles.error__Dark]: isDarkTheme,
                })}
              >
                {passwordError}
              </div>
            )}
          </div>

          <div className={styles.formContainer__inputContainer}>
            <Label title={"Confirm Password"} />
            <Input
              type="password"
              value={confirmPassword}
              onChange={setConfirmPassword}
              placeholder={"Confirm password"}
              className={classnames(
                styles.formContainer__inputContainer__confirmPasswordInput,
                {
                  [styles.formContainer__inputContainer__confirmPasswordInput__Dark]:
                    isDarkTheme,
                }
              )}
              onBlur={onBlurConfirmPassword}
              error={!!confirmPasswordError}
            />
            {confirmPasswordTouched && confirmPasswordError && (
              <div
                className={classnames({
                  [styles.error__Dark]: isDarkTheme,
                })}
              >
                {confirmPasswordError}
              </div>
            )}
          </div>

          <div className={styles.buttonAndText}>
            <Button
              type={ButtonType.Primary}
              title={"Sign Up"}
              className={styles.buttonAndText__signUpButton}
              disabled={false}
              // onClick={onAuth}
            />
            <div
              className={classnames(styles.buttonAndText__formFooterText, {
                [styles.buttonAndText__formFooterText__Dark]: isDarkTheme,
              })}
            >
              Already have an account?{" "}
              <Link
                to={PathNames.SignIn}
                className={classnames(
                  styles.buttonAndText__formFooterText__SignUp,
                  {
                    [styles.buttonAndText__formFooterText__SignUp__Dark]:
                      isDarkTheme,
                  }
                )}
              >
                {" "}
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
