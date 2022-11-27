import React, { FC } from "react";
import styles from "./Label.module.scss";
import classNames from "classnames";

import { LabelProps } from "./types";
import { Theme, useThemeContext } from "../../Context/ThemeContext/Context";

const Label: FC<LabelProps> = ({ title, required, className }) => {
  const { theme, onChangeTheme } = useThemeContext();
  const isDarkTheme = theme === Theme.Dark;
  return (
    <div
      className={classNames(styles.label, className, {
        [styles.required]: required,
        [styles.label_Dark]: isDarkTheme,
      })}
    >
      {title}
    </div>
  );
};

export default Label;
