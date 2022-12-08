import { useState } from "react";
import styles from "./Footer.module.scss";

import classnames from "classnames";
import Label from "../Label";
import Switch from "../Switch";
import { useThemeContext, Theme } from "../../Context/ThemeContext/Context";

const Footer = () => {
  const { theme, onChangeTheme } = useThemeContext();
  const [checked, setChecked] = useState(false);
  const isDarkTheme = theme === Theme.Dark;

  const handleChange = (nextChecked: boolean) => {
    setChecked(nextChecked);
    onChangeTheme();
  };

  return (
    <div
      className={classnames(styles.footer, {
        [styles.footer_Dark]: isDarkTheme,
      })}
    >
      <div
        className={classnames(styles.footerWrap, {
          [styles.footerWrap_Dark]: isDarkTheme,
        })}
      >
        <div
          className={classnames(styles.footerWrap_Watermark, {
            [styles.footerWrap_WaterMark_Dark]: isDarkTheme,
          })}
        >
          ©2022 Blogfolio
        </div>
        <div
          className={classnames(styles.footerWrap_switchWrap, {
            [styles.footerWrap_switchWrap_Dark]: isDarkTheme,
          })}
        >
          <div
            className={classnames(styles.switchLabel, {
              [styles.switchLabel_Dark]: isDarkTheme,
            })}
          >
            <Label title={"Dark theme"} className={styles.switchLabel} />
          </div>
          <div
            className={classnames(styles.switch, {
              [styles.switch_Dark]: isDarkTheme,
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
