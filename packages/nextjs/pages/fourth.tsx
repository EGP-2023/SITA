import { useState } from "react";
import { Link } from "@chakra-ui/next-js";
import {
  Box,
  Button,
  Flex,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  RangeSliderTrack,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Text,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import { format } from "date-fns";
import type { NextPage } from "next";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { useSitaStore } from "~~/utils/sitaStore";
import { EtherscanProvider } from "@ethersproject/providers";
import {ethers} from "ethers";

export function MyDayPicker({ value, setValue }) {
  //   const [selected, setSelected] = useState<Date>();

  let footer = <p>Please pick a day.</p>;
  if (value) {
    footer = <p>You picked {format(value, "PP")}.</p>;
  }
  return <DayPicker mode="single" selected={value} onSelect={setValue} footer={footer} />;
}



function ExampleUI() {
  const [rateRange, setRateRange] = useState([`3%`, `6%`]);
  const [repaymentPeriod, setRepaymentPeriod] = useState(`12m`);

  const [repaymentStartDate, setRepaymentStartDate] = useState(new Date());
  const [disbursementDate, setDisbursementDate] = useState(new Date());

  const biconomySmartAccount = useSitaStore(state => state.biconomySmartAccount);


  
  function handleRateRangeChange(val: number[]) {
    setRateRange([`${val[0]}%`, `${val[1]}%`]);
  }

  const { data: sitaLoanContract } = useScaffoldContract({ contractName: "SitaLoan" });
  const submitCreatLoan = async ()=>{
          const loanContract = await ethers.Contract({"0xec5181a1313a71C247228043602Cf3C92F12B1A0",
          biconomySmartAccount.signer(), sitaLoanContract.abi()});
  
  }

  function handleRepaymentPeriodChange(val: number) {
    setRepaymentPeriod(`${val}m`);
  }
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
                <Box fontSize={"lg"}>$</Box>
                <Input
                  className="text-center"
                  w={"150px"}
                  rounded={"3xl"}
                  bg={"gray.100"}
                  size={"lg"}
                  variant="filled"
                  placeholder="0.00"
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
                  value={rateRange[0]}
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
                  value={rateRange[1]}
                />
              </Flex>

              <Flex alignItems={"center"} className="text-justify" w={"740px"}>
                <RangeSlider
                  min={0}
                  max={12}
                  aria-label={["min", "max"]}
                  defaultValue={[3, 6]}
                  onChangeEnd={handleRateRangeChange}
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
                  value={repaymentPeriod}
                />
              </Flex>

              <Flex alignItems={"center"} className="text-justify" w={"740px"}>
                <Slider
                  min={6}
                  max={72}
                  aria-label="slider-ex-1"
                  defaultValue={12}
                  onChangeEnd={handleRepaymentPeriodChange}
                >
                  <SliderTrack>
                    <SliderFilledTrack color={"black"} bg={"black"} />
                  </SliderTrack>
                  <SliderThumb boxSize={6} />
                </Slider>
              </Flex>
              <MinMax min={"6 months"} max={"72 months"} />

              <Flex alignItems={"center"} className="text-justify bg-teal-50 rounded-3xl px-2 my-6" w={"740px"}>
                <Text fontSize="2xl">Est Monthly Payment</Text>
                <Box flex={1} />
                <Text fontSize="2xl">-</Text>
              </Flex>

              <Flex alignItems={"center"} className="text-justify" w={"740px"}>
                <Text flex={1} fontSize="2xl">
                  Disbursement Date
                </Text>
                <Text mr={4} fontSize={"lg"}>
                  {format(disbursementDate, "PP")}
                </Text>
                <MyModal value={disbursementDate} setValue={setDisbursementDate} />
              </Flex>
              <Tip text={"The date you can access funds"} />

              <Flex alignItems={"center"} className="text-justify" w={"740px"}>
                <Text flex={1} fontSize="2xl">
                  Repayment Start Date
                </Text>
                <Text mr={4} fontSize={"lg"}>
                  {format(repaymentStartDate, "PP")}
                </Text>
                <MyModal value={repaymentStartDate} setValue={setRepaymentStartDate} />
              </Flex>
              <Tip text={"The date repayments start"} />
            </VStack>
          </Flex>
          <Link href="/fifth">
            <Button mt={24} variant={"solid"} bg={"black"} color={"white"} rounded={"3xl"} size={"lg"} onClick={submitCreatLoan}>
              Next
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
}

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

function MyModal({ value, setValue }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button onClick={onOpen}>Pick Date</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <MyDayPicker value={value} setValue={setValue} />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            {/* <Button variant="ghost">Secondary Action</Button> */}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
