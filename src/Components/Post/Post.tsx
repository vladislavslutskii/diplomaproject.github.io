import React, { FC } from "react";
import styles from "./Post.module.scss";
import classNames from "classnames";
import { Theme, useThemeContext } from "../../Context/ThemeContext/Context";
import { PostProps } from "./type";
import Button from "../Button";
import { ButtonType } from "../Button/types";
import { Facebook, Other, Tvitter } from "../../Assets/Icons";
import { Link } from "react-router-dom";
import { PathNames } from "../../Pages/Router";

const Post: FC<PostProps> = ({ post }) => {
  const { theme } = useThemeContext();
  const isDarkTheme = theme === Theme.Dark;
  const { imageUrl, summary, title, id } = post;

  return (
    <div
      className={classNames(styles.Post, {
        [styles.Post__Dark]: isDarkTheme,
      })}
    >
      <div
        className={classNames(styles.Post__container, {
          [styles.Post__container__Dark]: isDarkTheme,
        })}
      >
        <div className={styles.Post__container__buttonAndIDWrap}>
          <div className={styles.linkWrap}>
            <Link
              to={PathNames.Home}
              className={classNames(styles.linkWrap, {
                [styles.linkWrap__Dark]: isDarkTheme,
              })}
            >
              Home |
            </Link>
          </div>
          <div
            className={classNames(styles.idWrap, {
              [styles.idWrap__Dark]: isDarkTheme,
            })}
          >{`Post ${id}`}</div>
        </div>
        <div
          className={classNames(styles.Post__container__titleWrap, {
            [styles.Post__container__titleWrap__Dark]: isDarkTheme,
          })}
        >
          {title}
        </div>
        <div className={styles.Post__container__imgWrap}>
          <img
            className={styles.Post__container__imgWrap__img}
            src={imageUrl || undefined}
            alt={"#"}
          />
        </div>
        <div className={styles.Post__container__textWrap}>
          <div
            className={classNames(styles.Post__container__textWrap__text, {
              [styles.Post__container__textWrap__text__Dark]: isDarkTheme,
            })}
          >
            {summary}
          </div>
        </div>
        <div className={styles.Post__container__buttonsWrap}>
          <div className={styles.Post__container__buttonsWrap__rightSide}>
            <Button
              type={ButtonType.ButtonIcon}
              title={null}
              onClick={() => alert(`Я кнопка - иконка(Лайк)`)}
              className={styles.ButtonIconTvitter}
              icon={<Tvitter width={24} height={24}></Tvitter>}
            ></Button>
            <Button
              type={ButtonType.ButtonIcon}
              title={null}
              onClick={() => alert(`Я кнопка - иконка(Дизлайк)`)}
              className={styles.ButtonIconFacebook}
              icon={<Facebook width={24} height={24}></Facebook>}
            ></Button>
            <Button
              type={ButtonType.ButtonIcon}
              title={null}
              onClick={() => alert(`Я кнопка - иконка(Дизлайк)`)}
              className={styles.ButtonIconOther}
              icon={<Other width={24} height={24}></Other>}
            ></Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
