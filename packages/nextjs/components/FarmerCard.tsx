import { useState } from "react";
import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Image,
  Slider,
  SliderFilledTrack,
  SliderMark,
  SliderThumb,
  SliderTrack,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import { MdAttachMoney, MdEditDocument } from "react-icons/md";
import { SlCalender } from "react-icons/sl";

// import { TfiWrite } from "react-icons/ti";

const Sita: NextPage = () => {
  return (
    <>
      <Flex className="flex items-center flex-col flex-grow pt-10">
        <h1>Favorites</h1>

        <Center>
          <Box
            maxW={"270px"}
            w={"full"}
            bg={useColorModeValue("white", "gray.800")}
            boxShadow={"2xl"}
            rounded={"md"}
            overflow={"hidden"}
            borderRadius={"lg"}
          >
            <Image
              p={3}
              style={{ borderRadius: "30px" }}
              h={"180px"}
              w={"full"}
              src={
                "https://images.unsplash.com/photo-1612865547334-09cb8cb455da?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"
              }
              // objectFit={"cover"}
            />
            <Flex justify={"center"}></Flex>

            <Box p={4}>
              <Stack spacing={0} align={"center"} mb={3}>
                <Heading fontSize={"md"} fontWeight={500} fontFamily={"body"} mb={3}>
                  New Machinery in Northeast Thainland
                </Heading>
                <Text fontSize={"xs"} color={"gray.500"}>
                  I have been farming my whole life and am looking to expand my operations by buying new machinery.
                </Text>
              </Stack>

              <Stack direction={"row"} justify={"center"} spacing={6}>
                <Stack spacing={2} align={"center"} direction={"row"}>
                  <MdEditDocument />
                  <Text fontSize={"sm"} color={"brand.500"}>
                    12m
                  </Text>
                </Stack>
                <Stack spacing={2} align={"center"} direction={"row"}>
                  <MdAttachMoney />
                  <Text fontSize={"sm"} color={"brand.500"}>
                    10%
                  </Text>
                </Stack>
                <Stack spacing={2} align={"center"} direction={"row"}>
                  <SlCalender />
                  <Text fontSize={"sm"} color={"brand.500"}>
                    7/21/23
                  </Text>
                </Stack>
              </Stack>

              <SliderMarkExample />

              <Button
                w={"full"}
                mt={8}
                bg={"black"}
                color={"white"}
                rounded={"md"}
                _hover={{
                  transform: "translateY(-2px)",
                  boxShadow: "lg",
                }}
              >
                Follow
              </Button>
            </Box>
          </Box>
        </Center>
      </Flex>
    </>
  );
};

export default Sita;

function SliderMarkExample() {
  const [sliderValue, setSliderValue] = useState(28);

  // const labelStyles = {
  //   mt: "2",
  //   ml: "-2.5",
  //   fontSize: "sm",
  // };

  return (
    <Box pt={6} pb={2} mt={2}>
      <Slider aria-label="slider-ex-6" value={29} bg={"brand.900"} onChange={value => setSliderValue(value)}>
        <SliderMark value={sliderValue} textAlign="center" bg="brand.800" color="white" mt="-10" ml="-5" w="12">
          {sliderValue}%
        </SliderMark>
        <SliderTrack bg={"brand.900"}>
          <SliderFilledTrack bg={"brand.900"} />
        </SliderTrack>
        <SliderThumb />
      </Slider>
    </Box>
  );
}
