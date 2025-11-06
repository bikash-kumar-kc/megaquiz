import { Box } from "@chakra-ui/react";
import React from "react";

const Container = ({ children }) => {
  return (
    <Box as="div" w="full" px={{
      base:"0.5rem",
      lg:"4rem"
    }}
    mb="1rem"
    >
      {children}
    </Box>
  );
};

export default Container;
