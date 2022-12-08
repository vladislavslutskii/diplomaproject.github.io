import { FC } from "react";
import styles from "./ButtonGroup.module.scss";

import classNames from "classnames";
import Button from "../Button";
import { ButtonGroupProps } from "./types";
import { Theme, useThemeContext } from "../../Context/ThemeContext/Context";
import { ButtonType } from "../Button/types";

const ButtonGroup: FC<ButtonGroupProps> = ({
  buttonGroup,
  onClick,
  activeBtn,
}) => {
  const { theme } = useThemeContext();

  return (
    <div
      className={classNames(styles.buttonGroupWrapper, {
        [styles.darkContainer]: theme === Theme.Dark,
      })}
    >
      {buttonGroup.map(({ key, title }) => {
        return (
          <Button
            key={key}
            type={activeBtn === key ? ButtonType.Primary : ButtonType.Secondary}
            onClick={() => onClick(key)}
          >
            {title}
          </Button>
        );
      })}
    </div>
  );
};

export default ButtonGroup;
