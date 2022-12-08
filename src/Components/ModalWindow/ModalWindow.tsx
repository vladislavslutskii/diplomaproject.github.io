import React, { FC } from "react";
import styles from "./ModalWindow.module.scss";

import classnames from "classnames";
import { ModalWindowPropsType } from "./types";
import { Theme, useThemeContext } from "../../Context/ThemeContext/Context";

const ModalWindow: FC<ModalWindowPropsType> = ({
  active,
  closeModal,
  children,
}) => {
  const { theme } = useThemeContext();
  const isDarkTheme = theme === Theme.Dark;

  return (
    <div
      className={classnames(styles.modal, {
        [styles.modalActive]: active,
        [styles.modal_Dark]: isDarkTheme,
      })}
      onClick={closeModal}
    >
      <div
        className={classnames(styles.modal_content, {
          [styles.modalActive_content]: active,
          [styles.modalActive_content_Dark]: isDarkTheme,
        })}
        onClick={(event) => event.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

export default ModalWindow;
