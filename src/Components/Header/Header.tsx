import React, { useState } from "react";
import { HeaderSearch, HeadLogo, IconCancel } from "../../Assets/Icons";
import Input from "../Input";
import User from "../User";
import classNames from "classnames";
import styles from "./Header.module.scss";
import { useThemeContext } from "../../Context/ThemeContext/Context";

const Header = () => {
  const [value, setValue] = useState<string>("");
  const onChange = (inputValue: string) => {
    setValue(inputValue);
  };

  const [openInput, setOpenInput] = useState(false);

  return (
    <nav className={styles.header}>
      <div className={styles.header_logo}>
        <HeadLogo width={167} height={56}></HeadLogo>
      </div>
      <div className={styles.header_inputWrap}>
        {openInput ? (
          <Input
            className={styles.header_input}
            placeholder={"Search..."}
            onChange={onChange}
            value={value}
          />
        ) : null}
      </div>
      <div
        className={classNames(styles.header__search, {
          [styles.header__search__close]: openInput,
        })}
        onClick={() => setOpenInput(!openInput)}
      >
        {!openInput ? (
          <HeaderSearch
            className={styles.header__search__icon}
            width={`24`}
            height={`24`}
          ></HeaderSearch>
        ) : (
          <IconCancel width={`16`} height={`16`}></IconCancel>
        )}
      </div>
      <div className={styles.header__user}>
        <User username={`Artem Malkin`}></User>
      </div>
    </nav>
  );
};

export default Header;
