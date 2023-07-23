import { Image, Text } from "@chakra-ui/react";
import type { NextPage } from "next";
import UpDown from "~~/components/UpDown";

const ExampleUI: NextPage = () => {
  return (
    <>
      <UpDown />

      <Image src="detailPage.png" alt="Dan Abramov" />
    </>
  );
};

export default ExampleUI;
