import { useState } from "react";
import OptionCard from "../molecules/OptionCard";
import { Flex, Text } from "@chakra-ui/react";
import useWeb3Auth from "~~/hooks/useWeb3Auth";

const LenderOrBorrowerCard: React.FC = () => {
  const [borrowSelected, setBorrowSelected] = useState(false);
  const [lendSelected, setLendSelected] = useState(false);
  const { handleAuth } = useWeb3Auth();

  const handleBorrowClick = () => {
    setBorrowSelected(true);
    setLendSelected(false);
    handleAuth();
  };

  const handleLendClick = () => {
    setLendSelected(true);
    setBorrowSelected(false);
  };

  return (
    <div className="min-h-full flex items-center justify-center">
      <div className="px-20 py-5 bg-white shadow-2xl rounded-3xl text-center">
        <Text className="font-bold" fontSize="3xl">
          Connect Wallet
        </Text>
        <Text fontSize="lg">What do you want to use SITA for?</Text>
        <Flex justifyContent="center">
          <OptionCard
            title="Borrow"
            description="If you sign up as a borrower you will be able to create loan requests."
            imageSrc="handgive.png"
            altText="Borrow Image"
            onClick={handleBorrowClick}
            selected={borrowSelected}
          />
          <OptionCard
            title="Lend"
            description="If you sign up as a lender you will be able to offer loans."
            imageSrc="handshow.png"
            altText="Lend Image"
            onClick={handleLendClick}
            selected={lendSelected}
          />
        </Flex>
      </div>
    </div>
  );
};

export default LenderOrBorrowerCard;
