import React, { useState } from "react";
import styles from "./app.module.scss";

import ThemeProvider from "./Context/ThemeContext/Provider";
import Router from "./Pages/Router";
import { Provider, useDispatch, useSelector } from "react-redux";
import store from "./Redux/store";
import { changeTheme } from "./Redux/reducers/themeReducer";
import ThemeSelectors from "./Redux/selectors/themeSelectors";

export const POST_MOCK = [
  {
    id: 0,
    image:
      "https://cdn.pixabay.com/photo/2015/12/05/08/25/fantasy-1077863__340.jpg",
    text: "Astronauts Kayla Barron and Raja Chari floated out of the International Space Station airlock for a spacewalk Tuesday, installing brackets and struts to support new solar arrays to upgrade the research lab’s power system on the same day that crewmate Mark Vande Hei marked his 341st day in orbit, a U.S. record for a single spaceflight",

    date: "April 20, 2021",
    title:
      "Astronauts prep for new solar arrays on nearly seven-hour spacewalk",
  },
  {
    id: 1,
    image:
      "https://cdn.pixabay.com/photo/2015/12/05/08/25/fantasy-1077863__340.jpg",
    text: "Astronauts Kayla Barron and Raja Chari floated out of the International Space Station airlock for a spacewalk Tuesday, installing brackets and struts to support new solar arrays to upgrade the research lab’s power system on the same day that crewmate Mark Vande Hei marked his 341st day in orbit, a U.S. record for a single spaceflight",

    date: "April 20, 2021",
    title:
      "Astronauts prep for new solar arrays on nearly seven-hour spacewalk",
  },
  {
    id: 2,
    image:
      "https://cdn.pixabay.com/photo/2017/02/08/12/46/moon-2048727__340.jpg",
    text: "Astronauts Kayla Barron and Raja Chari floated out of the International Space Station airlock for a spacewalk Tuesday, installing brackets and struts to support new solar arrays to upgrade the research lab’s power system on the same day that crewmate Mark Vande Hei marked his 341st day in orbit, a U.S. record for a single spaceflight",
    date: "April 20, 2021",
    title:
      "Astronauts prep for new solar arrays on nearly seven-hour spacewalk",
  },
  {
    id: 3,
    image:
      "https://cdn.pixabay.com/photo/2016/10/30/20/22/astronaut-1784245__340.jpg",
    text: "Astronauts Kayla Barron and Raja Chari floated out of the International Space Station airlock for a spacewalk Tuesday, installing brackets and struts to support new solar arrays to upgrade the research lab’s power system on the same day that crewmate Mark Vande Hei marked his 341st day in orbit, a U.S. record for a single spaceflight",
    date: "April 20, 2021",
    title:
      "Astronauts prep for new solar arrays on nearly seven-hour spacewalk",
  },
  {
    id: 4,
    image:
      "https://cdn.pixabay.com/photo/2022/03/10/13/59/astronaut-7059915__340.png",
    text: "Astronauts Kayla Barron and Raja Chari floated out of the International Space Station airlock for a spacewalk Tuesday, installing brackets and struts to support new solar arrays to upgrade the research lab’s power system on the same day that crewmate Mark Vande Hei marked his 341st day in orbit, a U.S. record for a single spaceflight",
    date: "April 20, 2021",

    title:
      "Astronauts prep for new solar arrays on nearly seven-hour spacewalk",
  },
  {
    id: 5,
    image:
      "https://cdn.pixabay.com/photo/2016/11/19/20/16/astronaut-1840936__340.jpg",
    text: "Astronauts Kayla Barron and Raja Chari floated out of the International Space Station airlock for a spacewalk Tuesday, installing brackets and struts to support new solar arrays to upgrade the research lab’s power system on the same day that crewmate Mark Vande Hei marked his 341st day in orbit, a U.S. record for a single spaceflight",
    date: "April 20, 2021",
    title:
      "Astronauts prep for new solar arrays on nearly seven-hour spacewalk",
  },
  {
    id: 6,
    image:
      "https://cdn.pixabay.com/photo/2018/04/22/05/29/star-3340185__340.png",
    text: "Astronauts Kayla Barron and Raja Chari floated out of the International Space Station airlock for a spacewalk Tuesday, installing brackets and struts to support new solar arrays to upgrade the research lab’s power system on the same day that crewmate Mark Vande Hei marked his 341st day in orbit, a U.S. record for a single spaceflight",
    date: "April 20, 2021",
    title:
      "Astronauts prep for new solar arrays on nearly seven-hour spacewalk",
  },
  {
    id: 7,
    image:
      "https://cdn.pixabay.com/photo/2012/10/10/11/06/moon-walk-60616__340.jpg",
    text: "Astronauts Kayla Barron and Raja Chari floated out of the International Space Station airlock for a spacewalk Tuesday, installing brackets and struts to support new solar arrays to upgrade the research lab’s power system on the same day that crewmate Mark Vande Hei marked his 341st day in orbit, a U.S. record for a single spaceflight",
    date: "April 20, 2021",
    title:
      "Astronauts prep for new solar arrays on nearly seven-hour spacewalk",
  },
  {
    id: 8,
    image:
      "https://cdn.pixabay.com/photo/2019/09/06/10/36/astronaut-4456106__340.jpg",
    text: "Astronauts Kayla Barron and Raja Chari floated out of the International Space Station airlock for a spacewalk Tuesday, installing brackets and struts to support new solar arrays to upgrade the research lab’s power system on the same day that crewmate Mark Vande Hei marked his 341st day in orbit, a U.S. record for a single spaceflight",
    date: "April 20, 2021",
    title:
      "Astronauts prep for new solar arrays on nearly seven-hour spacewalk",
  },
  {
    id: 9,
    image:
      "https://cdn.pixabay.com/photo/2016/11/22/14/41/astronaut-1849402__340.jpg",
    text: "Astronauts Kayla Barron and Raja Chari floated out of the International Space Station airlock for a spacewalk Tuesday, installing brackets and struts to support new solar arrays to upgrade the research lab’s power system on the same day that crewmate Mark Vande Hei marked his 341st day in orbit, a U.S. record for a single spaceflight",
    date: "April 20, 2021",
    title:
      "Astronauts prep for new solar arrays on nearly seven-hour spacewalk",
  },
  {
    id: 10,
    image:
      "https://cdn.pixabay.com/photo/2012/10/25/23/40/moon-landing-62879__340.jpg",
    text: "Astronauts Kayla Barron and Raja Chari floated out of the International Space Station airlock for a spacewalk Tuesday, installing brackets and struts to support new solar arrays to upgrade the research lab’s power system on the same day that crewmate Mark Vande Hei marked his 341st day in orbit, a U.S. record for a single spaceflight",
    date: "April 20, 2021",
    title:
      "Astronauts prep for new solar arrays on nearly seven-hour spacewalk",
  },
  {
    id: 11,
    image:
      "https://cdn.pixabay.com/photo/2022/03/01/02/51/galaxy-7040416__340.png",
    text: "Astronauts Kayla Barron and Raja Chari floated out of the International Space Station airlock for a spacewalk Tuesday, installing brackets and struts to support new solar arrays to upgrade the research lab’s power system on the same day that crewmate Mark Vande Hei marked his 341st day in orbit, a U.S. record for a single spaceflight",
    date: "April 20, 2021",
    title:
      "Astronauts prep for new solar arrays on nearly seven-hour spacewalk",
  },
];
const App = () => {
  const dispatch = useDispatch();

  const onChangeTheme = () => {
    dispatch(changeTheme());
  };

  const theme = useSelector(ThemeSelectors.getTheme);
  return (
    <ThemeProvider theme={theme} onChangeTheme={onChangeTheme}>
      <Router></Router>
    </ThemeProvider>
  );
};

