import React, { useState } from "react";
import styles from "./Footer.module.scss";
import classnames from "classnames";

import { useThemeContext, Theme } from "../../Context/ThemeContext/Context";
import Label from "../Label";
import Switch from "../Switch";

const Footer = () => {
  const { theme, onChangeTheme } = useThemeContext();
  const isDarkTheme = theme === Theme.Dark;

  const [checked, setChecked] = useState(false);
  const handleChange = (nextChecked: boolean) => {
    setChecked(nextChecked);
    onChangeTheme();
  };

  return (
    <div
      className={classnames(styles.footer, {
        [styles.footer__Dark]: isDarkTheme,
      })}
    >
      <div
        className={classnames(styles.footerWrap, {
          [styles.footerWrap__Dark]: isDarkTheme,
        })}
      >
        <div
          className={classnames(styles.footerWrap__Watermark, {
            [styles.footerWrap__WaterMark__Dark]: isDarkTheme,
          })}
        >
          ©2022 Blogfolio
        </div>
        <div
          className={classnames(styles.footerWrap__switchWrap, {
            [styles.footerWrap__switchWrap__Dark]: isDarkTheme,
          })}
        >
          <div
            className={classnames(styles.switchLabel, {
              [styles.switchLabel__Dark]: isDarkTheme,
            })}
          >
            <Label title={"Dark theme"} className={styles.switchLabel} />
          </div>
          <div
            className={classnames(styles.switch, {
              [styles.switch__Dark]: isDarkTheme,
            })}
          >
            <Switch checked={checked} handleChange={handleChange}></Switch>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
