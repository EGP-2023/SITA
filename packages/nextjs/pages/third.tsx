import { Box, Button, Flex, Image, Text, Textarea, VStack } from "@chakra-ui/react";
import type { NextPage } from "next";

const ExampleUI: NextPage = () => {
  return (
    <>
      <div className="min-h-full flex items-center justify-center ">
        <div className="p-8 text-center">
          <Text fontSize="6xl">Create Loan Request</Text>
          <Text fontSize="lg">Step 1 of 2</Text>

          <Flex justifyContent="center">
            <VStack spacing={4} align="stretch">
              <Box className="text-justify" w={"740px"}>
                <Text fontSize="2xl">Add Description</Text>
                <Textarea
                  h={"234px"}
                  bg={"gray.100"}
                  placeholder="Enter a description of what you will use the loan for here."
                />
              </Box>

              <Flex alignItems={"center"} className="text-justify" w={"740px"}>
                <Text fontSize="2xl">Add Images</Text>
                <Box flex={1} />
                <Button rounded={"3xl"} variant={"solid"} bg={"brand.900"} size={"lg"}>
                  Add
                </Button>
              </Flex>
              <Flex alignItems={"center"} className="text-justify" w={"740px"}>
                <Text fontSize="2xl">Add Land Info</Text>
                <Box flex={1} />
                <Button rounded={"3xl"} variant={"solid"} bg={"brand.900"} size={"lg"}>
                  Add
                </Button>
              </Flex>

              <Flex alignItems={"center"} className="text-justify bg-teal-50 rounded-3xl px-2" w={"740px"}>
                <Text fontSize="2xl">Estimated Credit Value</Text>
                <Box flex={1} />
                <Text fontSize="2xl">-</Text>
              </Flex>
            </VStack>
          </Flex>
          <Button mt={24} variant={"solid"} bg={"black"} color={"white"} rounded={"3xl"} size={"lg"}>
            Next
          </Button>
        </div>
      </div>
    </>
  );
};

export default ExampleUI;