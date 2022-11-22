import React, { useEffect, useState } from "react";
import classNames from "classnames";
import { Theme, useThemeContext } from "../../Context/ThemeContext/Context";
import styles from "./Blog.module.scss";
import Title from "../../Components/Title";
import { SortOrder, TabsNames } from "../../Utils";
import Tabs from "../../Components/Tabs";
import Button from "../../Components/Button";
import { ButtonType } from "../../Components/Button/types";
import Select from "../../Components/Select";
import CardsList from "../../Components/CardsList";
import Paginate from "../../Components/Paginate";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../../Redux/reducers/postsreducer";
import PostsSelectors from "../../Redux/selectors/postsSelectors";
import Lottie from "lottie-react";
import animation from "../../lotties/transfer.json";

const Blog = () => {
  const { theme, onChangeTheme } = useThemeContext();
  const isDarkTheme = theme === Theme.Dark;

  const [order, setOrder] = useState(SortOrder.TitleAToZ);
  const isPostsLoading = useSelector(PostsSelectors.getPostsLoading);

  const TABS_NAME = [
    {
      key: TabsNames.All,
      title: "Articles",
      disabled: false,
    },
    {
      key: TabsNames.Favorites,
      title: "News",
      disabled: false,
    },
  ];
  const options = [
    {
      key: SortOrder.TitleAToZ,
      title: "Title (A-Z)",
      value: SortOrder.TitleAToZ,
    },
    {
      key: SortOrder.TitleZtoA,
      title: "Title (Z-A)",
      value: SortOrder.TitleZtoA,
    },
  ];

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, []);

  const cardsList = useSelector(PostsSelectors.getCardsList);
  return (
    <div
      className={classNames(styles.Blog, {
        [styles.Blog__Dark]: isDarkTheme,
      })}
    >
      {!isPostsLoading ? (
        <div
          className={classNames(styles.Blog__container, {
            [styles.Blog__container__Dark]: isDarkTheme,
          })}
        >
          <div
            className={classNames(styles.Blog__container__titleWrap, {
              [styles.Blog__container__titleWrap__Dark]: isDarkTheme,
            })}
          >
            <Title title={"Blog"}></Title>
          </div>
          <div className={styles.Blog__container__tabWrap}>
            <Tabs
              tabs={TABS_NAME}
              onClick={function (id: TabsNames): void {
                throw new Error("Function not implemented.");
              }}
              activeTab={TabsNames.All}
            ></Tabs>
          </div>
          <div
            className={classNames(styles.filterMenu, {
              [styles.filterMenu__Dark]: isDarkTheme,
            })}
          >
            <div
              className={classNames(styles.filterMenu__buttonWrap, {
                [styles.filterMenu__buttonWrap__Dark]: isDarkTheme,
              })}
            >
              <Button
                className={styles.filterMenu__buttonWrap__buttons}
                title={`Day`}
                onClick={() => alert(`1`)}
                type={ButtonType.Primary}
                disabled={false}
              ></Button>
              <Button
                className={styles.filterMenu__buttonWrap__buttons}
                title={`Week`}
                onClick={() => alert(`1`)}
                type={ButtonType.Primary}
                disabled={true}
              ></Button>
              <Button
                className={styles.filterMenu__buttonWrap__buttons}
                title={`Month`}
                onClick={() => alert(`1`)}
                type={ButtonType.Primary}
                disabled={true}
              ></Button>
              <Button
                title={`Year`}
                onClick={() => alert(`1`)}
                type={ButtonType.Primary}
                disabled={true}
              ></Button>
            </div>
            <div
              className={classNames(styles.filterMenu__selectWrap, {
                [styles.filterMenu__selectWrap__Dark]: isDarkTheme,
              })}
            >
              <Select
                selectValue={order}
                onChange={(event: any) => setOrder(event.target.value)}
                options={options}
              />
            </div>
          </div>
          <div className={styles.Blog__container__CardsListWrap}>
            <CardsList cardList={cardsList}></CardsList>
          </div>
          <div className={styles.Blog__container__Paginate}>
            <Paginate pagesCount={`16`}></Paginate>
          </div>
        </div>
      ) : (
        <div className={styles.lottie__container}>
          <Lottie
            className={styles.lottie__container__animation}
            animationData={animation}
            loop={true}
          ></Lottie>
        </div>
      )}
    </div>
  );
};

export default Blog;
