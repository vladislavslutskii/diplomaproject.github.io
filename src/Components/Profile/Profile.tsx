import React from "react";
import styles from "./Profile.module.scss";

import { useAuthValue } from "../../Context/AuthContext/Context";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";

const Profile = () => {
  // @ts-ignore
  const { currentUser } = useAuthValue();

  return (
    <div className={styles.center}>
      <div className={styles.profile}>
        <h1>Profile</h1>
        <p>
          <strong>Email: </strong>
          {currentUser?.email}
        </p>
        <p>
          <strong>Email verified: </strong>
          {`${currentUser?.emailVerified}`}
        </p>
        <span onClick={() => signOut(auth)}>Sign Out</span>
      </div>
    </div>
  );
};

export default Profile;
