import React, { useEffect, useMemo, useState } from "react";
import classNames from "classnames";
import { Theme, useThemeContext } from "../../Context/ThemeContext/Context";
import styles from "./Blog.module.scss";
import Title from "../../Components/Title";
import {
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
  getBlogPostsCount,
  getPosts,
  getPostsCount,
  setActiveTab,
} from "../../Redux/reducers/postsreducer";
import PostsSelectors from "../../Redux/selectors/postsSelectors";
import Lottie from "lottie-react";
import animation from "../../lotties/transfer.json";

const Blog = () => {
  const { theme, onChangeTheme } = useThemeContext();
  const isDarkTheme = theme === Theme.Dark;
  const activeTab = useSelector(PostsSelectors.getActiveTab);

  const [order, setOrder] = useState(SortOrder.Initial);
  const isPostsLoading = useSelector(PostsSelectors.getPostsLoading);

  const onTabClick = (id: TabsNames) => {
    dispatch(setActiveTab(id));
  };

  const [page, setPage] = useState(DEFAULT_PAGE_NUMBER);
  const cardsCount = useSelector(PostsSelectors.getCardsCount);
  const cardsBlogCount = useSelector(PostsSelectors.getBlogCardsCount);

  const cardsList = useSelector(PostsSelectors.getCardsList);

  const tabs = useMemo(
    () => [
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
    ],
    []
  );

  const options = [
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

  const dispatch = useDispatch();

  const blogPost = activeTab === TabsNames.News;
  // newsPost ? PostsSelectors.getBlogPost : PostsSelectors.getCardsList;
  // newsPost ? PostsSelectors.getBlogCardsCount : PostsSelectors.getCardsCount;
  const pagesCount = Math.ceil(
    blogPost ? cardsBlogCount / PER_PAGE : cardsCount / PER_PAGE
  );
  useEffect(() => {
    const _start = (page - 1) * PER_PAGE;
    dispatch(
      blogPost
        ? getBlogPosts({ _start, _sort: order })
        : getPosts({ _start, _sort: order })
    );
    dispatch(blogPost ? getBlogPostsCount() : getPostsCount());
  }, [page, blogPost, order]);

  const onPageChange = ({ selected }: { selected: number }) => {
    setPage(selected + 1);
  };

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
            <Tabs tabs={tabs} onClick={onTabClick} activeTab={activeTab}></Tabs>
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
              <Button
                className={styles.filterMenu_buttonWrap_buttons}
                title={`Day`}
                onClick={() => alert(`1`)}
                type={ButtonType.Primary}
                disabled={false}
              ></Button>
              <Button
                className={styles.filterMenu_buttonWrap_buttons}
                title={`Week`}
                onClick={() => alert(`1`)}
                type={ButtonType.Primary}
                disabled={true}
              ></Button>
              <Button
                className={styles.filterMenu_buttonWrap_buttons}
                title={`Month`}
                onClick={() => alert(`1`)}
                type={ButtonType.Primary}
              ></Button>
              <Button
                title={`Year`}
                onClick={() => alert(`1`)}
                type={ButtonType.Primary}
              ></Button>
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
                options={options}
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
        </div>
        <div className={styles.Blog_container_Paginate}>
          <Paginate
            pagesCount={pagesCount}
            onPageChange={onPageChange}
            page={page}
          ></Paginate>
        </div>
      </div>
    </div>
  );
};

export default Blog;
