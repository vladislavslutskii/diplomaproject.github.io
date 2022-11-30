import React, { useState } from "react";
import styles from "./PagesWrapper.module.scss";
import { Outlet, useLocation } from "react-router-dom";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import Blog from "../Blog";
import { PathNames } from "../Router";
import classNames from "classnames";
import { Theme, useThemeContext } from "../../Context/ThemeContext/Context";

const PagesWrapper = () => {
  const location = useLocation();
  const { theme } = useThemeContext();
  const isDarkTheme = theme === Theme.Dark;

  const [openInput, setOpenInput] = useState(false);
  return (
    <div
      className={classNames(styles.app, {
        [styles.app_Dark]: isDarkTheme,
      })}
    >
      <Header
        onClick={() => setOpenInput(!openInput)}
        openInput={openInput}
      ></Header>
      {location.pathname === PathNames.Home ? <Blog></Blog> : <Outlet></Outlet>}
      <Footer></Footer>
    </div>
  );
};

export default PagesWrapper;
