import { FC, useEffect, useState } from "react";
import styles from "./Header.module.scss";

import classNames from "classnames";
import Input from "../Input";
import User from "../User";
import PostsSelectors from "../../Redux/selectors/postsSelectors";
import {
  searchForBlogPosts,
  searchForPosts,
} from "../../Redux/reducers/postsreducer";
import { HeaderSearch, HeadLogo, IconCancel } from "../../Assets/Icons";
import { Theme, useThemeContext } from "../../Context/ThemeContext/Context";
import { PathNames } from "../../Pages/Router";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { TabsNames } from "../../Utils";
import { HeaderProps } from "./types";
import { useAuthState } from "react-firebase-hooks/auth";
import { collection, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "../../firebase";
import { signOut } from "firebase/auth";
import { useAuthValue } from "../../Context/AuthContext/Context";

const Header: FC<HeaderProps> = ({ onClick, openInput }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { theme } = useThemeContext();
  const isDarkTheme = theme === Theme.Dark;
  const activeTab = useSelector(PostsSelectors.getActiveTab);
  const [value, setValue] = useState<string>("");

  const onChange = (inputValue: string) => {
    setValue(inputValue);
  };

  const cliclToLogo = () => {
    navigate(PathNames.Home);
  };
  const onSignInClick = () => {
    navigate(PathNames.SignIn);
  };
  // @ts-ignore
  const { currentUser } = useAuthValue();
  const [user] = useAuthState(auth);
  const [name, setName] = useState("");

  const fetchUserName = async () => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();

      setName(data.name);
    } catch (err) {
      console.error(err);
      alert("An error occured while fetching user data");
    }
  };
  useEffect(() => {
    if (!user) return navigate("/");
    fetchUserName();
  }, [user]);
  console.log(name);

  const onSearch = () => {
    if (value.length > 0) {
      dispatch(
        activeTab === TabsNames.News
          ? searchForBlogPosts({
              title_contains: value,
              _start: 0,
              isOverwrite: true,
            })
          : searchForPosts({
              title_contains: value,
              _start: 0,
              isOverwrite: true,
            })
      );
      navigate(PathNames.Search, { state: { searchElement: value } });
      setValue("");
      onClick();
    }
  };

  const screenWidth = window.screen.width;
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

      {openInput && screenWidth > 549 && (
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
                [styles.searchIcon_open]: value.length > 0,
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
          {value.length > 0 && screenWidth < 549 && (
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
          <User
            username={!auth.currentUser ? name || "Sign In" : "Sign In"}
          ></User>
        </div>
      </div>
      {openInput && screenWidth < 549 && (
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
                [styles.searchIcon_open]: value.length > 0,
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
          {value.length > 0 && screenWidth < 549 && (
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
    </nav>
  );
};

export default Header;
