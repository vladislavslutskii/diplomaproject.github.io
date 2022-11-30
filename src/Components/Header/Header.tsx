import React, { useState } from "react";
import { HeaderSearch, HeadLogo, IconCancel } from "../../Assets/Icons";
import Input from "../Input";
import User from "../User";
import classNames from "classnames";
import styles from "./Header.module.scss";
import { Theme, useThemeContext } from "../../Context/ThemeContext/Context";
import { PathNames } from "../../Pages/Router";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { searchForPosts } from "../../Redux/reducers/postsreducer";

const Header = ({ onClick, openInput }: any) => {
  const { theme } = useThemeContext();
  const isDarkTheme = theme === Theme.Dark;
  const [value, setValue] = useState<string>("");
  const onChange = (inputValue: string) => {
    setValue(inputValue);
  };
  const navigate = useNavigate();

  const cliclToLogo = () => {
    navigate(PathNames.Home);
  };
  const onSignInClick = () => {
    navigate(PathNames.SignIn);
  };

  const dispatch = useDispatch();

  const onSearch = () => {
    if (value.length > 0) {
      dispatch(
        searchForPosts({ title_contains: value, _start: 0, isOverwrite: true })
      );
      navigate(PathNames.Search, { state: { searchElement: value } });
      setValue("");
      onClick();
    }
  };

  return (
    <nav
      className={classNames(styles.header, {
        [styles.header_Dark]: isDarkTheme,
      })}
    >
      <div
        className={classNames(styles.header_logo, {
          [styles.header_logo_Dark]: isDarkTheme,
        })}
        onClick={cliclToLogo}
      >
        <HeadLogo></HeadLogo>
      </div>

      {openInput && (
        <div
          className={classNames(styles.header_inputWrap, {
            [styles.header_searchAUser_open]: openInput,
            [styles.header_searchAUser_openDark]: isDarkTheme,
          })}
        >
          <Input
            className={classNames(styles.header_input, {
              [styles.header_input_Dark]: isDarkTheme,
            })}
            placeholder={"Search..."}
            onChange={onChange}
            value={value}
          />
          {value.length > 0 ? (
            <div
              className={classNames(styles.searchIcon, {
                [styles.searchIcon_Dark]: isDarkTheme,
              })}
              onClick={onSearch}
            >
              <HeaderSearch width={`24`} height={`24`}></HeaderSearch>
            </div>
          ) : (
            <div
              className={classNames(styles.cancelIcon, {
                [styles.cancelIcon_Dark]: isDarkTheme,
              })}
              onClick={onClick}
            >
              <IconCancel width={`16`} height={`16`}></IconCancel>
            </div>
          )}
        </div>
      )}
      <div
        className={classNames(styles.header_searchAUser, {
          [styles.header_searchAUser_open]: openInput,
          [styles.header_searchAUser_openDark]: isDarkTheme,
        })}
      >
        {!openInput && (
          <div
            className={classNames(styles.searchIcon, {
              [styles.searchIcon_Dark]: isDarkTheme,
            })}
            onClick={onClick}
          >
            <HeaderSearch width={`24`} height={`24`}></HeaderSearch>
          </div>
        )}

        <div className={styles.userWrap} onClick={onSignInClick}>
          <User username={"Sign In"}></User>
        </div>
      </div>
    </nav>
  );
};

export default Header;
