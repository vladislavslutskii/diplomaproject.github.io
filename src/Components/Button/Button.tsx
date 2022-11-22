import React, { FC } from "react";
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
  return (
    <button
      onClick={onClick}
      className={` ${className || ``} ${BUTTON_TYPE_CLASSNAMES[type]} `}
      disabled={disabled}
    >
      {icon}
      {title}
    </button>
  );
};

export default Button;
