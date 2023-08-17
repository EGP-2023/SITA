import { Link } from "@chakra-ui/next-js";
import { Box, Button, Flex, Image, Text } from "@chakra-ui/react";
import type { NextPage } from "next";

const ExampleUI: NextPage = () => {
  return (
    <>
      <div className="min-h-full flex items-center justify-center ">
        <div className="p-8 text-center">
          <Text fontSize="6xl">Create Loan Request</Text>
          <Text fontSize="lg">You must sign up before you can create a loan request.</Text>

          <Link href="/second">
            <Button variant={"solid"} bg={"black"} color={"white"} rounded={"3xl"} size={"lg"}>
              connect
            </Button>
          </Link>

          <Flex justifyContent="center">
            <Box boxSize="sm">
              <Image src="lock.png" alt="Dan Abramov" />
            </Box>
          </Flex>
        </div>
      </div>
    </>
  );
};

export default ExampleUI;
