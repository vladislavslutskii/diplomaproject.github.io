import React, { FC } from "react";
import styles from "./Title.module.scss";

import classnames from "classnames";
import { useThemeContext, Theme } from "../../Context/ThemeContext/Context";
import { TitleTypeProps } from "./types";

const Title: FC<TitleTypeProps> = ({ title }) => {
  const { theme, onChangeTheme } = useThemeContext();

  return (
    <div
      className={classnames(styles.title_Wrap, {
        [styles.title_WrapDark]: theme === Theme.Dark,
      })}
    >
      <h1>{title}</h1>
    </div>
  );
};
export default Title;
