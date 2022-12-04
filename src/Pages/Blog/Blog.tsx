import React, { useEffect, useMemo, useState } from "react";
import classNames from "classnames";
import { Theme, useThemeContext } from "../../Context/ThemeContext/Context";
import styles from "./Blog.module.scss";
import Title from "../../Components/Title";
import {
  ButtonSort,
  DEFAULT_PAGE_NUMBER,
  PER_PAGE,
  SortOrder,
  TabsNames,
} from "../../Utils";
import Tabs from "../../Components/Tabs";
import Button from "../../Components/Button";
import { ButtonType } from "../../Components/Button/types";
import Select from "../../Components/Select";
import CardsList from "../../Components/CardsList";
import Paginate from "../../Components/Paginate";
import { useDispatch, useSelector } from "react-redux";
import {
  getBlogPosts,
  getPosts,
  setActiveTab,
} from "../../Redux/reducers/postsreducer";
import PostsSelectors from "../../Redux/selectors/postsSelectors";
import Lottie from "lottie-react";
import animation from "../../lotties/transfer.json";
import ButtonGroup from "../../Components/ButtonGroup";
import moment from "moment";
import EmptyState from "../../Components/EmptyState";

const TABS = [
  {
    key: TabsNames.Articles,
    title: "Articles",
    disabled: false,
  },
  {
    key: TabsNames.News,
    title: "News",
    disabled: false,
  },
];

const OPTIONS = [
  {
    key: SortOrder.Initial,
    title: "Initial",
    value: SortOrder.Initial,
  },
  {
    key: SortOrder.Title,
    title: "Title",
    value: SortOrder.Title,
  },
  {
    key: SortOrder.Date,
    title: "Date",
    value: SortOrder.Date,
  },
];

const BUTTON_GROUP = [
  {
    key: ButtonSort.Day,
    title: "Day",
  },
  {
    key: ButtonSort.Week,
    title: "Week",
  },
  {
    key: ButtonSort.Month,
    title: "Month",
  },
  {
    key: ButtonSort.Year,
    title: "Year",
  },
];

const Blog = () => {
  const { theme, onChangeTheme } = useThemeContext();
  const isDarkTheme = theme === Theme.Dark;
  const activeTab = useSelector(PostsSelectors.getActiveTab);

  const [order, setOrder] = useState(SortOrder.Initial);
  const isPostsLoading = useSelector(PostsSelectors.getPostsLoading);
  const [activeBtn, setActiveBtn] = useState<ButtonSort>();
  const dispatch = useDispatch();
  const onTabClick = (id: TabsNames) => {
    dispatch(setActiveTab(id));
  };

  const [page, setPage] = useState(DEFAULT_PAGE_NUMBER);
  const cardsCount = useSelector(PostsSelectors.getCardsCount);
  const cardsBlogCount = useSelector(PostsSelectors.getBlogCardsCount);

  const cardsList = useSelector(PostsSelectors.getCardsList);

  const blogPost = activeTab === TabsNames.News;
  const pagesCount = Math.ceil(
    blogPost ? cardsBlogCount / PER_PAGE : cardsCount / PER_PAGE
  );
  useEffect(() => {
    const _start = (page - 1) * PER_PAGE;
    const dateAgo = moment().add(-1, activeBtn).format("YYYY-MM-DDThh:mm:ss");
    const publishedAt = activeBtn ? dateAgo : undefined;
    const sort = activeBtn ? SortOrder.Date : order;
    dispatch(
      blogPost
        ? getBlogPosts({ _start, _sort: sort, publishedAt_gt: publishedAt })
        : getPosts({ _start, _sort: sort, publishedAt_gt: publishedAt })
    );
  }, [page, blogPost, order, activeBtn]);

  const onPageChange = ({ selected }: { selected: number }) => {
    setPage(selected + 1);
  };

  const onBtnGroupClick = (id: ButtonSort) => {
    setActiveBtn(id);
  };
  console.log(cardsList);
  return (
    <div
      className={classNames(styles.Blog, {
        [styles.Blog_Dark]: isDarkTheme,
      })}
    >
      <div
        className={classNames(styles.Blog_container, {
          [styles.Blog_container_Dark]: isDarkTheme,
        })}
      >
        <div
          className={classNames(styles.Blog_container_titleWrap, {
            [styles.Blog_container_titleWrap_Dark]: isDarkTheme,
          })}
        >
          {!isPostsLoading ? <Title title={"Blog"}></Title> : null}
        </div>
        <div className={styles.Blog_container_tabWrap}>
          {!isPostsLoading ? (
            <Tabs tabs={TABS} onClick={onTabClick} activeTab={activeTab}></Tabs>
          ) : null}
        </div>
        <div
          className={classNames(styles.filterMenu, {
            [styles.filterMenu_Dark]: isDarkTheme,
          })}
        >
          {!isPostsLoading ? (
            <div
              className={classNames(styles.filterMenu_buttonWrap, {
                [styles.filterMenu_buttonWrap_Dark]: isDarkTheme,
              })}
            >
              <ButtonGroup
                buttonGroup={BUTTON_GROUP}
                onClick={onBtnGroupClick}
                activeBtn={activeBtn}
              />
            </div>
          ) : null}
          <div
            className={classNames(styles.filterMenu_selectWrap, {
              [styles.filterMenu_selectWrap_Dark]: isDarkTheme,
            })}
          >
            {!isPostsLoading ? (
              <Select
                selectValue={order}
                onChange={(event: any) => setOrder(event.target.value)}
                options={OPTIONS}
              />
            ) : null}
          </div>
        </div>
        <div className={styles.Blog_container_CardsListWrap}>
          {!isPostsLoading ? (
            <CardsList cardList={cardsList} />
          ) : (
            <div className={styles.lottie_container}>
              <Lottie
                className={styles.lottie_container_animation}
                animationData={animation}
                loop={true}
              ></Lottie>
            </div>
          )}
          {cardsList.lenght === 0 ? null : "Sorry"}
        </div>
        <div className={styles.Blog_container_Paginate}>
          {activeBtn == null ? (
            <Paginate
              pagesCount={pagesCount}
              onPageChange={onPageChange}
              page={page}
            ></Paginate>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Blog;
