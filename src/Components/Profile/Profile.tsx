import React from "react";
import styles from "./Profile.module.scss";

import { useAuthValue } from "../../Context/AuthContext/Context";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import Button from "../Button";
import { ButtonType } from "../Button/types";
import { Link, useNavigate } from "react-router-dom";
import { PathNames } from "../../Pages/Router";
import classNames from "classnames";

const Profile = () => {
  // @ts-ignore
  const { currentUser } = useAuthValue();

  return (
    <div className={styles.center}>
      <div className={styles.profile}>
        <h1 className={styles.profile_header}>Your Profile</h1>
        <p className={styles.profile_text}>
          <strong>Email: </strong>
          {currentUser?.email}
        </p>
        <p className={styles.profile_text}>
          <strong>Email verified: </strong>
          {`${currentUser?.emailVerified}`}
        </p>

        <Link
          to={PathNames.Home}
          className={classNames(styles.profile_button, {})}
        >
          Home
        </Link>
      </div>
    </div>
  );
};

export default Profile;
