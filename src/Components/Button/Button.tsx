import React, { FC } from "react";
import styles from "./Button.module.scss";

import classNames from "classnames";
import { Theme, useThemeContext } from "../../Context/ThemeContext/Context";
import { ButtonClassnamesType, ButtonType, ButtonPropsType } from "./types";

const BUTTON_TYPE_CLASSNAMES: ButtonClassnamesType = {
  [ButtonType.Primary]: styles.primary,
  [ButtonType.Secondary]: styles.secondary,
};

const Button: FC<ButtonPropsType> = ({
  title,
  onClick,
  className,
  disabled,
  type,
  children,
}) => {
  const { theme } = useThemeContext();
  const isDarkTheme = theme === Theme.Dark;
  return (
    <button
      onClick={onClick}
      className={classNames(
        styles.button,
        BUTTON_TYPE_CLASSNAMES[type],
        className || "",
        {
          [styles.button_Dark]: isDarkTheme,
        }
      )}
      disabled={disabled}
    >
      {title || children}
    </button>
  );
};

export default Button;
