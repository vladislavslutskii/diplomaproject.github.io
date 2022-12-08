import React, { useEffect, useState } from "react";
import styles from "./Blog.module.scss";

import classNames from "classnames";
import Title from "../../Components/Title";
import {
  ButtonSort,
  DEFAULT_PAGE_NUMBER,
  PER_PAGE,
  SortOrder,
  TabsNames,
} from "../../Utils";
import Tabs from "../../Components/Tabs";
import Select from "../../Components/Select";
import CardsList from "../../Components/CardsList";
import Paginate from "../../Components/Paginate";
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
import PostModalImg from "./Components/PostModalImg";
import { Theme, useThemeContext } from "../../Context/ThemeContext/Context";
import { useDispatch, useSelector } from "react-redux";

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
  const dispatch = useDispatch();
  const { theme } = useThemeContext();
  const isDarkTheme = theme === Theme.Dark;
  const activeTab = useSelector(PostsSelectors.getActiveTab);
  const cardsCount = useSelector(PostsSelectors.getCardsCount);
  const cardsBlogCount = useSelector(PostsSelectors.getBlogCardsCount);
  const cardsList = useSelector(PostsSelectors.getCardsList);
  const isPostsLoading = useSelector(PostsSelectors.getPostsLoading);
  const [page, setPage] = useState(DEFAULT_PAGE_NUMBER);
  const [order, setOrder] = useState(SortOrder.Initial);
  const [activeBtn, setActiveBtn] = useState<ButtonSort | undefined>();

  const onTabClick = (id: TabsNames) => {
    dispatch(setActiveTab(id));
    setActiveBtn(undefined);
    setOrder(SortOrder.Initial);
  };

  const blogPost = activeTab === TabsNames.News;
  const pagesCount = Math.ceil(
    blogPost ? cardsBlogCount / PER_PAGE : cardsCount / PER_PAGE
  );

  const onPageChange = ({ selected }: { selected: number }) => {
    setPage(selected + 1);
  };

  const onBtnGroupClick = (id: ButtonSort) => {
    console.log(id);
    if (activeBtn === id) {
      setActiveBtn(undefined);
    } else {
      setActiveBtn(id);
      setOrder(SortOrder.Initial);
    }
  };

  const onSelectClick = (event: any) => {
    setOrder(event.target.value);
    setActiveBtn(undefined);
  };

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

  return (
    <div
      className={classNames(styles.Blog, {
        [styles.Blog_Dark]: isDarkTheme,
      })}
    >
      <PostModalImg></PostModalImg>
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
        <div
          className={classNames(styles.Blog_container_tabWrap, {
            [styles.Blog_container_tabWrap_Dark]: isDarkTheme,
          })}
        >
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
                onChange={onSelectClick}
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
          {cardsList.length === 0 ? <EmptyState></EmptyState> : null}
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
