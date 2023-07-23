import { Link } from "@chakra-ui/next-js";
import { Button, Text } from "@chakra-ui/react";
import type { NextPage } from "next";

const ExampleUI: NextPage = () => {
  return (
    <>
      <div className="min-h-full flex items-center justify-center ">
        <div className="p-8 text-center">
          <Text fontSize="6xl">Loan Request Created!</Text>

          <Link href="/farmerDetail">
            <Button mt={16} variant={"solid"} bg={"black"} color={"white"} rounded={"3xl"} size={"lg"}>
              View Loan Details
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default ExampleUI;
