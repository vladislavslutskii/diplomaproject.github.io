import React, { useState } from "react";
import styles from "./PagesWrapper.module.scss";

import classNames from "classnames";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import Blog from "../Blog";
import { Outlet, useLocation } from "react-router-dom";
import { PathNames } from "../Router";
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
