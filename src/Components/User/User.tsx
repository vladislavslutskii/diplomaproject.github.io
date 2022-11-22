import React, { FC } from "react";
import { UserImg } from "../../Assets/Icons";
import { UserPropsType } from "./type";
import styles from "./User.module.scss";

const User: FC<UserPropsType> = ({ username }) => {
  const caps = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const res = username.split("").filter(function (l: any) {
    return ~caps.indexOf(l);
  });

  return (
    <div className={styles.user}>
      <div className={styles.user_Wrap}>
        <div className={styles.user_Img}>
          {username !== `Sign In` ? (
            res
          ) : (
            <UserImg width={24} height={24}></UserImg>
          )}
        </div>
        <p className={styles.user_Text}>
          {username !== `Sign In` ? username : `Sign In`}
        </p>
      </div>
    </div>
  );
};

export default User;
