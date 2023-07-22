import {
  Box,
  Button,
  Flex,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  RangeSliderTrack,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import type { NextPage } from "next";

const ExampleUI: NextPage = () => {
  return (
    <>
      <div className="min-h-full flex items-center justify-center ">
        <div className="p-8 text-center">
          <Text fontSize="6xl">Create Loan Request</Text>
          <Text fontSize="lg">Step 2 of 2</Text>

          <Flex justifyContent="center">
            <VStack spacing={0} align="stretch">
              <Flex alignItems={"center"} className="text-justify" w={"740px"}>
                <Text flex={1} fontSize="2xl">
                  Enter Loan Principal
                </Text>
                {/* <Box flex={1} /> */}

                <Input
                  className="text-center"
                  w={"150px"}
                  rounded={"3xl"}
                  bg={"gray.100"}
                  size={"lg"}
                  variant="filled"
                  placeholder="$0.00"
                />
              </Flex>
              <Tip text={"Max amount you’re recommended for is $5,000"} />
              <Flex alignItems={"center"} className="text-justify" w={"740px"}>
                <Text flex={1} fontSize="2xl">
                  Interest Rate Range
                </Text>
                {/* <Box flex={1} /> */}

                <Input
                  className="text-center"
                  w={"150px"}
                  rounded={"3xl"}
                  bg={"gray.100"}
                  size={"lg"}
                  variant="filled"
                  placeholder="3%"
                />
                <Box mx={4} fontSize={"md"}>
                  to
                </Box>
                <Input
                  className="text-center"
                  w={"150px"}
                  rounded={"3xl"}
                  bg={"gray.100"}
                  size={"lg"}
                  variant="filled"
                  placeholder="6%"
                />
              </Flex>

              <Flex alignItems={"center"} className="text-justify" w={"740px"}>
                <RangeSlider
                  min={0}
                  max={12}
                  aria-label={["min", "max"]}
                  defaultValue={[3, 6]}
                  onChangeEnd={val => console.log(val)}
                  size={"lg"}
                >
                  <RangeSliderTrack>
                    <RangeSliderFilledTrack color={"black"} bg={"black"} />
                  </RangeSliderTrack>
                  <RangeSliderThumb boxSize={6} index={0} />
                  <RangeSliderThumb boxSize={6} index={1} />
                </RangeSlider>
              </Flex>
              <MinMax min={"0%"} max={"12%"} />
              <Tip text={"The interest rate will decrease over time to incentivize lenders to contribute quickly"} />

              <Flex alignItems={"center"} className="text-justify" w={"740px"}>
                <Text flex={1} fontSize="2xl">
                  Repayment Period
                </Text>
                {/* <Box flex={1} /> */}

                <Input
                  className="text-center"
                  w={"150px"}
                  rounded={"3xl"}
                  bg={"gray.100"}
                  size={"lg"}
                  variant="filled"
                  placeholder="12m"
                />
              </Flex>

              <Flex alignItems={"center"} className="text-justify" w={"740px"}>
                <RangeSlider
                  min={0}
                  max={12}
                  aria-label={["min", "max"]}
                  defaultValue={[3, 6]}
                  onChangeEnd={val => console.log(val)}
                  size={"lg"}
                >
                  <RangeSliderTrack>
                    <RangeSliderFilledTrack color={"black"} bg={"black"} />
                  </RangeSliderTrack>
                  <RangeSliderThumb boxSize={6} index={0} />
                  <RangeSliderThumb boxSize={6} index={1} />
                </RangeSlider>
              </Flex>
              <MinMax min={"6 months"} max={"72 months"} />

              <Flex alignItems={"center"} className="text-justify bg-teal-50 rounded-3xl px-2" w={"740px"}>
                <Text fontSize="2xl">Est Monthly Payment</Text>
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

const Tip = ({ text }) => {
  return (
    <Flex mb={4}>
      <Text className="mt-0 text-gray-400">{text}</Text>
    </Flex>
  );
};

const MinMax = ({ min, max }) => {
  return (
    <Flex>
      <Text fontSize={"lg"} className="mt-0 text-gray-400">
        {min}
      </Text>
      <Box flex={1} />
      <Text fontSize={"lg"} className="mt-0 text-gray-400">
        {max}
      </Text>
    </Flex>
  );
};
