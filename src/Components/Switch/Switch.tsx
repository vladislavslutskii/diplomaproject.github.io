import React, { useState } from "react";
import Switchs from "react-switch";
import styles from "./Switch.module.scss";

const Switch = ({ handleChange, checked }: any) => {
  return (
    <Switchs
      onChange={handleChange}
      checked={checked}
      className={styles.switch}
      offColor={`#aeaeae`}
      onColor={`#6c1bdb`}
      width={32}
      height={20}
      handleDiameter={16}
      borderRadius={16}
      uncheckedIcon={false}
      checkedIcon={false}
    />
  );
};

export default Switch;
