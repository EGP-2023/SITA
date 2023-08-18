import { Suspense } from "react";
import dynamic from "next/dynamic";
import type { NextPage } from "next";

const AppDynamic = dynamic(() => import("~~/components/Main"), {
  ssr: false,
});

const Home: NextPage = () => {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <AppDynamic />
      </Suspense>
    </>
  );
};

export default Home;
