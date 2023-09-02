import { Button } from "@chakra-ui/react";

type ButtonProps = {
  onClick: () => void;
  className?: string;
  children: React.ReactNode;
};

const BasicButton: React.FC<ButtonProps> = ({ onClick, className, children }) => {
  return (
    <Button onClick={onClick} className={className}>
      {children}
    </Button>
  );
};

export default BasicButton;
