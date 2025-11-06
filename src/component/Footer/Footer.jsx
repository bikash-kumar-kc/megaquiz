import { Box, Text } from "@chakra-ui/react";
import React from "react";

const Footer = ({ authstaus }) => {
  console.log("footer");
  console.log(authstaus);
  return (
    <Box
      display={"flex"}
      mt="5rem"
      background="#171717"
      height="200px"
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Text color="gray">Creator: @bikashkumarkc</Text>
    </Box>
  );
};

export default Footer;
