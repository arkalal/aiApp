import React, { Suspense, lazy } from "react";
import styles from "./Home.module.scss";
import Navbar from "../Navbar/Navbar";
import ReduxProvider from "../../../../redux/ReduxProvider";

const Banner = lazy(() => import("../Banner/Banner"));
const Showcase = lazy(() => import("../../../Showcase/Showcase"));
const ShowBox = lazy(() => import("../../../Showcase/ShowBox/ShowBox"));

const Home = ({ isToken }) => {
  console.log("isToken", isToken);
  return (
    <div className={styles.home}>
      <Navbar />

      <Suspense fallback={<div>Loading...</div>}>
        <Banner />
        <Showcase />

        <ReduxProvider>
          <ShowBox />
        </ReduxProvider>

        {isToken && (
          <>
            {" "}
            <h2>Purchased Tokens</h2>{" "}
          </>
        )}
      </Suspense>
    </div>
  );
};

export default Home;
