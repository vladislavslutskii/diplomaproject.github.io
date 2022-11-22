import { ReactNode } from "react";

export enum ButtonType {
  Primary = `primary`,
  Secondary = `secondary`,
  ButtonIcon = `ButtonIcon`,
}
export type ButtonClassnamesType = {
  [a in ButtonType]: string;
};
export type ButtonPropsType = {
  title: string | null;
  onClick?: () => void;
  className?: string;
  type: ButtonType;
  disabled?: boolean | undefined;
  icon?: ReactNode | null;
};
