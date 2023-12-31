import { useState } from "react";
import { Link } from "@chakra-ui/next-js";
import { Box, Button, Flex, Text, Textarea, VStack } from "@chakra-ui/react";
// import fs from "fs";
import type { NextPage } from "next";
import Map from "~~/components/Map";
import WorldButton from "~~/components/WorldButton";
//import fetchChainlink from "../../chainlink/readFile";
import { ipfsUploadMetadata } from "~~/utils/ipfsUpload";

// console.log(fs);

const ExampleUI: NextPage = () => {
  const [area, setArea] = useState(0);

  const [creditValue, setCreditValue] = useState("-"); // New state

  const handleAddLandInfo = () => {
    setTimeout(() => {
      setCreditValue("1630");
    }, 3000); // 3 seconds delay
  };

  const handleUploadToIPFS = () => {
    const metadata = {
      area,
      lgt: -100,
      lat: 10,
      countryCode: "IND",
    };
    ipfsUploadMetadata(metadata);
  };

  return (
    <>
      <div className="min-h-full flex items-center justify-center ">
        <div className="p-8 text-center">
          <Text fontSize="6xl">Create Loan Request</Text>
          <Text fontSize="lg">Step 1 of 2</Text>

          <Flex justifyContent="center">
            <VStack spacing={4} align="stretch">
              <Box className="text-justify" w={"740px"}>
                <Text className="font-bold" fontSize="2xl">
                  Add Description
                </Text>
                <Textarea
                  h={"234px"}
                  bg={"gray.100"}
                  placeholder="Enter a description of what you will use the loan for here."
                />
              </Box>

              <Flex alignItems={"center"} className="text-justify" w={"740px"}>
                <Text className="font-bold" fontSize="2xl">
                  Add Images
                </Text>
                <Box flex={1} />
                <Button rounded={"3xl"} variant={"solid"} bg={"brand.900"} size={"lg"}>
                  Add
                </Button>
              </Flex>
              <Flex alignItems={"center"} className="text-justify" w={"740px"}>
                <Text className="font-bold" fontSize="2xl">
                  Verify personal identity
                </Text>
                <Box flex={1} />
                <WorldButton />
              </Flex>
              <Flex alignItems={"center"} className="text-justify" w={"740px"}>
                <Text className="font-bold" fontSize="2xl">
                  Add Land Info
                </Text>
                <Box flex={1} />
                <Text mx={8}>Area : {area}</Text>
                <Button onClick={handleAddLandInfo} rounded={"3xl"} variant={"solid"} bg={"brand.900"} size={"lg"}>
                  Add
                </Button>
              </Flex>
              <Flex alignItems={"center"} className="text-justify" w={"740px"}>
                <Map setArea={setArea} />
              </Flex>
              <Flex alignItems={"center"} className="text-justify bg-teal-50 rounded-3xl px-2" w={"740px"}>
                <Text className="font-bold" fontSize="2xl">
                  Estimated Credit Value
                </Text>
                <Box flex={1} />
                <Text fontSize="2xl">{creditValue}</Text>
                <Text fontSize="2xl"></Text>
              </Flex>
            </VStack>
          </Flex>
          <Link href="/fourth">
            <Button
              mt={24}
              variant={"solid"}
              bg={"black"}
              color={"white"}
              rounded={"3xl"}
              size={"lg"}
              onClick={handleUploadToIPFS}
            >
              Next
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default ExampleUI;
