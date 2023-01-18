import { useState, FC, useEffect } from "react";
import styles from "./SignIn.module.scss";
import classnames from "classnames";

import Input from "../../Components/Input";
import Button from "../../Components/Button";
import Title from "../../Components/Title";
import { useThemeContext, Theme } from "../../Context/ThemeContext/Context";
import { Link, useNavigate } from "react-router-dom";
import { PathNames } from "../Router";
import { ButtonType } from "../../Components/Button/types";
import { LabelProps } from "./type";
import {
  signInWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { auth } from "../../firebase";
import { useAuthValue } from "../../Context/AuthContext/Context";

const validateEmail = (email: string) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

const SignIn = () => {
  const navigate = useNavigate();
  const { theme, onChangeTheme } = useThemeContext();
  const isDarkTheme = theme === Theme.Dark;
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [emailTouched, setEmailTouched] = useState(false);

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordTouched, setPasswordTouched] = useState(false);
  // @ts-ignore
  const { setTimeActive } = useAuthValue();
  const [error, setError] = useState("");

  const login = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        // @ts-ignore
        if (!auth.currentUser.emailVerified) {
          // @ts-ignore
          sendEmailVerification(auth.currentUser)
            .then(() => {
              setTimeActive(true);
              navigate("/verify-email");
            })
            .catch((err) => alert(err.message));
        } else {
          navigate("/");
        }
      })
      .catch((err) => setError(err.message));
  };

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

  const onBlurEmail = () => {
    setEmailTouched(true);
  };

  const onBlurPassword = () => {
    setPasswordTouched(true);
  };

  const Label: FC<LabelProps> = ({ title }) => {
    return (
      <div
        className={classnames(styles.label, {
          [styles.label__Dark]: isDarkTheme,
        })}
      >
        {title}
      </div>
    );
  };

  return (
    <div
      className={classnames(styles.signIn, {
        [styles.signIn__Dark]: isDarkTheme,
      })}
    >
      <div
        className={classnames(styles.signIn__container, {
          [styles.signIn__container__Dark]: isDarkTheme,
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
          <Title title={"Sign In"}></Title>
        </div>

        <form
          className={classnames(styles.formContainer, {
            [styles.formContainer__Dark]: isDarkTheme,
          })}
          onSubmit={login}
          name="login_form"
        >
          <div className={styles.formContainer__inputContainer}>
            <Label title={"Email"} />
            <Input
              value={email}
              onChange={setEmail}
              placeholder={"Your email"}
              onBlur={onBlurEmail}
              error={!!emailError}
              className={classnames(
                styles.formContainer__inputContainer__emailInput,
                {
                  [styles.formContainer__inputContainer__emailInput__Dark]:
                    isDarkTheme,
                }
              )}
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
              onBlur={onBlurPassword}
              error={!!passwordError}
              className={classnames(
                styles.formContainer__inputContainer__passwordInput,
                {
                  [styles.formContainer__inputContainer__passwordInput__Dark]:
                    isDarkTheme,
                }
              )}
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
            <div
              className={classnames(
                styles.formContainer__inputContainer__forgotPass,
                {
                  [styles.formContainer__inputContainer__forgotPass__Dark]:
                    isDarkTheme,
                }
              )}
            >
              Forgot password?
            </div>
          </div>

          <div className={styles.buttonAndText}>
            <Button
              type={ButtonType.Primary}
              title={"Sign In"}
              className={styles.buttonAndText__signUpButton}
              onClick={login}
            />
            <div
              className={classnames(styles.buttonAndText__formFooterText, {
                [styles.buttonAndText__formFooterText__Dark]: isDarkTheme,
              })}
            >
              Don’t have an account?{" "}
              <Link
                className={classnames(
                  styles.buttonAndText__formFooterText__SignIn,
                  {
                    [styles.buttonAndText__formFooterText__SignIn__Dark]:
                      isDarkTheme,
                  }
                )}
                to={PathNames.SignUp}
              >
                {" "}
                Sign Up
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
