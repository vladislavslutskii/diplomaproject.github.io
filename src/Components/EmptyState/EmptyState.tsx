import React from "react";
import styles from "./EmptyState.module.scss";

import classnames from "classnames";
import PostsSelectors from "../../Redux/selectors/postsSelectors";
import { useThemeContext, Theme } from "../../Context/ThemeContext/Context";
import { Link } from "react-router-dom";
import { PathNames } from "../../Pages/Router";
import { useSelector } from "react-redux";

const EmptyState = () => {
  const { theme } = useThemeContext();
  const cardsList = useSelector(PostsSelectors.getCardsList);

  return (
    <div
      className={classnames(styles.emptyStateWrap, {
        [styles.emptyStateWrap_Dark]: theme === Theme.Dark,
      })}
    >
      <div
        className={classnames(styles.emptyStateWrap_containerImg, {
          [styles.emptyStateWrap_containerImg_Dark]: theme === Theme.Dark,
        })}
      >
        <img
          src="https://keenthemes.ams3.digitaloceanspaces.com/market/images/doozy/doozy_free/20.png"
          alt="#"
        />
      </div>
      <div
        className={classnames(styles.emptyStateWrap_containerText, {
          [styles.emptyStateWrap_containerText_Dark]: theme === Theme.Dark,
        })}
      >
        <div className={styles.nothingFound}>
          Sorry, there`s nothing was found
        </div>
        <div className={styles.tryToAdjusting}>
          Try to adjusting your search
        </div>
        {cardsList.length === 0 ? null : (
          <Link
            to={PathNames.Home}
            className={classnames(styles.goHome, {
              [styles.goHome_Dark]: theme === Theme.Dark,
            })}
          >
            <div>Go Home</div>
          </Link>
        )}
      </div>
    </div>
  );
};

export default EmptyState;