const AppWithStore = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

export default AppWithStore;

// {/* <div className={styles.app}>
//         {/* <EmptyState></EmptyState> */}
//         {/* <Post
//           post={{
//             id: 0,
//             image:
//               "https://cdn.pixabay.com/photo/2015/12/05/08/25/fantasy-1077863__340.jpg",
//             text: "Astronauts Kayla Barron and Raja Chari floated out of the International Space Station airlock for a spacewalk Tuesday, installing brackets and struts to support new solar arrays to upgrade the research lab’s power system on the same day that crewmate Mark Vande Hei marked his 341st day in orbit, a U.S. record for a single spaceflight",

//             date: "April 20, 2021",
//             title:
//               "Astronauts prep for new solar arrays on nearly seven-hour spacewalk",
//           }}
//         ></Post> */}
//         {/* <Search></Search> */}
//         {/* <Blog></Blog> */}
//         {/* <SearchList searchedPosts={POST_MOCK}></SearchList> */}
//         {/* <CardsList cardList={POST_MOCK}></CardsList> */}
//         {/* <Footer></Footer> */}
//         {/* <SignIn></SignIn> */}
//         {/* <Card post={POST_MOCK[0]} size={"large"}></Card> */}
//         {/* <Header></Header>
//       <Selector></Selector> */}
//         {/* <Button
//         title={`Primary`}
//         onClick={() => alert(`1`)}
//         type={ButtonType.Primary}
//         disabled={false}
//       ></Button>
//       <Button
//         title={`Secondary`}
//         onClick={() => alert(`1`)}
//         type={ButtonType.Secondary}
//         disabled={false}
//       ></Button>

//       <Label title={"Title"}></Label>
//       <Input
//         className={styles.header__input}
//         placeholder={"Search..."}
//         onChange={onChange}
//         value={value}
//       />
//       <Paginate></Paginate>
//       <Tabs
//         tabs={TABS_NAME}
//         onClick={function (id: TabsNames): void {
//           throw new Error("Function not implemented.");
//         }}
//         activeTab={TabsNames.All}
//       ></Tabs>
//       <Switch checked={checked} handleChange={handleChange}></Switch>
//       <User username={"Sign In"}></User> */}
//       </div> */}

// // Input
//   const [value, setValue] = useState<string>("");
//   const onChange = (inputValue: string) => {
//     setValue(inputValue);
//   };
//   // _________________

//   const TABS_NAME = [
//     {
//       key: TabsNames.All,
//       title: "Articles",
//       disabled: false,
//     },
//     {
//       key: TabsNames.Favorites,
//       title: "News",
//       disabled: false,
//     },
//   ];

//   // Switch
//   const [checked, setChecked] = useState(false);
//   const handleChange = (nextChecked: boolean) => {
//     setChecked(nextChecked);
//   };
//   // _________________
