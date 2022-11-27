import classNames from "classnames";
import React, { FC } from "react";
import { Theme, useThemeContext } from "../../Context/ThemeContext/Context";
import styles from "./Button.module.scss";

import { ButtonClassnamesType, ButtonType, ButtonPropsType } from "./types";

const BUTTON_TYPE_CLASSNAMES: ButtonClassnamesType = {
  [ButtonType.Primary]: styles.primary,
  [ButtonType.Secondary]: styles.secondary,
  [ButtonType.ButtonIcon]: styles.ButtonIcon,
};

const Button: FC<ButtonPropsType> = ({
  title,
  onClick,
  className,
  disabled,
  type,
  icon,
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
      {icon}
      {title}
    </button>
  );
};

export default Button;
