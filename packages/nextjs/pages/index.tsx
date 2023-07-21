import { Suspense } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import type { NextPage } from "next";
import { BugAntIcon, MagnifyingGlassIcon, SparklesIcon } from "@heroicons/react/24/outline";
import { MetaHeader } from "~~/components/MetaHeader";

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
