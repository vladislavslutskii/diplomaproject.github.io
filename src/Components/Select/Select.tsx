import React, { Children, FC } from "react";
import classNames from "classnames";

import styles from "./Select.module.scss";
import { SelectProps } from "./types";
import Label from "../Label";
import { Theme, useThemeContext } from "../../Context/ThemeContext/Context";

const Select: FC<SelectProps> = ({
  options,
  selectValue,
  onChange,
  disabled,
}) => {
  const { theme } = useThemeContext();
  const isDarkTheme = theme === Theme.Dark;
  return (
    <div
      className={classNames(styles.selectWrap, {
        [styles.selectWrap__Dark]: isDarkTheme,
      })}
    >
      <select
        value={selectValue}
        onChange={onChange}
        disabled={disabled}
        className={classNames(styles.select, {
          [styles.select__Dark]: isDarkTheme,
        })}
      >
        {options.map(({ key, title, value }) => {
          return (
            <option
              key={key}
              value={value}
              className={classNames(styles.option, {
                [styles.option_Dark]: isDarkTheme,
              })}
            >
              {title}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default Select;
