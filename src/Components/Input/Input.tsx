import { FC, ChangeEvent } from "react";
import styles from "./Input.module.scss";

import classNames from "classnames";
import { InputProps } from "./types";

const Input: FC<InputProps> = ({
  type = "text",
  value,
  onChange,
  placeholder = "",
  className,
  disabled,
  error,
  onBlur,
}) => {
  const onInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
    onChange(evt.target.value);
  };

  const onTextAreaChange = (evt: ChangeEvent<HTMLTextAreaElement>) => {
    onChange(evt.target.value);
  };
  return type !== "textarea" ? (
    <input
      type={type}
      onChange={onInputChange}
      value={value}
      onBlur={onBlur}
      placeholder={placeholder}
      className={classNames(className, styles.input, { [styles.error]: error })}
      disabled={disabled}
    />
  ) : (
    <textarea
      onChange={onTextAreaChange}
      value={value}
      onBlur={onBlur}
      placeholder={placeholder}
      className={classNames(styles.input, className, { [styles.error]: error })}
      disabled={disabled}
    />
  );
};
export default Input;
