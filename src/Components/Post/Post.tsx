import React, { FC } from "react";
import styles from "./Post.module.scss";

import classNames from "classnames";
import { Theme, useThemeContext } from "../../Context/ThemeContext/Context";
import { PostProps } from "./type";
import { Facebook, Other, Tvitter } from "../../Assets/Icons";
import { Link, useNavigate } from "react-router-dom";
import { PathNames } from "../../Pages/Router";
import PostModalImg from "../../Pages/Blog/Components/PostModalImg";

const Post: FC<PostProps> = ({ post }) => {
  const { theme } = useThemeContext();
  const isDarkTheme = theme === Theme.Dark;
  const { imageUrl, text, title, id } = post;
  console.log(post);
  return (
    <div
      className={classNames(styles.Post, {
        [styles.Post_Dark]: isDarkTheme,
      })}
    >
      <PostModalImg></PostModalImg>
      <div
        className={classNames(styles.Post_container, {
          [styles.Post_container_Dark]: isDarkTheme,
        })}
      >
        <div className={styles.Post_container_buttonAndIDWrap}>
          <div className={styles.linkWrap}>
            <Link
              to={PathNames.Home}
              className={classNames(styles.linkWrap, {
                [styles.linkWrap_Dark]: isDarkTheme,
              })}
            >
              Home |
            </Link>
          </div>
          <div
            className={classNames(styles.idWrap, {
              [styles.idWrap_Dark]: isDarkTheme,
            })}
          >{`Post ${id}`}</div>
        </div>
        <div
          className={classNames(styles.Post_container_titleWrap, {
            [styles.Post_container_titleWrap_Dark]: isDarkTheme,
          })}
        >
          {title}
        </div>
        <div className={styles.Post_container_imgWrap}>
          <img
            className={styles.Post_container_imgWrap_img}
            src={imageUrl || undefined}
            alt={"#"}
          />
        </div>
        <div className={styles.Post_container_textWrap}>
          <div
            className={classNames(styles.Post_container_textWrap_text, {
              [styles.Post_container_textWrap_text_Dark]: isDarkTheme,
            })}
          >
            {text}
          </div>
        </div>
        <div className={styles.Post_container_buttonsWrap}>
          <div className={styles.Post_container_buttonsWrap_rightSide}>
            <div
              className={classNames(styles.Post_container_buttonsWrap_buttons, {
                [styles.Post_container_buttonsWrap_buttons_Dark]: isDarkTheme,
              })}
            >
              <a target="_blank" href="https://twitter.com/?lang=ru">
                <Tvitter width={24} height={24}></Tvitter>
              </a>
            </div>
            <div
              className={classNames(styles.Post_container_buttonsWrap_buttons, {
                [styles.Post_container_buttonsWrap_buttons_Dark]: isDarkTheme,
              })}
            >
              <a
                target="_blank"
                href="https://www.facebook.com/campaign/landing.php?campaign_id=17872459592&extra_1=s%7Cc%7C613001315951%7Cb%7Cfacebook%20%27%7C&placement=&creative=613001315951&keyword=facebook%20%27&partner_id=googlesem&extra_2=campaignid%3D17872459592%26adgroupid%3D145027591648%26matchtype%3Db%26network%3Dg%26source%3Dnotmobile%26search_or_content%3Ds%26device%3Dc%26devicemodel%3D%26adposition%3D%26target%3D%26targetid%3Dkwd-327195741349%26loc_physical_ms%3D9062749%26loc_interest_ms%3D%26feeditemid%3D%26param1%3D%26param2%3D&gclid=Cj0KCQiAm5ycBhCXARIsAPldzoVRH3zyraXIJ1bfWxyKBuKZzLUcNyHV0CxDyQLpAmtvEW6Xjme72Y0aAoHNEALw_wcB"
              >
                <Facebook width={24} height={24}></Facebook>
              </a>
            </div>
            <div
              className={classNames(styles.Post_container_buttonsWrap_buttons, {
                [styles.Post_container_buttonsWrap_buttons_Dark]: isDarkTheme,
              })}
            >
              <Other width={24} height={24}></Other>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
