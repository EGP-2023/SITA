import { useState } from "react";
import { Box, Button, Flex, Image, Text } from "@chakra-ui/react";
import type { NextPage } from "next";

const ExampleUI: NextPage = () => {
  const [borrowSelected, setBorrowSelected] = useState(false);
  const [lendSelected, setLendSelected] = useState(false);

  function handleBorrowClick() {
    console.log("Borrow Click happened");
    setBorrowSelected(true);
    setLendSelected(false);
  }

  function handleLendClick() {
    console.log("Lend Click happened");
    setLendSelected(true);
    setBorrowSelected(false);
  }

  return (
    <>
      <div className="min-h-full flex items-center justify-center">
        <div className="px-20 py-5 bg-white shadow-2xl rounded-3xl text-center">
          <Text className="font-bold" fontSize="3xl">
            Sign Up
          </Text>
          <Text fontSize="lg">What do you want to use SITA for?</Text>

          <Flex justifyContent="center">
            <Flex
              onClick={handleBorrowClick}
              className={
                borrowSelected
                  ? "m-2 rounded-3xl  border-2 border-emerald-400 bg-emerald-50"
                  : "m-2 rounded-xl p-2 bg-gray-100"
              }
              alignItems={"center"}
              justifyContent={"center"}
              width={"300px"}
              height={"300px"}
              // bg={"#F6F5F8"}
              direction={"column"}
            >
              <Image width={"150"} height={"150"} src="handgive.png" alt="Dan Abramov" />
              <Text className="font-bold" fontSize="lg">
                Borrow
              </Text>
              <Text fontSize="sm">If you sign up as a borrower you will be able to create loan requests.</Text>
            </Flex>
            <Flex
              onClick={handleLendClick}
              className={
                lendSelected
                  ? "m-2 rounded-3xl  border-2 border-emerald-400 bg-emerald-50"
                  : "m-2 rounded-xl p-2 bg-gray-100"
              }
              alignItems={"center"}
              justifyContent={"center"}
              width={"300px"}
              height={"300px"}
              // bg={"#F6F5F8"}
              direction={"column"}
            >
              <Image width={"150"} height={"150"} src="handshow.png" alt="Dan Abramov" />
              <Text className="font-bold" fontSize="lg">
                Lend
              </Text>
              <Text fontSize="sm">If you sign up as a borrower you will be able to create loan requests.</Text>
            </Flex>
          </Flex>
          <Button variant={"solid"} bg={"black"} color={"white"} rounded={"3xl"} size={"lg"} className="m-8">
            Next
          </Button>
        </div>
      </div>
    </>
  );
};

export default ExampleUI;
