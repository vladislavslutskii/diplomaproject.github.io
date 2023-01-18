import styles from "./VerifyEmail.module.scss";

import { useAuthValue } from "../../Context/AuthContext/Context";
import { useState, useEffect, useContext } from "react";
import { auth } from "../../firebase";
import { sendEmailVerification } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Button from "../Button";
import { ButtonType } from "../Button/types";

const VerifyEmail = () => {
  // @ts-ignore
  const { currentUser } = useAuthValue();
  const [time, setTime] = useState(60);
  // @ts-ignore
  const { timeActive, setTimeActive } = useAuthValue();
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      currentUser
        ?.reload()
        .then(() => {
          if (currentUser?.emailVerified) {
            clearInterval(interval);
            navigate("/profile");
          }
        })
        .catch((err: { message: any }) => {
          alert(err.message);
        });
    }, 500);
  }, [navigate, currentUser]);

  useEffect(() => {
    let interval: any = null;
    if (timeActive && time !== 0) {
      interval = setInterval(() => {
        setTime((time) => time - 1);
      }, 1000);
    } else if (time === 0) {
      setTimeActive(false);
      setTime(60);
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timeActive, time, setTimeActive]);

  const resendEmailVerification = () => {
    // @ts-ignore
    sendEmailVerification(auth.currentUser)
      .then(() => {
        setTimeActive(true);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <div className={styles.center}>
      <div className={styles.verifyEmail}>
        <h1 className={styles.verifyEmail_header}>Verify your Email Address</h1>
        <p className={styles.verifyEmail_VerificationText}>
          A Verification email has been sent to:
        </p>
        <p className={styles.verifyEmail_mail}>{currentUser?.email}</p>
        <span>Follow the instruction in the email to verify your account</span>
        <Button
          onClick={resendEmailVerification}
          disabled={timeActive}
          type={ButtonType.Primary}
          title={`Resend Email ${timeActive ? timeActive && time : ""}`}
          className={styles.verifyEmail_button}
        ></Button>
      </div>
    </div>
  );
};

export default VerifyEmail;
