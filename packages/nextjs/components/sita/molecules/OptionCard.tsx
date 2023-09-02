import { Flex, Image, Text } from "@chakra-ui/react";

type OptionCardProps = {
  title: string;
  description: string;
  imageSrc: string;
  altText: string;
  onClick: () => void;
  selected: boolean;
};

const OptionCard: React.FC<OptionCardProps> = ({ title, description, imageSrc, altText, onClick, selected }) => {
  const className = selected
    ? "m-2 rounded-3xl  border-2 border-emerald-400 bg-emerald-50"
    : "m-2 rounded-xl p-2 bg-gray-100";

  return (
    <Flex
      onClick={onClick}
      className={className}
      alignItems={"center"}
      justifyContent={"center"}
      width={"300px"}
      height={"300px"}
      direction={"column"}
    >
      <Image width={"150"} height={"150"} src={imageSrc} alt={altText} />
      <Text className="font-bold" fontSize="lg">
        {title}
      </Text>
      <Text fontSize="sm">{description}</Text>
    </Flex>
  );
};

export default OptionCard;
